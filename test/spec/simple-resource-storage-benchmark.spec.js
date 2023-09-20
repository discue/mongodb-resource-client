'use strict'

const { MongoClient, Timestamp } = require('mongodb')
const Storage = require('../../lib/simple-resource-storage.js')
const expect = require('chai').expect
const { randomUUID: uuid } = require('crypto')

const array = []
for (let i = 0, n = 20_000; i < n; i++) {
    array.push(i)
}

describe.skip('SimpleResourceStorage Benchmark', () => {
    const storage = new Storage({ url: 'mongodb://127.0.0.1:27021', collectionName: '_subscriptions' })

    /**
     * @type {import('mongodb').MongoClient}
     */
    let mongoDbClient
    let insertedDocumentId

    before(async () => {
        mongoDbClient = await MongoClient.connect('mongodb://127.0.0.1:27021', {
            // maxConnecting: 200,
            // maxPoolSize: 200,
            // maxIdleTimeMS: 20_000
        })
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
            id: uuid(),
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

    describe('.exists', () => {
        it('returns in time', async () => {
            return Promise.all(array.map(() => {
                return new Promise((resolve, reject) => {
                    storage.exists([insertedDocumentId]).then((exists) => {
                        expect(exists).to.be.true
                    }).then(resolve, reject)
                })
            }))
        }).timeout(20_000)
    })

    describe('.getAll', () => {
        it('returns in time', async () => {
            return Promise.all(array.map(() => {
                return new Promise((resolve, reject) => {
                    storage.getAll().then((docs) => {
                        expect(docs).to.have.length(2)
                        expect(docs._id).to.be.undefined
                    }).then(resolve, reject)
                })
            }))
        }).timeout(20_000)
    })


    describe('.get', () => {
        it('returns in time', async () => {
            return Promise.all(array.map(() => {
                return new Promise((resolve, reject) => {
                    storage.get([insertedDocumentId]).then((doc) => {
                        expect(doc.id).not.to.be.undefined
                        expect(doc.id).not.to.be.null
                        expect(doc.hello).to.equal('world')
                    }).then(resolve, reject)
                })
            }))
        }).timeout(20_000)
    })

    describe('.create', () => {
        it('returns in time', async () => {
            let i = 0
            return Promise.all(array.map(() => {
                const id = uuid()
                return new Promise((resolve, reject) => {
                    storage.create(id, { my: id })
                        .then(() => storage.get(id))
                        .then(({ my }) => {
                            expect(my).to.equal(id)
                            setImmediate(() => {
                                console.log(`Received ${++i} of ${array.length}`)
                            })
                        })
                        .then(resolve, reject)
                })
            }))
        }).timeout(30_000)
    })

    describe('.updates', () => {
        it('returns in time', async () => {
            for (let i = 0, n = 15_000; i < n; i++) {
                await storage.update([insertedDocumentId], { hello: 'peter' })
                const doc = await storage.get(insertedDocumentId)
                expect(doc.hello).to.equal('peter')
            }
        }).timeout(20_000)
    })

    describe('.deletes', () => {
        it('deletes a document', async () => {
            await storage.delete([insertedDocumentId])
            const doc = await storage.get(insertedDocumentId)
            expect(doc).to.be.null
        })
        it('throws if document does not exist', async () => {
            return new Promise((resolve, reject) => {
                storage.delete('abc').then(reject, resolve)
            })
        })
    })
})