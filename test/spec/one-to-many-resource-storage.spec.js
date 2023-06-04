'use strict'

const { MongoClient } = require('mongodb')
const Storage = require('../../lib/one-to-many-resource-storage.js')
const expect = require('chai').expect
const { randomInt } = require('crypto')

const storage = new Storage({ url: 'mongodb://127.0.0.1:27017', collectionName: 'queues', resourceName: 'listeners', enableTwoWayReferences: true })

describe('OnToManyResourceStorage', () => {

    /**
     * @type {import('mongodb').MongoClient}
     */
    let mongoDbClient
    let listenerIds
    let resourceId

    before(() => {
        mongoDbClient = new MongoClient('mongodb://127.0.0.1:27017')
    })

    beforeEach(() => {
        return mongoDbClient.connect()
    })

    beforeEach(async () => {
        listenerIds = [randomInt(999999), randomInt(999999)]
        const listenersCollection = mongoDbClient.db('default').collection('listeners')
        await listenersCollection.insertOne({
            _id: listenerIds.at(0),
            name: 'first'
        })
        await listenersCollection.insertOne({
            _id: listenerIds.at(1),
            name: 'second'
        })

        resourceId = randomInt(999999)
        const queuesCollection = mongoDbClient.db('default').collection('queues')
        await queuesCollection.insertOne({
            _id: resourceId,
            listeners: [
                listenerIds.at(0),
                listenerIds.at(1)
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
            console.log(storage._collectionName)
            const exists = await storage.exists([resourceId, listenerIds.at(0)])
            expect(exists).to.be.true
        })
        it('returns false if a document does not exists', async () => {
            const exists = await storage.exists([resourceId, 111])
            expect(exists).to.be.false
        })
    })

    describe('.get', () => {
        it('returns an existing document', async () => {
            const doc = await storage.get([resourceId, listenerIds.at(0)])
            expect(doc.name).to.equal('first')
        })
        it('returns another document', async () => {
            const doc = await storage.get([resourceId, listenerIds.at(1)])
            expect(doc.name).to.equal('second')
        })
        it('returns null if document does not exists', async () => {
            const doc = await storage.get([resourceId, 111])
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
            const docs = await storage.getAll([resourceId])
            console.log({ docs })
            expect(docs).to.have.length(2)

            docs.forEach(doc => {
                expect(doc.name).not.to.be.undefined
                expect(doc.name).not.to.be.null
            })
        })
    })

    describe('.create', () => {
        it('creates a new document', async () => {
            const newId = randomInt(55555)
            await storage.create([resourceId, newId], { my: 'ghost' })

            const docs = await storage.getAll([resourceId])
            expect(docs).to.have.length(3)

            const doc = await storage.get([resourceId, newId])
            expect(doc.my).to.equal('ghost')
        })
        it('returns the new documentId', async () => {
            const newId = randomInt(55555)
            const storedId = await storage.create([resourceId, newId], { my: 'ghost' })
            expect(storedId).to.equal(newId)
        })
        it('also adds a reference to entity if requested', async () => {
            const newId = randomInt(55555)
            await storage.create([resourceId, newId], { my: 'ghost' })

            const doc = await storage.get([resourceId, newId])
            expect(doc.queues_ref).to.equal(resourceId)
        })
    })

    describe('.update', () => {
        it('updates a document', async () => {
            await storage.update([resourceId, listenerIds.at(1)], { 'name': 'peter' })
            const doc = await storage.get([resourceId, listenerIds.at(1)])
            expect(doc.name).to.equal('peter')
        })
        it('throws if document does not exist', async () => {
            return new Promise((resolve, reject) => {
                storage.update([resourceId, 911]).then(reject, resolve)
            })
        })
    })

    describe('.delete', () => {
        it('deletes a document', async () => {
            await storage.delete([resourceId, listenerIds.at(1)])
            const doc = await storage.get([resourceId, listenerIds.at(1)])
            expect(doc).to.be.null

            const docs = await storage.getAll([resourceId])
            expect(docs).to.have.length(1)
        })
        it('also deletes the document reference', async () => {
            // await new Promise((resolve) => setTimeout(resolve, 30_000))
            await storage.delete([resourceId, listenerIds.at(1)])
            const queuesCollection = mongoDbClient.db('default').collection('queues')
            const { listeners } = await queuesCollection.findOne({
                _id: resourceId,
            })
            expect(listeners).to.have.length(1)
            expect(listeners).to.deep.equal(listenerIds.slice(0, 1))
        })
        it('throws if document does not exist', async () => {
            return new Promise((resolve, reject) => {
                storage.delete([resourceId, 911]).then(reject, resolve)
            })
        })
    })
})