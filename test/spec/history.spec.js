'use strict'

const { MongoClient } = require('mongodb')
const Storage = require('../../lib/simple-resource-storage.js')
const History = require('../../lib/history.js')
const expect = require('chai').expect
const { randomUUID: uuid } = require('crypto')
const { EventEmitter } = require('events')

describe('History', () => {

    /**
     * @type {import('mongodb').MongoClient}
     */
    let mongoDbClient

    before(() => {
        mongoDbClient = new MongoClient('mongodb://127.0.0.1:27021')
    })

    beforeEach(() => {
        return mongoDbClient.connect()
    })

    after(() => {
        return mongoDbClient.close()
    })

    describe('configured via constructor', () => {
        const eventEmitter = new EventEmitter()
        const storage = new Storage({ url: 'mongodb://127.0.0.1:27021', collectionName: '_subscriptions', eventEmitter })
        const history = new History({ url: 'mongodb://127.0.0.1:27021', collectionName: '_subscriptions_history', usageEventPrefix: storage.usageEventPrefix, eventEmitter })
        history.listenForStorageEvents()

        after(() => {
            return storage.close()
        })

        after(() => {
            return history.close()
        })

        describe('.create', () => {
            it('events are handled and create a history element', async () => {
                const id = uuid()
                await storage.create(id, { my: 'ghost' })
                const doc = await storage.get(id)
                expect(doc.my).to.equal('ghost')
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions_history')
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

                const coll = mongoDbClient.db().collection('_subscriptions_history')
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

                const coll = mongoDbClient.db().collection('_subscriptions_history')
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

                const coll = mongoDbClient.db().collection('_subscriptions_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)
                expect(event.history).to.have.length(2)
            })

            it('events contain correct action property', async () => {
                await storage.update([id], { hello: 'peter' })
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)

                const [create, update] = event.history
                expect(create.action).to.equal('create')
                expect(update.action).to.equal('update')
            })

            it('events contain the updated resource', async () => {
                await storage.update([id], { hello: 'peter' })
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions_history')
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

                const coll = mongoDbClient.db().collection('_subscriptions_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)
                expect(event.history).to.have.length(2)
            })

            it('events contain correct action property', async () => {
                await storage.delete([id])
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)

                const [create, update] = event.history
                expect(create.action).to.equal('create')
                expect(update.action).to.equal('delete')
            })

            it('events contain the updated resource', async () => {
                await storage.delete([id])
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)
                expect(event.history).to.have.length(2)

                const [, update] = event.history
                expect(update.resource).to.be.null
            })
        })
    })
    
    describe('enabled at runtime', () => {
        const storage = new Storage({ url: 'mongodb://127.0.0.1:27021', collectionName: '_subscriptions' })

        after(() => {
            return storage.close()
        })

        before(() => {
            const eventEmitter = new EventEmitter()
            storage.enableEventing(eventEmitter)

            const history = new History({ url: 'mongodb://127.0.0.1:27021', collectionName: '_subscriptions2_history', usageEventPrefix: storage.usageEventPrefix, eventEmitter })
            history.listenForStorageEvents()

            after(() => {
                return history.close()
            })
        })

        describe('.create', () => {
            it('events are handled and create a history element', async () => {
                const id = uuid()
                await storage.create(id, { my: 'ghost' })
                const doc = await storage.get(id)
                expect(doc.my).to.equal('ghost')
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions2_history')
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

                const coll = mongoDbClient.db().collection('_subscriptions2_history')
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

                const coll = mongoDbClient.db().collection('_subscriptions2_history')
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

                const coll = mongoDbClient.db().collection('_subscriptions2_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)
                expect(event.history).to.have.length(2)
            })

            it('events contain correct action property', async () => {
                await storage.update([id], { hello: 'peter' })
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions2_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)

                const [create, update] = event.history
                expect(create.action).to.equal('create')
                expect(update.action).to.equal('update')
            })

            it('events contain the updated resource', async () => {
                await storage.update([id], { hello: 'peter' })
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions2_history')
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

                const coll = mongoDbClient.db().collection('_subscriptions2_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)
                expect(event.history).to.have.length(2)
            })

            it('events contain correct action property', async () => {
                await storage.delete([id])
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions2_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)

                const [create, update] = event.history
                expect(create.action).to.equal('create')
                expect(update.action).to.equal('delete')
            })

            it('events contain the updated resource', async () => {
                await storage.delete([id])
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions2_history')
                const all = await coll.find().toArray()
                const event = all.find(event => event.id === id)
                expect(event.history).to.have.length(2)

                const [, update] = event.history
                expect(update.resource).to.be.null
            })
        })
    })
    describe('disabled at runtime', () => {
        const storage = new Storage({ url: 'mongodb://127.0.0.1:27021', collectionName: '_subscriptions' })

        after(() => {
            return storage.close()
        })

        before(() => {
            const eventEmitter = new EventEmitter()
            storage.enableEventing(eventEmitter)

            const history = new History({ url: 'mongodb://127.0.0.1:27021', collectionName: '_subscriptions3_history', usageEventPrefix: storage.usageEventPrefix, eventEmitter })
            history.listenForStorageEvents()

            storage.disableEventing()

            after(() => {
                return history.close()
            })
        })

        describe('.create', () => {
            it('events are handled and create a history element', async () => {
                const id = uuid()
                await storage.create(id, { my: 'ghost' })
                const doc = await storage.get(id)
                expect(doc.my).to.equal('ghost')
                await new Promise((resolve) => setTimeout(resolve, 200))

                const coll = mongoDbClient.db().collection('_subscriptions3_history')
                const all = await coll.find().toArray()
                expect(all).to.have.length(0)
            })
        })
    })
})