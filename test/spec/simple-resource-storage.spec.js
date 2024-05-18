'use strict'

const { MongoClient, Timestamp } = require('mongodb')
const Storage = require('../../lib/simple-resource-storage.js')
const expect = require('chai').expect
const { randomUUID: uuid } = require('crypto')
const retry = require('../retry.js')

describe('SimpleResourceStorage', () => {
    let storage

    /**
     * @type {import('mongodb').MongoClient}
     */
    let mongoDbClient
    let insertedDocumentId

    before(() => {
        mongoDbClient = new MongoClient('mongodb://127.0.0.1:27021/?replicaSet=rs0')
    })

    beforeEach(() => {
        storage = new Storage({ client: mongoDbClient, collectionName: '_subscriptions' })
    })

    beforeEach(async () => {
        insertedDocumentId = uuid()
        const collection = mongoDbClient.db().collection('_subscriptions')
        await collection.insertOne({
            _meta_data: {
                created_at: Timestamp.fromNumber(Date.now())
            },
            id: insertedDocumentId,
            hello: 'world'
        })
        await collection.insertOne({
            _meta_data: {
                created_at: Timestamp.fromNumber(Date.now())
            },
            id: uuid(),
            hello: 'world2'
        })
    })

    beforeEach(async () => {
        return retry(async () => {
            const indexes = await mongoDbClient.db('test').collection('_subscriptions').listIndexes().toArray()
            expect(indexes).to.have.length(2)
        })
    })

    afterEach(async () => {
        try {
            const collection = mongoDbClient.db().collection('_subscriptions')
            await collection.deleteMany({})
        } catch (e) {
            //
        }
    })

    after(() => {
        return storage.close()
    })

    describe('.exists', () => {
        it('returns{withMetadata: true} if a document exists', async () => {
            const exists = await storage.exists([insertedDocumentId])
            expect(exists).to.be.true
        })
        it('returns false if a document does not exists', async () => {
            const exists = await storage.exists([99])
            expect(exists).to.be.false
        })
    })

    describe('.getAll', () => {
        it('returns all documents', async () => {
            const docs = await storage.getAll()
            expect(docs).to.have.length(2)
            expect(docs._id).to.be.undefined
        })
        it('returns only projected fields', async () => {
            const docs = await storage.getAll({ projection: { id: 1 } })
            expect(docs).to.have.length(2)
            docs.forEach((doc) => {
                expect(doc.id).not.to.be.undefined
                expect(doc.id).not.to.be.null
                expect(doc.hello).to.be.undefined
            })
        })
        it('ignores explicitly not projected fields', async () => {
            const docs = await storage.getAll({ projection: { hello: 0 } })
            expect(docs).to.have.length(2)
            docs.forEach((doc) => {
                expect(doc.id).not.to.be.undefined
                expect(doc.id).not.to.be.null
                expect(doc.hello).to.be.undefined
            })
        })
        it('does not return _id field', async () => {
            const docs = await storage.getAll()
            docs.forEach((doc) => {
                expect(doc._id).to.be.undefined
            })
        })
        it('returns an empty list if collection is empty', async () => {
            const collection = await storage._getCollection()
            await collection.deleteMany({})

            const docs = await storage.getAll()
            expect(docs).to.be.empty
        })
    })

    describe('.get', () => {
        it('returns an existing document', async () => {
            const doc = await storage.get([insertedDocumentId])
            expect(doc.id).not.to.be.undefined
            expect(doc.id).not.to.be.null
            expect(doc.hello).to.equal('world')
        })
        it('returns only projected fields', async () => {
            const doc = await storage.get([insertedDocumentId], { projection: { id: 1 } })
            expect(doc.id).not.to.be.undefined
            expect(doc.id).not.to.be.null
            expect(doc.hello).to.be.undefined
        })
        it('ignores explicitly not projected fields', async () => {
            const doc = await storage.get([insertedDocumentId], { projection: { hello: 0 } })
            expect(doc.id).not.to.be.undefined
            expect(doc.id).not.to.be.null
            expect(doc.hello).to.be.undefined
        })
        it('does not return _meta_data by default', async () => {
            const doc = await storage.get([insertedDocumentId])
            expect(doc.hello).to.equal('world')
            expect(doc._meta_data).to.be.undefined
        })
        it('returns _meta_data', async () => {
            const doc = await storage.get([insertedDocumentId], { withMetadata: true })
            expect(doc.hello).to.equal('world')
            expect(doc._meta_data).not.to.be.undefined
        })
        it('does not return mongodb _id field', async () => {
            const doc = await storage.get([insertedDocumentId])
            expect(doc._id).to.be.undefined
        })
        it('does not throw if doc does not exists', async () => {
            return new Promise((resolve, reject) => {
                storage.get('abc').then(resolve, reject)
            })
        })
    })

    describe('.create', () => {
        it('creates a new document', async () => {
            const id = uuid()
            await storage.create(id, { my: 'ghost' })
            const doc = await storage.get(id)
            expect(doc.my).to.equal('ghost')
        })
        it('throws if document already exists', async () => {
            const id = uuid()
            try {
                await storage.create(id, { my: 'ghost' })
                await storage.create(id, { my: 'ghost' })
                throw new Error('Must throw duplicate key error')
            } catch (e) {
                expect(e.errorResponse.errmsg).to.contain('duplicate key')
            }
        })
        it('ensures id is unique', async () => {
            const id = uuid()
            await storage.create(id, { my: 'ghost' })
            return new Promise((resolve, reject) => {
                storage.create(id, { my: 'ghost' }).then(reject, resolve)
            })
        })
        it('returns the document id', async () => {
            const id = uuid()
            const storedId = await storage.create(id, { my: 'ghost' })
            expect(storedId).to.equal(id)
        })
    })

    describe('.updates', () => {
        it('updates a document', async () => {
            await storage.update([insertedDocumentId], { hello: 'peter' })
            const doc = await storage.get(insertedDocumentId)
            expect(doc.hello).to.equal('peter')
        })
        it('sets a new updated_at timestamp', async () => {
            await storage.update(insertedDocumentId, { hello: 'peter' })
            await new Promise((resolve) => setTimeout(resolve, 500))
            const doc = await storage.get(insertedDocumentId, { withMetadata: true })
            expect(doc._meta_data.updated_at.toInt()).to.be.greaterThan(doc._meta_data.created_at.toInt())
        })
        it('allows atomic operator to be set', async () => {
            await storage.update(insertedDocumentId, { $set: { hello: 'peter' } })
            const doc = await storage.get(insertedDocumentId)
            expect(doc.hello).to.equal('peter')
        })
        it('sets a new updated_at timestamp when atomic operator was set', async () => {
            await storage.update(insertedDocumentId, { $set: { hello: 'peter' } })
            const doc = await storage.get(insertedDocumentId, { withMetadata: true })
            expect(doc._meta_data.updated_at.toInt()).to.be.greaterThan(doc._meta_data.created_at.toInt())
        })
        it('throws if document does not exist', async () => {
            return new Promise((resolve, reject) => {
                storage.update('abc').then(reject, resolve)
            })
        })
        it('adds new document if upsert is set to true', async () => {
            await storage.update('abc', { name: 'Tim' }, { upsert: true })
            const resource = await storage.get('abc')
            expect(resource.name).to.equal('Tim')
        })
    })

    describe('.deletes', () => {
        it('deletes a document', async () => {
            await storage.delete([insertedDocumentId])
            const doc = await storage.get(insertedDocumentId)
            expect(doc).to.be.null
        })
        it('throws if document does not exist', async () => {
            return new Promise((resolve, reject) => {
                storage.delete('abc').then(reject, resolve)
            })
        })
    })
})