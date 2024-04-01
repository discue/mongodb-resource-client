'use strict'

const OneToManyStorage = require('../../lib/one-to-many-resource-storage.js')
const SimpleStorage = require('../../lib/simple-resource-storage.js')
const expect = require('chai').expect
const { randomUUID: uuid } = require('crypto')

describe('OnToManyResourceStorage Nested', () => {
    const apiClientsStorage = new SimpleStorage({ url: 'mongodb://127.0.0.1:27021', collectionName: 'api_clients' })
    const queuesStorage = new OneToManyStorage({ url: 'mongodb://127.0.0.1:27021', collectionName: 'api_clients', resourcePath: 'api_clients', resourceName: 'queues', enableTwoWayReferences: true })
    const listenersStorage = new OneToManyStorage({ url: 'mongodb://127.0.0.1:27021', collectionName: 'queues', resourcePath: 'api_clients/queues', resourceName: 'listeners', enableTwoWayReferences: true })

    let apiClientIds
    let queueIds
    let listenerIds

    beforeEach(() => {
        apiClientIds = []
        queueIds = []
        listenerIds = []
    })

    beforeEach(async () => {
        for (let i = 0, n = 5; i < n; i++) {
            const id = uuid()
            apiClientIds.push(id)
            await apiClientsStorage.create([id], {})
        }

        for (let j = 0, m = 2; j < m; j++) {
            for (let i = 0, n = 5; i < n; i++) {
                const id = uuid()
                queueIds.push(id)
                await queuesStorage.create([apiClientIds.at(j), id], {})
            }
        }

        for (let j = 0, m = 2; j < m; j++) {
            for (let i = 0, n = 3; i < n; i++) {
                const id = uuid()
                listenerIds.push(id)
                await listenersStorage.create([apiClientIds.at(0), queueIds.at(j), id], {})
            }
        }

        return new Promise((resolve) => setTimeout(resolve, 50))
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
            const { queues } = await apiClientsStorage.get([apiClientIds.at(0)])
            expect(queues).to.have.length(5)

            const { listeners } = await queuesStorage.get([apiClientIds.at(0), queueIds.at(0)])
            expect(listeners).to.have.length(listenerIds.length / 2)
            listenerIds.slice(0, 3).forEach((id) => {
                expect(listeners).to.contain(id)
            })
        })

        it('allows to traverse the hierarchy', async () => {
            const { queues } = await apiClientsStorage.get([apiClientIds.at(0)])
            const { listeners } = await queuesStorage.get([apiClientIds.at(0), queues.at(0)])
            const listener = await listenersStorage.get([apiClientIds.at(0), queues.at(0), listeners.at(0)])
            expect(listener).not.be.be.undefined
            expect(listener).not.be.be.null
        })
    })

    describe('.get', () => {
        it('returns docs from nested resources', async () => {
            const { queues } = await apiClientsStorage.get([apiClientIds.at(0)])
            const { listeners } = await queuesStorage.get([apiClientIds.at(0), queues.at(0)])
            const listener = await listenersStorage.get([apiClientIds.at(0), queues.at(0), listeners.at(0)])
            expect(listener).not.be.be.null
            expect(listener).not.be.be.undefined
        })
        it('verifies last and second to last id reference each other', async () => {
            const { queues } = await apiClientsStorage.get([apiClientIds.at(0)])
            const { listeners } = await queuesStorage.get([apiClientIds.at(0), queues.at(0)])

            const listener = await listenersStorage.get([123, 123, listeners.at(0)])
            expect(listener).be.be.null
        })
        it('verifies all resource ids are referenced', async () => {
            const { queues } = await apiClientsStorage.get([apiClientIds.at(0)])
            const { listeners } = await queuesStorage.get([apiClientIds.at(0), queues.at(0)])

            const listener = await listenersStorage.get([apiClientIds.at(1), queues.at(0), listeners.at(0)])
            expect(listener).be.be.null
        })
        it('verifies all resource ids are referenced', async () => {
            const { queues } = await apiClientsStorage.get([apiClientIds.at(0)])
            const { listeners } = await queuesStorage.get([apiClientIds.at(0), queues.at(0)])

            const listener = await listenersStorage.get([apiClientIds.at(0), queues.at(1), listeners.at(0)])
            expect(listener).be.be.null
        })
        it('verifies all resource ids are referenced 3', async () => {
            const { queues } = await apiClientsStorage.get([apiClientIds.at(0)])
            const { listeners } = await queuesStorage.get([apiClientIds.at(0), queues.at(0)])

            const listener = await listenersStorage.get([apiClientIds.at(0), queues.at(0), listeners.at(5)])
            expect(listener).be.be.null
        })
    })

    describe('.getAll', () => {
        it('verifies last and second to last id reference each other', async () => {
            const listeners = await listenersStorage.getAll([123, 123])
            expect(listeners).to.be.empty
        })
        it('verifies all resource ids are referenced 1', async () => {
            const { queues } = await apiClientsStorage.get([apiClientIds.at(0)])
            const listeners = await listenersStorage.getAll([123, queues.at(0)])
            expect(listeners).to.be.empty
        })
        it('verifies all resource ids are referenced 2', async () => {
            const { queues } = await apiClientsStorage.get([apiClientIds.at(1)])
            const listeners = await listenersStorage.getAll([apiClientIds.at(-1), queues.at(0)])
            expect(listeners).to.be.empty
        })
        it('requires a minimum length of resource ids', async () => {
            try {
                await listenersStorage.getAll([apiClientIds.at(0)])
                throw new Error('Needs to throw because not enough resource ids passed')
            } catch (e) {
                expect(e.message).to.contain('dont match lengths')
            }
        })
    })
})