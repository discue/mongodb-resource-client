'use strict'

const { MongoClient, Timestamp } = require('mongodb')
const Storage = require('../../lib/one-to-many-resource-storage.js')
const expect = require('chai').expect
const { randomInt, randomUUID: uuid } = require('crypto')

describe('OnToManyResourceStorage Transactions', () => {

    /**
     * @type {import('mongodb').MongoClient}
     */
    let mongoDbClient
    let listenerIds
    let resourceId
    let storage

    before(() => {
        mongoDbClient = new MongoClient('mongodb://127.0.0.1:27017')
    })

    beforeEach(() => {
        return mongoDbClient.connect()
    })

    beforeEach(() => {
        storage = new Storage({ url: 'mongodb://127.0.0.1:27017', collectionName: 'queues', resourceName: 'listeners', enableTwoWayReferences: true })
    })

    beforeEach(async () => {
        listenerIds = [uuid(), uuid(), uuid()]
        const listenersCollection = mongoDbClient.db().collection('listeners')
        await listenersCollection.insertOne({
            _meta_data: {
                created_at: Timestamp.fromNumber(Date.now())
            },
            id: listenerIds.at(0),
            name: 'first'
        })
        await listenersCollection.insertOne({
            _meta_data: {
                created_at: Timestamp.fromNumber(Date.now())
            },
            id: listenerIds.at(1),
            name: 'second'
        })
        await listenersCollection.insertOne({
            _meta_data: {
                created_at: Timestamp.fromNumber(Date.now())
            },
            id: listenerIds.at(2),
            name: 'third'
        })

        const queuesCollection = mongoDbClient.db().collection('queues')
        await queuesCollection.insertOne({
            id: resourceId = uuid(),
            listeners: [
                listenerIds.at(0),
                listenerIds.at(1)
            ]
        })

        return new Promise((resolve) => setTimeout(resolve, 50))
    })

    afterEach(() => {
        return storage.close()
    })

    after(() => {
        return mongoDbClient.close()
    })

    describe('.create', () => {
        it('removes the main document if host document ref was not updated', async () => {
            const newId = randomInt(55555)
            storage._hostStorage.create = () => { throw new Error('I hope you are using transactions') }
            await storage.create([resourceId, newId], { my: 'ghost' }).catch(() => Promise.resolve())

            const collection = mongoDbClient.db().collection('listeners')
            const doc = await collection.findOne({ id: newId })
            expect(doc).to.be.null
        })
        it('removes the main document if main ref to host document ref was not updated', async () => {
            const newId = randomInt(55555)
            storage._updateUnsafe = () => { throw new Error('I hope you are using transactions') }
            await storage.create([resourceId, newId], { my: 'ghost' }).catch(() => Promise.resolve())

            const collection = mongoDbClient.db().collection('listeners')
            const doc = await collection.findOne({ id: newId })
            expect(doc).to.be.null
        })
    })

    describe('.delete', () => {
        it('does not persist deletion if host document ref was not updated', async () => {
            storage._hostStorage.delete = () => { throw new Error('I hope you are using transactions') }

            await storage.delete([resourceId, listenerIds.at(1)]).catch(() => Promise.resolve())

            const collection = mongoDbClient.db().collection('listeners')
            const doc = await collection.findOne({ id: listenerIds.at(1) })
            expect(doc).not.to.be.null
        })
        it('does keep the reference in the host document', async () => {
            storage._deleteUnsafe = () => { throw new Error('I hope you are using transactions') }

            await storage.delete([resourceId, listenerIds.at(1)]).catch(() => Promise.resolve())

            const queuesCollection = mongoDbClient.db().collection('queues')
            const { listeners } = await queuesCollection.findOne({
                id: resourceId,
            })

            expect(listeners).to.have.length(2)
            expect(listeners).to.contain(listenerIds.at(1))
        })
    })
})