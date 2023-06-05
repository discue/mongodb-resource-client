'use strict'

const { MongoClient } = require('mongodb')
const Storage = require('../../lib/one-to-few-resource-storage.js')
const expect = require('chai').expect
const { randomInt } = require('crypto')

const storage = new Storage({ url: 'mongodb://127.0.0.1:27017', collectionName: 'api_clients', resourceName: 'queues' })

describe('NestedSimpleResourceStorage', () => {

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

    beforeEach(async () => {
        insertedDocumentId = randomInt(999999)
        const collection = mongoDbClient.db('default').collection('api_clients')
        await collection.insertOne({
            id: randomInt(10000),
            queues: [
                { id: 123, name: '11' },
                { id: 456, name: '21' },
                { id: 999, name: '31' }
            ]
        })
        await collection.insertOne({
            id: insertedDocumentId,
            queues: [
                { id: 123, name: '1' },
                { id: 456, name: '2' },
                { id: 999, name: '3' }
            ]
        })

        return new Promise((resolve) => setTimeout(resolve, 250))
    })

    beforeEach(async () => {
        const collection = mongoDbClient.db('default').collection('unrelated_collection')
        await collection.insertOne({
            id: randomInt(10000),
            tasks: [
                { id: 123, name: '11' },
                { id: 456, name: '21' },
                { id: 999, name: '31' }
            ]
        })
        await collection.insertOne({
            id: insertedDocumentId,
            tasks: [
                { id: 123, name: '1' },
                { id: 456, name: '2' },
                { id: 999, name: '3' }
            ]
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
            const exists = await storage.exists([insertedDocumentId, 999])
            expect(exists).to.be.true
        })
        it('returns false if a document does not exists', async () => {
            const exists = await storage.exists([insertedDocumentId, 111])
            expect(exists).to.be.false
        })
    })

    describe('.get', () => {
        it('returns an existing document', async () => {
            const doc = await storage.get([insertedDocumentId, 999])
            expect(doc.name).to.equal('3')
        })
        it('does not return mongodb _id field', async () => {
            const doc = await storage.get([insertedDocumentId, 999])
            expect(doc._id).to.be.undefined
        })
        it('returns null if document does not exists', async () => {
            const doc = await storage.get([insertedDocumentId, 111])
            expect(doc).to.be.null
        })
        it('does not throw if doc does not exists', async () => {
            return new Promise((resolve, reject) => {
                storage.get('abc').then(resolve, reject)
            })
        })
    })

    describe('.getAll', () => {
        it('returns an existing document', async () => {
            const docs = await storage.getAll([insertedDocumentId])
            expect(docs).to.have.length(3)

            docs.forEach(doc => {
                expect(doc.name).not.to.be.undefined
                expect(doc.name).not.to.be.null
            })
        })
        it('does not return _id field', async () => {
            const docs = await storage.getAll([insertedDocumentId])
            docs.forEach((doc) => {
                expect(doc._id).to.be.undefined
            })
        })
    })

    describe('.create', () => {
        it('creates a new document', async () => {
            const newId = randomInt(55555)
            await storage.create([insertedDocumentId, newId], { my: 'ghost' })

            const docs = await storage.getAll([insertedDocumentId])
            expect(docs).to.have.length(4)

            const doc = await storage.get([insertedDocumentId, newId])
            expect(doc.my).to.equal('ghost')
        })
        it('returns the documentId', async () => {
            const newId = randomInt(55555)
            const storedId = await storage.create([insertedDocumentId, newId], { my: 'ghost' })
            expect(storedId).to.equal(newId)
        })
    })

    describe('.update', () => {
        it('updates a document', async () => {
            await storage.update([insertedDocumentId, 999], { 'queues.name': 'peter' })
            const doc = await storage.get([insertedDocumentId, 999])
            expect(doc.name).to.equal('peter')
        })
        it('throws if document does not exist', async () => {
            return new Promise((resolve, reject) => {
                storage.update([insertedDocumentId, 911]).then(reject, resolve)
            })
        })
    })

    describe('.delete', () => {
        it('deletes a document', async () => {
            await storage.delete([insertedDocumentId, 999])
            const doc = await storage.get([insertedDocumentId, 999])
            expect(doc).to.be.null
        })
        it('throws if document does not exist', async () => {
            return new Promise((resolve, reject) => {
                storage.delete([insertedDocumentId, 911]).then(reject, resolve)
            })
        })
    })
})