'use strict'

const { MongoClient } = require('mongodb')
const Storage = require('../../lib/one-to-few-ref-storage.js')
const expect = require('chai').expect
const { randomInt } = require('crypto')

const storage = new Storage({ url: 'mongodb://127.0.0.1:27017', collectionName: 'api_clients', resourceName: 'queues' })

describe('OneToFewRefStorage', () => {

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
        const collection = mongoDbClient.db().collection('api_clients')
        await collection.insertOne({
            id: randomInt(10000),
            queues: [
                1234,
                4567,
                9999
            ]
        })
        await collection.insertOne({
            id: insertedDocumentId,
            queues: [
                123,
                456,
                999
            ].reverse()
        })

        return new Promise((resolve) => setTimeout(resolve, 50))
    })

    after(() => {
        return mongoDbClient.close()
    })

    after(() => {
        return storage.close()
    })

    describe('.exists', () => {
        it('returns true if a ref exists', async () => {
            const exists = await storage.exists([insertedDocumentId, 456])
            expect(exists).to.be.true
        })
        it('returns false if a does not exists', async () => {
            const exists = await storage.exists([insertedDocumentId, 12314])
            expect(exists).to.be.false
        })
    })

    describe('.getAll', () => {
        it('returns all existing refs', async () => {
            const docs = await storage.getAll([insertedDocumentId])
            expect(docs).to.have.length(3)
            expect(docs).to.deep.equal([999, 456, 123])
            expect(docs._id).to.be.undefined
        })
        it('returns null if document does not exist', async () => {
            const docs = await storage.getAll([123])
            expect(docs).to.have.length(0)
        })
    })

    describe('.create', () => {
        it('adds a new ref', async () => {
            const newId = randomInt(55555)
            await storage.create([insertedDocumentId], newId)

            const docs = await storage.getAll([insertedDocumentId])
            expect(docs).to.have.length(4)

            expect(docs).to.deep.equal([999, 456, 123, newId])
        })
        it('ensures ids are unique', async () => {
            const newId = randomInt(55555)
            await storage.create([insertedDocumentId], newId)
            await storage.create([insertedDocumentId], newId)

            const docs = await storage.getAll([insertedDocumentId])
            expect(docs).to.have.length(4)

            expect(docs).to.deep.equal([999, 456, 123, newId])
        })
        it('returns the document id', async () => {
            const newId = randomInt(55555)
            const storedId = await storage.create([insertedDocumentId], newId)
            expect(storedId).to.equal(newId)
        })
    })

    describe('.findReferences', () => {
        it('finds documents with references', async () => {
            const docs = await storage.findReferences([insertedDocumentId], [123])
            expect(docs).to.have.length(1)
        })
        it('returns an empty set if target does not contain ref', async () => {
            const docs = await storage.findReferences([insertedDocumentId], [1234])
            expect(docs).to.have.length(0)
        })
        it('returns the document id', async () => {
            const newId = randomInt(55555)
            const storedId = await storage.create([insertedDocumentId], newId)
            expect(storedId).to.equal(newId)
        })
    })

    describe('.delete', () => {
        it('deletes a document', async () => {
            await storage.delete([insertedDocumentId, 999])

            const docs = await storage.getAll([insertedDocumentId])
            expect(docs).to.have.length(2)

            expect(docs).to.deep.equal([456, 123])
        })
        it('throws if document does not exist', async () => {
            return new Promise((resolve, reject) => {
                storage.delete([insertedDocumentId, 911]).then(reject, resolve)
            })
        })
    })
})