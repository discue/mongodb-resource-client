'use strict'

const OneToManyStorage = require('../../lib/one-to-many-resource-storage.js')
const SimpleStorage = require('../../lib/simple-resource-storage.js')
const expect = require('chai').expect
const { randomUUID: uuid } = require('crypto')

const apiClientsStorage = new SimpleStorage({ url: 'mongodb://127.0.0.1:27017', collectionName: 'api_clients' })
const queuesStorage = new OneToManyStorage({ url: 'mongodb://127.0.0.1:27017', collectionName: 'api_clients', resourcePath: 'api_clients', resourceName: 'queues', enableTwoWayReferences: true })
const listenersStorage = new OneToManyStorage({ url: 'mongodb://127.0.0.1:27017', collectionName: 'queues', resourcePath: 'api_clients/queues', resourceName: 'listeners', enableTwoWayReferences: true })

describe('OnToManyResourceStorage Nested', () => {

    let apiClientId
    let queueId
    let listenerId

    beforeEach(async () => {
        await apiClientsStorage.create([apiClientId = uuid()], {})
        await queuesStorage.create([apiClientId, queueId = uuid()], {})
        await listenersStorage.create([apiClientId, queueId, listenerId = uuid()], {})

        return new Promise((resolve) => setTimeout(resolve, 100))
    })

    after(() => {
        return Promise.all([
            apiClientsStorage.close(),
            queuesStorage.close(),
            listenersStorage.close()
        ])
    })

    describe('.create', () => {
        it('links also nested entities correctly', async () => {
            const { queues } = await apiClientsStorage.get([apiClientId])
            expect(queues).to.have.length(1)
            expect(queues).to.deep.equal([queueId])

            const { listeners } = await queuesStorage.get([apiClientId, queueId])
            expect(listeners).to.have.length(1)
            expect(listeners).to.deep.equal([listenerId])
        })

        it('allows to traverse the hierarchy', async () => {
            const { queues } = await apiClientsStorage.get([apiClientId])
            const { listeners } = await queuesStorage.get([apiClientId, queues.at(0)])

            const listener = await listenersStorage.get([apiClientId, queues.at(0), listeners.at(0)])
            expect(listener).not.be.be.undefined
            expect(listener).not.be.be.null
        })
    })

    describe('.get', () => {
        it('verifies last and second to last id reference each other', async () => {
            const { queues } = await apiClientsStorage.get([apiClientId])
            const { listeners } = await queuesStorage.get([apiClientId, queues.at(0)])

            const listener = await listenersStorage.get([123, 123, listeners.at(0)])
            expect(listener).be.be.null
        })
        it('verifies all resource ids are referenced', async () => {
            const { queues } = await apiClientsStorage.get([apiClientId])
            const { listeners } = await queuesStorage.get([apiClientId, queues.at(0)])

            const listener = await listenersStorage.get([123, queues.at(0), listeners.at(0)])
            expect(listener).be.be.null
        })
    })

    describe('.getAll', () => {
        it('verifies last and second to last id reference each other', async () => {
            const listener = await listenersStorage.get([123, 123])
            expect(listener).be.be.null
        })
        it('verifies all resource ids are referenced', async () => {
            const { queues } = await apiClientsStorage.get([apiClientId])
            const listener = await listenersStorage.get([123, queues.at(0)])
            expect(listener).be.be.null
        })
    })
})