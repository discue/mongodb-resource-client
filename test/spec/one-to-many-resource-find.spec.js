'use strict'

const { MongoClient, Timestamp } = require('mongodb')
const Storage = require('../../lib/one-to-many-resource-storage.js')
const SimpleStorage = require('../../lib/simple-resource-storage.js')
const expect = require('chai').expect
const { randomUUID: uuid } = require('crypto')

describe('OneToManyResource', () => {
    const listeners = new Storage({ url: 'mongodb://127.0.0.1:27021', collectionName: 'queues', resourceName: 'listeners', resourcePath: 'api_clients/queues', enableTwoWayReferences: true })
    const apiClients = new SimpleStorage({ url: 'mongodb://127.0.0.1:27021', collectionName: 'api_clients' })

    /**
     * @type {import('mongodb').MongoClient}
     */
    let mongoDbClient
    let listenerIds
    let firstQueueId
    let secondQueueId
    let thirdQueueId
    let firstClientId
    let secondClientId

    before(() => {
        mongoDbClient = new MongoClient('mongodb://127.0.0.1:27021')
    })

    beforeEach(() => {
        return mongoDbClient.connect()
    })

    beforeEach(async () => {
        listenerIds = [uuid(), uuid(), uuid(), uuid()]
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
        await listenersCollection.insertOne({
            _meta_data: {
                created_at: Timestamp.fromNumber(Date.now())
            },
            id: listenerIds.at(3),
            name: 'fourth'
        })

        const queuesCollection = mongoDbClient.db().collection('queues')
        await queuesCollection.insertOne({
            id: firstQueueId = uuid(),
            listeners: [
                listenerIds.at(0),
                listenerIds.at(1)
            ]
        })
        await queuesCollection.insertOne({
            id: secondQueueId = uuid(),
            listeners: [
                listenerIds.at(2)
            ]
        })
        await queuesCollection.insertOne({
            id: thirdQueueId = uuid(),
            listeners: [
                listenerIds.at(3)
            ]
        })

        const clientsCollection = mongoDbClient.db().collection('api_clients')
        await clientsCollection.insertOne({
            id: firstClientId = uuid(),
            queues: [
                firstQueueId,
                secondQueueId
            ]
        })
        await clientsCollection.insertOne({
            id: secondClientId = uuid(),
            queues: [
                thirdQueueId
            ]
        })

        return new Promise((resolve) => setTimeout(resolve, 50))
    })

    after(() => {
        return mongoDbClient.close()
    })

    after(() => {
        return listeners.close()
    })

    after(() => {
        return apiClients.close()
    })

    describe('.find', () => {
        it('returns a resource matched by name', async () => {
            const listener = await listeners.find([firstClientId, firstQueueId], { match: { name: 'first' } })
            expect(listener.id).to.equal(listenerIds.at(0))
        })
        it('returns null if no resource found', async () => {
            const listener = await listeners.find([firstClientId, firstQueueId], { match: { name: 'first123' } })
            expect(listener).to.be.null
        })
        it('does not return a resource if its not referenced by root', async () => {
            const listener = await listeners.find([secondClientId, firstQueueId], { match: { name: 'first' } })
            expect(listener).to.be.null
        })
        it('does not return a resource if its not referenced by root', async () => {
            const listener = await listeners.find([firstClientId, secondQueueId], { match: { name: 'first' } })
            expect(listener).to.be.null
        })
    })
})