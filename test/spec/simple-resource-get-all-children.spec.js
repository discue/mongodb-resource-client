'use strict'

const { MongoClient, Timestamp } = require('mongodb')
const Storage = require('../../lib/one-to-many-resource-storage.js')
const SimpleStorage = require('../../lib/simple-resource-storage.js')
const expect = require('chai').expect
const { randomUUID: uuid } = require('crypto')

describe('SimpleResourceStorage Get Children', () => {

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

    let listeners
    let apiClients

    before(() => {
        mongoDbClient = new MongoClient('mongodb://127.0.0.1:27021')

        listeners = new Storage({ client: mongoDbClient, collectionName: 'queues', resourceName: 'listeners', resourcePath: 'api_clients/queues', enableTwoWayReferences: true })
        apiClients = new SimpleStorage({ client: mongoDbClient, collectionName: 'api_clients' })
    
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

    describe('.getAllChildren', () => {
        it('returns all resources known to the parent\'s parent', async () => {
            const { children: storedListeners } = await apiClients.getAllChildren([firstClientId], 'queues/listeners')
            expect(storedListeners).to.have.length(3)
        })
        it('allows childPath with leading slash', async () => {
            const { resourcePaths } = await apiClients.getAllChildren([firstClientId], '/queues/listeners')
            expect(Object.keys(resourcePaths)).to.have.length(3)
        })
        it('returns the resource path of all children', async () => {
            const { resourcePaths } = await apiClients.getAllChildren([firstClientId], 'queues/listeners')
            expect(Object.keys(resourcePaths)).to.have.length(3)
        })
        it('returns resource path', async () => {
            const { resourcePaths } = await apiClients.getAllChildren([firstClientId], 'queues/listeners')
            expect(resourcePaths[listenerIds.at(0)]).to.equal(`/queues/${firstQueueId}/listeners/${listenerIds.at(0)}`)
            expect(resourcePaths[listenerIds.at(1)]).to.equal(`/queues/${firstQueueId}/listeners/${listenerIds.at(1)}`)
            expect(resourcePaths[listenerIds.at(2)]).to.equal(`/queues/${secondQueueId}/listeners/${listenerIds.at(2)}`)
        })
        it('does not return resources outside of the parent\'s tree', async () => {
            const { children: storedListeners } = await apiClients.getAllChildren([firstClientId], 'queues/listeners', { projection: { "name": 0 } })
            const idsOnly = storedListeners.map((listener) => listener.id)
            expect(idsOnly).not.to.contain(listenerIds.at(3))
        })
        it('returns only matching resources', async () => {
            const { children: storedListeners } = await apiClients.getAllChildren([firstClientId], 'queues/listeners', { match: { "name": 'third' } })
            expect(storedListeners).to.have.length(1)
            expect(storedListeners.at(0).name).to.equal('third')
        })
        it('returns only projected fields', async () => {
            const { children: storedListeners } = await apiClients.getAllChildren([secondClientId], 'queues/listeners', { projection: { name: 1 } })
            expect(storedListeners).to.have.length(1)
            expect(storedListeners.at(0)).to.have.keys('name')
        })
        it('returns all resources known to the parent\'s parent 2', async () => {
            const { children: storedListeners } = await apiClients.getAllChildren([secondClientId], 'queues/listeners')
            expect(storedListeners).to.have.length(1)
            expect(storedListeners.at(0).id).to.equal(listenerIds.at(3))
        })
        it('returns all resources known to the parent\'s parent and projects fields', async () => {
            const { children: storedListeners } = await apiClients.getAllChildren([firstClientId], 'queues/listeners', { projection: { "name": 0 } })

            expect(storedListeners).to.have.length(3)
            storedListeners.forEach((listener) => {
                expect(listener.name).to.be.undefined
            })
        })
    })
})