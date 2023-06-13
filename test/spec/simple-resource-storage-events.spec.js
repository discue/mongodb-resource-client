'use strict'

const { MongoClient, Timestamp } = require('mongodb')
const Storage = require('../../lib/simple-resource-storage.js')
const expect = require('chai').expect
const { randomUUID: uuid, randomInt } = require('crypto')
const EventEmitter = require('node:events').EventEmitter

const eventEmitter = new EventEmitter()
const storage = new Storage({ url: 'mongodb://127.0.0.1:27017', collectionName: '_subscriptions', eventEmitter })

describe('SimpleResourceStorage', () => {

    /**
     * @type {import('mongodb').MongoClient}
     */
    let mongoDbClient
    let insertedDocumentId

    before(() => {
        mongoDbClient = new MongoClient('mongodb://127.0.0.1:27017')
    })

    beforeEach(() => {
        return mongoDbClient.connect()
    })

    beforeEach(() => {
        insertedDocumentId = uuid()
        const collection = mongoDbClient.db('default').collection('_subscriptions')
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

        return new Promise((resolve) => setTimeout(resolve, 100))
    })

    afterEach(async () => {
        try {
            const collection = mongoDbClient.db('default').collection('_subscriptions')
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
                    expect(event.context).to.equal('create')
                    expect(event.collectionName).to.equal('_subscriptions')
                    expect(event.error).to.be.false
                    expect(event.resource.my).to.equal('ghost')
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
                    expect(event.context).to.equal('update')
                    expect(event.collectionName).to.equal('_subscriptions')
                    expect(event.error).to.be.false
                    expect(event.resource.hello).to.equal('peter')
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
                    expect(event.context).to.equal('delete')
                    expect(event.collectionName).to.equal('_subscriptions')
                    expect(event.error).to.be.false
                    expect(event.resource).to.deep.equal(resource)
                    resolve()
                })
                storage.delete([insertedDocumentId]).catch(reject)
            })
        })
    })
})