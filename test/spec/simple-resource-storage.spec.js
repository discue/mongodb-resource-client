'use strict'

const { MongoClient } = require('mongodb')
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
            id: insertedDocumentId,
            hello: 'world'
        })
        collection.insertOne({
            id: randomInt(11111),
            hello: 'world2'
        })
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
        it('returns true if a document exists', async () => {
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
    })

    describe('.get', () => {
        it('returns an existing document', async () => {
            const doc = await storage.get([insertedDocumentId])
            expect(doc.hello).to.equal('world')
        })
        it('does not return mongodb _id field', async () => {
            const doc = await storage.get([insertedDocumentId])
            console.log('id', doc._id)
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
        it('allows atomic operator to be set', async () => {
            await storage.update(insertedDocumentId, { $set: { hello: 'peter' } })
            const doc = await storage.get(insertedDocumentId)
            expect(doc.hello).to.equal('peter')
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