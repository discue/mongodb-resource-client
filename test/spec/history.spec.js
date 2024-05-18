'use strict'

const { MongoClient } = require('mongodb')
const Storage = require('../../lib/simple-resource-storage.js')
const History = require('../../lib/history.js')
const expect = require('chai').expect
const { randomUUID: uuid } = require('crypto')
const { EventEmitter } = require('events')
const retry = require('../retry.js')

describe('History', () => {

    /**
     * @type {import('mongodb').MongoClient}
     */
    let mongoDbClient = new MongoClient('mongodb://127.0.0.1:27021/?replicaSet=rs0')

    after(() => {
        return mongoDbClient.close()
    })

    describe('without dedicated collection', () => {
        const eventEmitter = new EventEmitter()
        const storage = new Storage({ client: mongoDbClient, collectionName: '_subscriptions11', eventEmitter })

        before(() => {
            const history = new History({ client: mongoDbClient, collectionName: '_subscriptions11', usageEventPrefix: storage.usageEventPrefix, eventEmitter })
            history.listenForStorageEvents()
        })

        before(async () => {
            return retry(async () => {
                const indexes = await mongoDbClient.db('test').collection('_subscriptions11').listIndexes().toArray()
                expect(indexes).to.have.length(2)
            })
        })

        describe('.create', () => {
            it('events are handled and create a history element', async () => {
                const id = uuid()
                await storage.create(id, { my: 'ghost' })
                const doc = await storage.get(id)
                expect(doc.my).to.equal('ghost')
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions11')
                const all = await coll.find().toArray()
                expect(all).to.have.length(1)
                expect(all.at(0).history).to.have.length(1)
            })
            it('events contain the created resource', async () => {
                const id = uuid()
                await storage.create(id, { my: 'ghost' })
                const doc = await storage.get(id)
                expect(doc.my).to.equal('ghost')
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions11')
                const all = await coll.find({ id }).toArray()
                expect(all).to.have.length(1)
                expect(all.at(0).history).to.have.length(1)

                const [create] = all.at(0).history
                expect(create.resource.my).to.equal('ghost')
            })
            it('events contain correct action property', async () => {
                const id = uuid()
                await storage.create(id, { my: 'ghost' })
                const doc = await storage.get(id)
                expect(doc.my).to.equal('ghost')
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions11')
                const all = await coll.find({ id }).toArray()
                expect(all).to.have.length(1)
                expect(all.at(0).history).to.have.length(1)

                const [create] = all.at(0).history
                expect(create.action).to.equal('create')
            })
            it('registers events for all resources', async () => {
                const ids = [uuid(), uuid(), uuid()]
                await Promise.all(ids.map((id) => {
                    return storage.create(id, {})
                }))
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions11')
                const resources = await Promise.all(ids.map((id) => {
                    return coll.findOne({ id })
                }))
                resources.forEach((resource) => {
                    expect(resource.history).to.have.length(1)

                    const [create] = resource.history
                    expect(create.action).to.equal('create')
                })
            })
        })

        describe('.update', () => {
            let id

            beforeEach(async () => {
                id = uuid()
                await storage.create(id, { my: 'ghost' })
                const doc = await storage.get(id)
                expect(doc.my).to.equal('ghost')
            })

            it('events are handled and create a history element', async () => {
                await storage.update([id], { hello: 'peter' })
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions11')
                const all = await coll.find({ id }).toArray()
                expect(all).to.have.length(1)
                expect(all.at(0).history).to.have.length(2)
            })

            it('events contain correct action property', async () => {
                await storage.update([id], { hello: 'peter' })
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions11')
                const all = await coll.find({ id }).toArray()
                expect(all).to.have.length(1)
                expect(all.at(0).history).to.have.length(2)

                const [create, update] = all.at(0).history
                expect(create.action).to.equal('create')
                expect(update.action).to.equal('update')
            })

            it('events contain the updated resource', async () => {
                await storage.update([id], { hello: 'peter' })
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions11')
                const all = await coll.find({ id }).toArray()
                expect(all).to.have.length(1)
                expect(all.at(0).history).to.have.length(2)

                const [, update] = all.at(0).history
                expect(update.resource.hello).to.equal('peter')
            })
        })
    })

    describe('configured via constructor', () => {
        const eventEmitter = new EventEmitter()
        const storage = new Storage({ client: mongoDbClient, collectionName: '_subscriptions1', eventEmitter })

        before(() => {
            const history = new History({ client: mongoDbClient, collectionName: '_subscriptions12_history', usageEventPrefix: storage.usageEventPrefix, eventEmitter })
            history.listenForStorageEvents()
        })

        describe('.create', () => {
            it('events are handled and create a history element', async () => {
                const id = uuid()
                await storage.create(id, { my: 'ghost' })
                const doc = await storage.get(id)
                expect(doc.my).to.equal('ghost')
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions12_history')
                const all = await coll.find().toArray()
                expect(all).to.have.length(1)
                expect(all.at(0).id).to.equal(id)
            })
            it('events contain the created resource', async () => {
                const id = uuid()
                await storage.create(id, { my: 'ghost' })
                const doc = await storage.get(id)
                expect(doc.my).to.equal('ghost')
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions12_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)
                expect(event.history).to.have.length(1)

                const [create] = event.history
                expect(create.resource.my).to.equal('ghost')
            })
            it('events contain correct action property', async () => {
                const id = uuid()
                await storage.create(id, { my: 'ghost' })
                const doc = await storage.get(id)
                expect(doc.my).to.equal('ghost')
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions12_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)
                expect(event.history).to.have.length(1)

                const [create] = event.history
                expect(create.action).to.equal('create')
            })
        })

        describe('.update', () => {
            let id

            beforeEach(async () => {
                id = uuid()
                await storage.create(id, { my: 'ghost' })
                const doc = await storage.get(id)
                expect(doc.my).to.equal('ghost')
            })

            it('events are handled and create a history element', async () => {
                await storage.update([id], { hello: 'peter' })
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions12_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)
                expect(event.history).to.have.length(2)
            })

            it('events contain correct action property', async () => {
                await storage.update([id], { hello: 'peter' })
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions12_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)

                const [create, update] = event.history
                expect(create.action).to.equal('create')
                expect(update.action).to.equal('update')
            })

            it('events contain the updated resource', async () => {
                await storage.update([id], { hello: 'peter' })
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions12_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)
                expect(event.history).to.have.length(2)

                const [, update] = event.history
                expect(update.resource.hello).to.equal('peter')
            })
        })

        describe('.delete', () => {
            let id

            beforeEach(async () => {
                id = uuid()
                await storage.create(id, { my: 'ghost' })
                const doc = await storage.get(id)
                expect(doc.my).to.equal('ghost')
            })

            it('events are handled and create a history element', async () => {
                await storage.delete([id])
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions12_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)
                expect(event.history).to.have.length(2)
            })

            it('events contain correct action property', async () => {
                await storage.delete([id])
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions12_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)

                const [create, update] = event.history
                expect(create.action).to.equal('create')
                expect(update.action).to.equal('delete')
            })

            it('events contain the updated resource', async () => {
                await storage.delete([id])
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions12_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)
                expect(event.history).to.have.length(2)

                const [, update] = event.history
                expect(update.resource).to.be.null
            })
        })
    })

    describe('enabled at runtime', () => {
        describe('.create', () => {
            const storage = new Storage({ client: mongoDbClient, collectionName: '_subscriptions14' })

            before(() => {
                const eventEmitter = new EventEmitter()
                storage.enableEventing(eventEmitter)

                const history = new History({ client: mongoDbClient, collectionName: '_subscriptions14_history', usageEventPrefix: storage.usageEventPrefix, eventEmitter })
                history.listenForStorageEvents()
            })

            it('events are handled and create a history element', async () => {
                const id = uuid()
                await storage.create(id, { my: 'ghost' })
                const doc = await storage.get(id)
                expect(doc.my).to.equal('ghost')
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions14_history')
                const all = await coll.find().toArray()
                expect(all).to.have.length(1)
                expect(all.at(0).id).to.equal(id)
            })
            it('events contain the created resource', async () => {
                const id = uuid()
                await storage.create(id, { my: 'ghost' })
                const doc = await storage.get(id)
                expect(doc.my).to.equal('ghost')
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions14_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)
                expect(event.history).to.have.length(1)

                const [create] = event.history
                expect(create.resource.my).to.equal('ghost')
            })
            it('events contain correct action property', async () => {
                const id = uuid()
                await storage.create(id, { my: 'ghost' })
                const doc = await storage.get(id)
                expect(doc.my).to.equal('ghost')
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions14_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)
                expect(event.history).to.have.length(1)

                const [create] = event.history
                expect(create.action).to.equal('create')
            })
        })

        describe('.update', () => {
            let id

            const storage = new Storage({ client: mongoDbClient, collectionName: '_subscriptions15' })

            before(() => {
                const eventEmitter = new EventEmitter()
                storage.enableEventing(eventEmitter)

                const history = new History({ client: mongoDbClient, collectionName: '_subscriptions15_history', usageEventPrefix: storage.usageEventPrefix, eventEmitter })
                history.listenForStorageEvents()
            })

            beforeEach(async () => {
                id = uuid()
                await storage.create(id, { my: 'ghost' })
                const doc = await storage.get(id)
                expect(doc.my).to.equal('ghost')
            })

            it('events are handled and create a history element', async () => {
                await storage.update([id], { hello: 'peter' })
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions15_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)
                expect(event.history).to.have.length(2)
            })

            it('events contain correct action property', async () => {
                await storage.update([id], { hello: 'peter' })
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions15_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)

                const [create, update] = event.history
                expect(create.action).to.equal('create')
                expect(update.action).to.equal('update')
            })

            it('events contain the updated resource', async () => {
                await storage.update([id], { hello: 'peter' })
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions15_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)
                expect(event.history).to.have.length(2)

                const [, update] = event.history
                expect(update.resource.hello).to.equal('peter')
            })
        })

        describe('.delete', () => {
            let id

            const storage = new Storage({ client: mongoDbClient, collectionName: '_subscriptions16' })

            before(() => {
                const eventEmitter = new EventEmitter()
                storage.enableEventing(eventEmitter)

                const history = new History({ client: mongoDbClient, collectionName: '_subscriptions16_history', usageEventPrefix: storage.usageEventPrefix, eventEmitter })
                history.listenForStorageEvents()
            })

            beforeEach(async () => {
                id = uuid()
                await storage.create(id, { my: 'ghost' })
                const doc = await storage.get(id)
                expect(doc.my).to.equal('ghost')
            })

            it('events are handled and create a history element', async () => {
                await storage.delete([id])
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions16_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)
                expect(event.history).to.have.length(2)
            })

            it('events contain correct action property', async () => {
                await storage.delete([id])
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions16_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)

                const [create, update] = event.history
                expect(create.action).to.equal('create')
                expect(update.action).to.equal('delete')
            })

            it('events contain the updated resource', async () => {
                await storage.delete([id])
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions16_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)
                expect(event.history).to.have.length(2)

                const [, update] = event.history
                expect(update.resource).to.be.null
            })
        })
    })
    describe('disabled at runtime', () => {
        const storage = new Storage({ client: mongoDbClient, collectionName: '_subscriptions1' })

        before(() => {
            const eventEmitter = new EventEmitter()
            storage.enableEventing(eventEmitter)

            const history = new History({ client: mongoDbClient, collectionName: '_subscriptions13_history', usageEventPrefix: storage.usageEventPrefix, eventEmitter })
            history.listenForStorageEvents()

            storage.disableEventing()
        })

        describe('.create', () => {
            it('events are handled and create a history element', async () => {
                const id = uuid()
                await storage.create(id, { my: 'ghost' })
                const doc = await storage.get(id)
                expect(doc.my).to.equal('ghost')
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions13_history')
                const all = await coll.find().toArray()
                expect(all).to.have.length(0)
            })
        })
    })
})