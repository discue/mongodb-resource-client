'use strict'

const { MongoClient } = require('mongodb')
const Storage = require('../../lib/simple-resource-storage.js')
const expect = require('chai').expect
const { randomUUID: uuid, randomInt } = require('crypto')


describe('SimpleResourceStorageWithConfiguredClient', () => {

    /**
     * @type {import('mongodb').MongoClient}
     */
    let mongoDbClient
    let insertedDocumentId
    let storage

    before(() => {
        mongoDbClient = new MongoClient('mongodb://127.0.0.1:27017')
        storage = new Storage({ client: mongoDbClient, collectionName: '_subscriptions' })
    })

    beforeEach(() => {
        insertedDocumentId = randomInt(999999)
        const collection = mongoDbClient.db('default').collection('_subscriptions')
        return collection.insertOne({
            id: insertedDocumentId,
            hello: 'world'
        })
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

    describe('.get', () => {
        it('returns an existing document', async () => {
            const doc = await storage.get([insertedDocumentId])
            expect(doc.hello).to.equal('world')
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