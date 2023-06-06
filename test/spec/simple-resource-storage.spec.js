'use strict'

const { MongoClient, Timestamp } = require('mongodb')
const Storage = require('../../lib/simple-resource-storage.js')
const expect = require('chai').expect
const { randomUUID: uuid, randomInt } = require('crypto')

const storage = new Storage({ url: 'mongodb://127.0.0.1:27017', collectionName: '_subscriptions' })

describe('SimpleResourceStorage', () => {

    /**
     * @type {import('mongodb').MongoClient}
     */
    let mongoDbClient
    let insertedDocumentId

    before(() => {
        mongoDbClient = new MongoClient('mongodb://127.0.0.1:27017')
    })

    beforeEach(() => {
        return mongoDbClient.connect()
    })

    beforeEach(() => {
        insertedDocumentId = uuid()
        const collection = mongoDbClient.db('default').collection('_subscriptions')
        collection.insertOne({
            _meta_data: {
                created_at: Timestamp.fromNumber(Date.now())
            },
            id: insertedDocumentId,
            hello: 'world'
        })
        collection.insertOne({
            _meta_data: {
                created_at: Timestamp.fromNumber(Date.now())
            },
            id: randomInt(11111),
            hello: 'world2'
        })

        return new Promise((resolve) => setTimeout(resolve, 100))
    })

    afterEach(() => {
        const collection = mongoDbClient.db('default').collection('_subscriptions')
        return collection.drop()
    })

    after(() => {
        return mongoDbClient.close()
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
        it('does not return _id field', async () => {
            const docs = await storage.getAll()
            docs.forEach((doc) => {
                expect(doc._id).to.be.undefined
            })
        })
    })

    describe('.get', () => {
        it('returns an existing document', async () => {
            const doc = await storage.get([insertedDocumentId])
            expect(doc.hello).to.equal('world')
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