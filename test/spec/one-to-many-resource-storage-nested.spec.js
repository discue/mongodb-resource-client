'use strict'

const OneToManyStorage = require('../../lib/one-to-many-resource-storage.js')
const SimpleStorage = require('../../lib/simple-resource-storage.js')
const expect = require('chai').expect
const { randomUUID: uuid } = require('crypto')

describe('OnToManyResourceStorage Nested', () => {
    const apiClientsStorage = new SimpleStorage({ url: 'mongodb://127.0.0.1:27017', collectionName: 'api_clients' })
    const queuesStorage = new OneToManyStorage({ url: 'mongodb://127.0.0.1:27017', collectionName: 'api_clients', resourcePath: 'api_clients', resourceName: 'queues', enableTwoWayReferences: true })
    const listenersStorage = new OneToManyStorage({ url: 'mongodb://127.0.0.1:27017', collectionName: 'queues', resourcePath: 'api_clients/queues', resourceName: 'listeners', enableTwoWayReferences: true })
    
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

        for (let i = 0, n = 5; i < n; i++) {
            const id = uuid()
            queueIds.push(id)
            await queuesStorage.create([apiClientIds.at(0), id], {})
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
            expect(queues).to.have.length(queueIds.length)

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
        it('verifies last and second to last id reference each other', async () => {
            const { queues } = await apiClientsStorage.get([apiClientIds.at(0)])
            const { listeners } = await queuesStorage.get([apiClientIds.at(0), queues.at(0)])

            const listener = await listenersStorage.get([123, 123, listeners.at(0)])
            expect(listener).be.be.null
        })
        it('verifies all resource ids are referenced', async () => {
            const { queues } = await apiClientsStorage.get([apiClientIds.at(0)])
            const { listeners } = await queuesStorage.get([apiClientIds.at(0), queues.at(0)])

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
            const { queues } = await apiClientsStorage.get([apiClientIds.at(0)])
            const listener = await listenersStorage.get([123, queues.at(0)])
            expect(listener).be.be.null
        })
    })

    describe('.findReferences', () => {
        it('looks up references in root collection', async () => {
            const refs = await listenersStorage.findReferences([apiClientIds.at(0)])
            expect(Object.keys(refs)).to.have.length(listenerIds.length)

            const hasAllRefs = Object.entries(refs).every(([ref, parentIds]) => {
                const hasApiClient = parentIds.at(0).at(0) === apiClientIds.at(0)
                const hasQueue = parentIds.at(0).at(1) === queueIds.at(0) || parentIds.at(0).at(1) === queueIds.at(1)
                const hasListener = listenerIds.some((id) => {
                    return ref === id
                })

                return hasApiClient && hasQueue && hasListener
            })
            expect(hasAllRefs).to.be.true
        })
        it('finds references in parent collection', async () => {
            const outlierListenerId = uuid()
            await listenersStorage.create([apiClientIds.at(0), queueIds.at(2), outlierListenerId], {})

            const refs = await listenersStorage.findReferences([apiClientIds.at(0), queueIds.at(2)])
            expect(Object.keys(refs)).to.have.length(1)

            const hasAllRefs = Object.entries(refs).every(([ref, parentIds]) => {
                const hasApiClient = parentIds.at(0).at(0) === apiClientIds.at(0)
                const hasQueue = parentIds.at(0).at(1) === queueIds.at(2)
                const hasListener = ref === outlierListenerId
                return hasApiClient && hasQueue && hasListener
            })
            expect(hasAllRefs).to.be.true
        })
        it('verifies given id is referenced by its parent', async () => {
            const outlierListenerId = uuid()
            await listenersStorage.create([apiClientIds.at(0), queueIds.at(2), outlierListenerId], {})

            const refs = await listenersStorage.findReferences([apiClientIds.at(1), queueIds.at(2)])
            expect(Object.keys(refs)).to.have.length(0)
        })
        it('returns the target id if it point to an entity', async () => {
            const refs = await listenersStorage.findReferences([apiClientIds.at(0), queueIds.at(0), listenerIds.at(0)])
            expect(Object.keys(refs)).to.have.length(1)

            const hasAllRefs = Object.entries(refs).every(([ref, parentIds]) => {
                const hasApiClient = parentIds.at(0).at(0) === apiClientIds.at(0)
                const hasQueue = parentIds.at(0).at(1) === queueIds.at(0)
                const hasListener = ref === listenerIds.at(0)
                return hasApiClient && hasQueue && hasListener
            })
            expect(hasAllRefs).to.be.true
        })
        it('also resolves references if ids point to an entity', async () => {
            let refs = await listenersStorage.findReferences([apiClientIds.at(0), queueIds.at(0), 123])
            expect(Object.keys(refs)).to.have.length(0)

            refs = await listenersStorage.findReferences([apiClientIds.at(0), queueIds.at(1), listenerIds.at(0)])
            expect(Object.keys(refs)).to.have.length(0)

            refs = await listenersStorage.findReferences([apiClientIds.at(1), queueIds.at(0), listenerIds.at(0)])
            expect(Object.keys(refs)).to.have.length(0)
        })
    })
})