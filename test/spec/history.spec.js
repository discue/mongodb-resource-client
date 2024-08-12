import { expect } from 'chai'
import { randomUUID as uuid } from 'crypto'
import * as mongodb from 'mongodb'
import Storage from '../../lib/simple-resource-storage.js'
import retry from '../retry.js'

const { MongoClient } = mongodb

describe('History', () => {
    /**
     * @type {import('mongodb').MongoClient}
     */
    let mongoDbClient = new MongoClient('mongodb://127.0.0.1:27021/?replicaSet=rs0')
    after(() => {
        return mongoDbClient.close()
    })
    describe('without dedicated collection', () => {
        describe('.create', () => {
            let storage
            before(async () => {
                storage = new Storage({ client: mongoDbClient, collectionName: 'mobile_subscriptions' })
                storage.enableHistory()
                await new Promise((resolve) => setTimeout(resolve, 2000))
            })
            it('events are handled and create a history element', async () => {
                const id = uuid()
                await storage.create(id, { my: 'ghost' })
                const history = mongoDbClient.db().collection('mobile_subscriptions_history')
                await retry(async () => {
                    const all = await history.find({ id }).toArray()
                    expect(all).to.have.length(1)
                    expect(all.at(0).history).to.have.length(1)
                })
            })
            it('events contain the created resource', async () => {
                const id = uuid()
                await storage.create(id, { my: 'ghost' })
                await new Promise((resolve) => setTimeout(resolve, 200))
                const history = mongoDbClient.db().collection('mobile_subscriptions_history')
                await retry(async () => {
                    const all = await history.find({ id }).toArray()
                    expect(all).to.have.length(1)
                    expect(all.at(0).history).to.have.length(1)
                    const [create] = all.at(0).history
                    expect(create.resource.my).to.equal('ghost')
                })
            })
            it('events contain correct action property', async () => {
                const id = uuid()
                await storage.create(id, { my: 'ghost' })
                await new Promise((resolve) => setTimeout(resolve, 200))
                const history = mongoDbClient.db().collection('mobile_subscriptions_history')
                await retry(async () => {
                    const all = await history.find({ id }).toArray()
                    expect(all).to.have.length(1)
                    expect(all.at(0).history).to.have.length(1)
                    const [create] = all.at(0).history
                    expect(create.action).to.equal('create')
                })
            })
        })
        describe('.delete', () => {
            let storage
            before(async () => {
                storage = new Storage({ client: mongoDbClient, collectionName: '_mobile_subscriptions4' })
                storage.enableHistory()
                await new Promise((resolve) => setTimeout(resolve, 2000))
            })
            it('events are handled and create a history element', async () => {
                const id = uuid()
                await storage.create(id, { my: 'ghost' })
                await storage.delete(id, { my: 'ghost' })
                const history = mongoDbClient.db().collection('_mobile_subscriptions4_history')
                await retry(async () => {
                    const all = await history.find({ id }).toArray()
                    expect(all).to.have.length(1)
                    expect(all.at(0).history).to.have.length(2)
                })
            })
            it('events contain the deleted resource', async () => {
                const id = uuid()
                await storage.create(id, { my: 'ghost' })
                await storage.delete(id, { my: 'ghost' })
                const history = mongoDbClient.db().collection('_mobile_subscriptions4_history')
                await retry(async () => {
                    const all = await history.find({ id }).toArray()
                    expect(all).to.have.length(1)
                    expect(all.at(0).history).to.have.length(2)
                    const [create] = all.at(-1).history
                    expect(create.resource.my).to.equal('ghost')
                })
            })
            it('events contain correct action property', async () => {
                const id = uuid()
                await storage.create(id, { my: 'ghost' })
                await storage.delete(id, { my: 'ghost' })
                const history = mongoDbClient.db().collection('_mobile_subscriptions4_history')
                await retry(async () => {
                    const all = await history.find({ id }).toArray()
                    expect(all).to.have.length(1)
                    expect(all.at(0).history).to.have.length(2)
                    const [create, del] = all.at(0).history
                    expect(create.action).to.equal('create')
                    expect(del.action).to.equal('delete')
                })
            })
        })
        describe('.update', () => {
            let id
            let storage
            before(async () => {
                storage = new Storage({ client: mongoDbClient, collectionName: 'mobile_subscriptions2' })
                storage.enableHistory()
                await new Promise((resolve) => setTimeout(resolve, 2000))
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
                const history = mongoDbClient.db().collection('mobile_subscriptions2_history')
                await retry(async () => {
                    const all = await history.find({ id }).toArray()
                    expect(all).to.have.length(1)
                    expect(all.at(0).history).to.have.length(2)
                })
            })
            it('events contain correct action property', async () => {
                await storage.update([id], { hello: 'peter' })
                await new Promise((resolve) => setTimeout(resolve, 200))
                const history = mongoDbClient.db().collection('mobile_subscriptions2_history')
                await retry(async () => {
                    const all = await history.find({ id }).toArray()
                    expect(all).to.have.length(1)
                    expect(all.at(0).history).to.have.length(2)
                    const [create, update] = all.at(0).history
                    expect(create.action).to.equal('create')
                    expect(update.action).to.equal('update')
                })
            })
            it('events contain the updated resource', async () => {
                await storage.update([id], { hello: 'peter' })
                await new Promise((resolve) => setTimeout(resolve, 200))
                const history = mongoDbClient.db().collection('mobile_subscriptions2_history')
                await retry(async () => {
                    const all = await history.find({ id }).toArray()
                    expect(all).to.have.length(1)
                    expect(all.at(0).history).to.have.length(2)
                    const [, update] = all.at(0).history
                    expect(update.resource.hello).to.equal('peter')
                })
            })
        })
    })

    describe('disabled at runtime', () => {
        let storage
        before(() => {
            storage = new Storage({ client: mongoDbClient, collectionName: '_mobile_subscriptions13' })
        })
        beforeEach(() => {
            storage.enableHistory()
        })
        describe('.create', () => {
            it('events are not sent anymore', async () => {
                const id = uuid()
                await storage.create(id, { my: 'ghost' })
                const history = mongoDbClient.db().collection('_mobile_subscriptions13_history')
                await retry(async () => {
                    const all = await history.find({ id }).toArray()
                    expect(all).to.have.length(1)
                    expect(all.at(0).history).to.have.length(1)
                })
                storage.disableHistory()
                await storage.create(uuid(), { my: 'ghost' })
                const all = await history.find({ id }).toArray()
                expect(all).to.have.length(1)
                expect(all.at(0).history).to.have.length(1)
            })
        })
        describe('.update', () => {
            it('events are not sent anymore', async () => {
                const id = uuid()
                await storage.create(id, { my: 'ghost' })
                await storage.update([id], { hello: 'peter' })
                const history = mongoDbClient.db().collection('_mobile_subscriptions13_history')
                await retry(async () => {
                    const all = await history.find({ id }).toArray()
                    expect(all).to.have.length(1)
                    expect(all.at(0).history).to.have.length(2)
                })
                storage.disableHistory()
                await storage.update([id], { hello: 'friend' })
                const all = await history.find({ id }).toArray()
                expect(all).to.have.length(1)
                expect(all.at(0).history).to.have.length(2)
            })
        })
        describe('.delete', () => {
            it('events are not sent anymore', async () => {
                const id = uuid()
                await storage.create(id, { my: 'ghost' })
                await storage.update([id], { hello: 'peter' })
                const history = mongoDbClient.db().collection('_mobile_subscriptions13_history')
                await retry(async () => {
                    const all = await history.find({ id }).toArray()
                    expect(all).to.have.length(1)
                    expect(all.at(0).history).to.have.length(2)
                })
                storage.disableHistory()
                await storage.delete([id])
                const all = await history.find({ id }).toArray()
                expect(all).to.have.length(1)
                expect(all.at(0).history).to.have.length(2)
            })
        })
    })
})
