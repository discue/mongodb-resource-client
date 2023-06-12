'use strict'

const { MongoClient, Timestamp } = require('mongodb')
const Storage = require('../../lib/one-to-many-resource-storage.js')
const expect = require('chai').expect
const { randomInt, randomUUID: uuid } = require('crypto')
const EventEmitter = require('events')

const eventEmitter = new EventEmitter()
const storage = new Storage({ url: 'mongodb://127.0.0.1:27017', collectionName: 'queues', resourceName: 'listeners', enableTwoWayReferences: true, eventEmitter })

describe('OnToManyResourceStorage', () => {

    /**
     * @type {import('mongodb').MongoClient}
     */
    let mongoDbClient
    let listenerIds
    let resourceId

    before(() => {
        mongoDbClient = new MongoClient('mongodb://127.0.0.1:27017')
    })

    beforeEach(() => {
        return mongoDbClient.connect()
    })

    beforeEach(async () => {
        listenerIds = [uuid(), uuid(), uuid()]
        const listenersCollection = mongoDbClient.db('default').collection('listeners')
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

        const queuesCollection = mongoDbClient.db('default').collection('queues')
        await queuesCollection.insertOne({
            id: resourceId = uuid(),
            listeners: [
                listenerIds.at(0),
                listenerIds.at(1)
            ]
        })

        return new Promise((resolve) => setTimeout(resolve, 100))
    })

    after(() => {
        return mongoDbClient.close()
    })

    after(() => {
        return storage.close()
    })

    describe('.create', () => {
        it('creates a new document', async () => {
            const newId = randomInt(55555)

            return new Promise((resolve, reject) => {
                eventEmitter.once('listeners.create', (event) => {
                    expect(event.resourceIds).to.deep.equal([newId])
                    expect(event.context).to.equal('create')
                    expect(event.collectionName).to.equal('listeners')
                    expect(event.error).to.be.false
                    resolve()
                })

                storage.create([resourceId, newId], { my: 'ghost' }).catch(reject)
            })
        })
    })

    describe('.update', () => {
        it('sends an update event', async () => {
            return new Promise((resolve, reject) => {
                eventEmitter.once('listeners.update', (event) => {
                    expect(event.resourceIds).to.deep.equal([listenerIds.at(1)])
                    expect(event.context).to.equal('update')
                    expect(event.collectionName).to.equal('listeners')
                    expect(event.error).to.be.false
                    resolve()
                })
                storage.update([resourceId, listenerIds.at(1)], { 'name': 'peter' }).catch(reject)
            })
        })
    })

    describe('.delete', () => {
        it('sends a delete event', async () => {
            return new Promise((resolve, reject) => {
                eventEmitter.once('listeners.delete', (event) => {
                    expect(event.resourceIds).to.deep.equal([listenerIds.at(1)])
                    expect(event.context).to.equal('delete')
                    expect(event.collectionName).to.equal('listeners')
                    expect(event.error).to.be.false
                    resolve()
                })
                storage.delete([resourceId, listenerIds.at(1)]).catch(reject)
            })
        })
    })
})