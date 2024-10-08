import { expect } from 'chai'
import { randomUUID as uuid } from 'crypto'
import * as mongodb from 'mongodb'
import OneToManyStorage from '../../lib/one-to-many-resource-storage.js'
import SimpleStorage from '../../lib/simple-resource-storage.js'
import retry from '../retry.js'

const { MongoClient } = mongodb

describe('OneToManyResourceStorage Nested', () => {
    let mongoDbClient
    let apiClientIds
    let queueIds
    let listenerIds
    let apiClientsStorage
    let queuesStorage
    let listenersStorage
    before(() => {
        mongoDbClient = new MongoClient('mongodb://127.0.0.1:27021/?replicaSet=rs0')
    })
    beforeEach(() => {
        apiClientIds = []
        queueIds = []
        listenerIds = []
        apiClientsStorage = new SimpleStorage({ client: mongoDbClient, collectionName: 'api_clients' })
        queuesStorage = new OneToManyStorage({ client: mongoDbClient, collectionName: 'api_clients', resourcePath: 'api_clients', resourceName: 'queues', enableTwoWayReferences: true })
        listenersStorage = new OneToManyStorage({ client: mongoDbClient, collectionName: 'queues', resourcePath: 'api_clients/queues', resourceName: 'listeners', enableTwoWayReferences: true })
    })
    beforeEach(async () => {
        return retry(async () => {
            const indexes = await mongoDbClient.db('test').collection('queues').listIndexes().toArray()
            expect(indexes).to.have.length(2)
        })
    })
    beforeEach(async () => {
        for (let i = 0, n = 5; i < n; i++) {
            const id = uuid()
            apiClientIds.push(id)
            await apiClientsStorage.create([id], {})
        }
        for (let j = 0, m = 2; j < m; j++) {
            for (let i = 0, n = 5; i < n; i++) {
                const id = uuid()
                queueIds.push(id)
                await queuesStorage.create([apiClientIds.at(j), id], {})
            }
        }
        for (let j = 0, m = 2; j < m; j++) {
            for (let i = 0, n = 3; i < n; i++) {
                const id = uuid()
                listenerIds.push(id)
                await listenersStorage.create([apiClientIds.at(0), queueIds.at(j), id], { i, j })
            }
        }
    })
    after(() => {
        return Promise.all([
            apiClientsStorage.close()
        ])
    })
    it('queries by ids using an index', async () => {
        const id = await listenersStorage.get([apiClientIds.at(0), queueIds.at(0), listenerIds.at(0)])
        expect(id).not.to.be.null
        const { stages: [{ $cursor: { executionStats } }] } = await mongoDbClient.db('test').collection('api_clients').aggregate([
            {
                '$match': {
                    'id': {
                        '$eq': apiClientIds.at(0)
                    }
                }
            },
            {
                '$project': {
                    '_id': 0,
                    '_meta_data': 0
                }
            },
            {
                '$lookup': {
                    'from': 'queues',
                    'pipeline': [
                        {
                            '$match': {
                                'id': {
                                    '$eq': queueIds.at(0)
                                }
                            }
                        }
                    ],
                    'as': 'queues',
                    'localField': 'queues',
                    'foreignField': 'id'
                }
            },
            {
                '$unwind': '$queues'
            },
            {
                '$replaceRoot': {
                    'newRoot': '$queues'
                }
            },
            {
                '$match': {
                    'id': {
                        '$eq': queueIds.at(0)
                    }
                }
            },
            {
                '$project': {
                    '_id': 0,
                    '_meta_data': 0
                }
            },
            {
                '$lookup': {
                    'from': 'listeners',
                    'pipeline': [
                        {
                            '$match': {
                                'id': {
                                    '$eq': listenerIds.at(0)
                                }
                            }
                        }
                    ],
                    'as': 'listeners',
                    'localField': 'listeners',
                    'foreignField': 'id'
                }
            },
            {
                '$unwind': '$listeners'
            },
            {
                '$replaceRoot': {
                    'newRoot': '$listeners'
                }
            },
            {
                '$project': {
                    '_id': 0,
                    '_meta_data': 0
                }
            }
        ]).explain('executionStats')
        expect(executionStats.totalKeysExamined).to.equal(1)
    })
})
