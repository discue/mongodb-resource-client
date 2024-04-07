'use strict'

const { MongoClient, Timestamp } = require('mongodb')
const Storage = require('../../lib/one-to-many-resource-storage.js')
const expect = require('chai').expect
const { randomUUID: uuid, randomUUID } = require('crypto')
const EventEmitter = require('events')

describe('OnToManyResourceStorage Events', () => {
    const eventEmitter = new EventEmitter()

    /**
     * @type {import('mongodb').MongoClient}
     */
    let mongoDbClient
    let listenerIds
    let resourceId
    let storage

    before(() => {
        mongoDbClient = new MongoClient('mongodb://127.0.0.1:27021')
        storage = new Storage({ client: mongoDbClient, collectionName: 'queues', resourceName: 'listeners', enableTwoWayReferences: true, eventEmitter })
    })

    beforeEach(async () => {
        listenerIds = [uuid(), uuid(), uuid()]
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

        const queuesCollection = mongoDbClient.db().collection('queues')
        await queuesCollection.insertOne({
            id: resourceId = uuid(),
            listeners: [
                listenerIds.at(0),
                listenerIds.at(1)
            ]
        })

        return new Promise((resolve) => setTimeout(resolve, 50))
    })

    after(() => {
        return mongoDbClient.close()
    })

    after(() => {
        return storage.close()
    })

    describe('.create', () => {
        it('creates a new document', async () => {
            const newId = randomUUID()

            return new Promise((resolve, reject) => {
                eventEmitter.once(`${storage.usageEventPrefix}.create`, (event) => {
                    expect(event.resourceIds).to.deep.equal([resourceId, newId])
                    expect(event.collectionName).to.equal('listeners')
                    expect(event.error).to.be.false
                    expect(event.before).to.be.undefined
                    expect(event.after.my).to.equal('ghost')
                    resolve()
                })

                storage.create([resourceId, newId], { my: 'ghost' }).catch(reject)
            })
        })
    })

    describe('.update', () => {
        it('sends an update event', async () => {
            return new Promise((resolve, reject) => {
                eventEmitter.once(`${storage.usageEventPrefix}.update`, (event) => {
                    expect(event.resourceIds).to.deep.equal([resourceId, listenerIds.at(1)])
                    expect(event.collectionName).to.equal('listeners')
                    expect(event.error).to.be.false
                    expect(event.before.name).to.equal('second')
                    expect(event.after.name).to.equal('peter')
                    resolve()
                })
                storage.update([resourceId, listenerIds.at(1)], { 'name': 'peter' }).catch(reject)
            })
        })
    })

    describe('.delete', () => {
        it('sends a delete event', async () => {
            const resource = await storage.get([resourceId, listenerIds.at(1)])

            return new Promise((resolve, reject) => {
                eventEmitter.once(`${storage.usageEventPrefix}.delete`, (event) => {
                    expect(event.resourceIds).to.deep.equal([resourceId, listenerIds.at(1)])
                    expect(event.collectionName).to.equal('listeners')
                    expect(event.error).to.be.false
                    expect(event.before).to.deep.equal(resource)
                    expect(event.resource).to.be.undefined
                    resolve()
                })
                storage.delete([resourceId, listenerIds.at(1)]).catch(reject)
            })
        })
    })
})