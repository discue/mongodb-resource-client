'use strict'

const { MongoClient, Timestamp } = require('mongodb')
const Storage = require('../../lib/simple-resource-storage.js')
const expect = require('chai').expect
const { randomUUID: uuid, randomInt } = require('crypto')
const EventEmitter = require('node:events').EventEmitter

describe('SimpleResourceStorage Events', () => {
    const eventEmitter = new EventEmitter()
    const storage = new Storage({ url: 'mongodb://127.0.0.1:27021', collectionName: '_subscriptions', eventEmitter })
    
    /**
     * @type {import('mongodb').MongoClient}
     */
    let mongoDbClient
    let insertedDocumentId

    before(() => {
        mongoDbClient = new MongoClient('mongodb://127.0.0.1:27021')
    })

    beforeEach(() => {
        return mongoDbClient.connect()
    })

    beforeEach(() => {
        insertedDocumentId = uuid()
        const collection = mongoDbClient.db().collection('_subscriptions')
        collection.insertOne({
            _meta_data: {
                created_at: Timestamp.fromNumber(Date.now())
            },
            id: insertedDocumentId,
            hello: 'world'
        })
        collection.insertOne({
            _meta_data: {
                created_at: Timestamp.fromNumber(Date.now())
            },
            id: randomInt(11111),
            hello: 'world2'
        })

        return new Promise((resolve) => setTimeout(resolve, 50))
    })

    afterEach(async () => {
        try {
            const collection = mongoDbClient.db().collection('_subscriptions')
            await collection.drop()
        } catch (e) {
            //
        }
    })

    after(() => {
        return mongoDbClient.close()
    })

    after(() => {
        return storage.close()
    })

    describe('.create', () => {
        it('sends a create event', async () => {
            return new Promise((resolve, reject) => {
                const id = uuid()
                eventEmitter.once(`${storage.usageEventPrefix}.create`, async (event) => {
                    expect(event.resourceIds).to.equal(id)
                    expect(event.collectionName).to.equal('_subscriptions')
                    expect(event.error).to.be.false
                    expect(event.before).to.be.undefined
                    expect(event.after.my).to.equal('ghost')
                    resolve()
                })
                storage.create(id, { my: 'ghost' }).catch(reject)
            })
        })
    })

    describe('.updates', () => {
        it('creates an update event', async () => {
            return new Promise((resolve, reject) => {
                eventEmitter.once(`${storage.usageEventPrefix}.update`, async (event) => {
                    expect(event.resourceIds).to.deep.equal([insertedDocumentId])
                    expect(event.collectionName).to.equal('_subscriptions')
                    expect(event.error).to.be.false
                    expect(event.before.hello).to.equal('world')
                    expect(event.after.hello).to.equal('peter')
                    resolve()
                })
                storage.update([insertedDocumentId], { hello: 'peter' }).catch(reject)
            })
        })
    })

    describe('.deletes', () => {
        it('creates a delete event', async () => {
            const resource = await storage.get([insertedDocumentId])

            return new Promise((resolve, reject) => {
                eventEmitter.once(`${storage.usageEventPrefix}.delete`, (event) => {
                    expect(event.resourceIds).to.deep.equal([insertedDocumentId])
                    expect(event.collectionName).to.equal('_subscriptions')
                    expect(event.error).to.be.false
                    expect(event.before).to.deep.equal(resource)
                    expect(event.after).to.be.undefined
                    resolve()
                })
                storage.delete([insertedDocumentId]).catch(reject)
            })
        })
    })
})