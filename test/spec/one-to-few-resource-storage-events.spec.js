'use strict'

const { MongoClient, Timestamp } = require('mongodb')
const Storage = require('../../lib/one-to-few-resource-storage.js')
const expect = require('chai').expect
const { randomInt } = require('crypto')
const EventEmitter = require('events')

describe('OneToFewResourceStorage Events', () => {
    const eventEmitter = new EventEmitter()
    const storage = new Storage({ url: 'mongodb://127.0.0.1:27017', collectionName: 'api_clients', resourceName: 'queues', eventEmitter })
    
    /**
     * @type {import('mongodb').MongoClient}
     */
    let mongoDbClient
    let insertedDocumentId
    let testDocOfChoice

    before(() => {
        mongoDbClient = new MongoClient('mongodb://127.0.0.1:27017')
    })

    beforeEach(() => {
        return mongoDbClient.connect()
    })

    beforeEach(async () => {
        insertedDocumentId = randomInt(999999)
        const collection = mongoDbClient.db().collection('api_clients')
        await collection.insertOne({
            id: randomInt(10000),
            queues: [
                {
                    id: 123, _meta_data: {
                        created_at: Timestamp.fromNumber(Date.now())
                    },
                    name: '11'
                },
                {
                    id: 456, _meta_data: {
                        created_at: Timestamp.fromNumber(Date.now())
                    },
                    name: '21'
                },
                {
                    id: 999, _meta_data: {
                        created_at: Timestamp.fromNumber(Date.now())
                    },
                    name: '31'
                }
            ]
        })
        await collection.insertOne({
            id: insertedDocumentId,
            queues: [
                {
                    id: 123, _meta_data: {
                        created_at: Timestamp.fromNumber(Date.now())
                    },
                    name: '1'
                },
                {
                    id: 456, _meta_data: {
                        created_at: Timestamp.fromNumber(Date.now())
                    },
                    name: '2'
                },
                testDocOfChoice = {
                    id: 999, _meta_data: {
                        created_at: Timestamp.fromNumber(Date.now())
                    },
                    name: '3'
                }
            ]
        })

        return new Promise((resolve) => setTimeout(resolve, 50))
    })

    beforeEach(async () => {
        const collection = mongoDbClient.db().collection('unrelated_collection')
        await collection.insertOne({
            id: randomInt(10000),
            tasks: [
                {
                    id: 123, _meta_data: {
                        created_at: Timestamp.fromNumber(Date.now())
                    },
                    name: '11'
                },
                {
                    id: 456, _meta_data: {
                        created_at: Timestamp.fromNumber(Date.now())
                    },
                    name: '21'
                },
                {
                    id: 999, _meta_data: {
                        created_at: Timestamp.fromNumber(Date.now())
                    },
                    name: '31'
                }
            ]
        })
        await collection.insertOne({
            id: insertedDocumentId,
            tasks: [
                {
                    id: 123, _meta_data: {
                        created_at: Timestamp.fromNumber(Date.now())
                    },
                    name: '1'
                },
                {
                    id: 456, _meta_data: {
                        created_at: Timestamp.fromNumber(Date.now())
                    },
                    name: '2'
                },
                {
                    id: 999, _meta_data: {
                        created_at: Timestamp.fromNumber(Date.now())
                    },
                    name: '3'
                }
            ]
        })
    })

    after(() => {
        return mongoDbClient.close()
    })

    after(() => {
        return storage.close()
    })

    describe('.create', () => {
        it('creates a create event', async () => {
            const newId = randomInt(55555)

            return new Promise((resolve, reject) => {
                eventEmitter.once(`${storage.usageEventPrefix}.create`, (event) => {
                    expect(event.resourceIds).to.deep.equal([insertedDocumentId, newId])
                    expect(event.collectionName).to.equal('queues')
                    expect(event.error).to.be.false
                    expect(event.before).to.be.undefined
                    expect(event.after).to.deep.equal({ my: 'ghost' })
                    resolve()
                })
                storage.create([insertedDocumentId, newId], { my: 'ghost' }).catch(reject)
            })
        })
    })

    describe('.update', () => {
        it('creates an update event', async () => {
            return new Promise((resolve, reject) => {
                eventEmitter.once(`${storage.usageEventPrefix}.update`, (event) => {
                    expect(event.resourceIds).to.deep.equal([insertedDocumentId, 999])
                    expect(event.collectionName).to.equal('queues')
                    expect(event.error).to.be.false
                    expect(event.before.id).to.equal(testDocOfChoice.id)
                    expect(event.before.name).to.equal(testDocOfChoice.name)
                    expect(event.after.id).to.equal(testDocOfChoice.id)
                    expect(event.after.name).to.equal('peter')
                    resolve()
                })

                storage.update([insertedDocumentId, 999], { 'queues.name': 'peter' }).catch(reject)
            })
        })
    })

    describe('.delete', () => {
        it('creates a delete event', async () => {
            return new Promise((resolve, reject) => {
                eventEmitter.once(`${storage.usageEventPrefix}.delete`, (event) => {
                    expect(event.resourceIds).to.deep.equal([insertedDocumentId, 999])
                    expect(event.collectionName).to.equal('queues')
                    expect(event.error).to.be.false
                    expect(event.before.id).to.equal(testDocOfChoice.id)
                    expect(event.before.name).to.equal(testDocOfChoice.name)
                    expect(event.after).to.be.undefined
                    resolve()
                })

                storage.delete([insertedDocumentId, 999], { 'queues.name': 'peter' }).catch(reject)
            })
        })
    })
})