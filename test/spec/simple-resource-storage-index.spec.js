'use strict'

const { MongoClient } = require('mongodb')
const Storage = require('../../lib/simple-resource-storage.js')
const expect = require('chai').expect
const { randomUUID: uuid } = require('crypto')
const { EQUALS, EQUALS_ANY_OF, SORT_BY_DESC, LESS_THAN, LESS_THAN_OR_EQUAL, GREATER_THAN, GREATER_THAN_OR_EQUAL, LIMIT, SORT_BY_ASC, COUNT } = require('../../lib/aggregations.js')

describe('SimpleResourceStorage Index', () => {
    /**
     * @type {import('mongodb').MongoClient}
     */
    let mongoDbClient
    let storage

    let ids = []

    before(() => {
        mongoDbClient = new MongoClient('mongodb://127.0.0.1:27021')
        storage = new Storage({ client: mongoDbClient, collectionName: 'users' })
    })

    beforeEach(() => {
        const collection = mongoDbClient.db().collection('users')
        const firstId = uuid()
        ids.push(firstId)

        collection.insertOne({
            id: firstId,
            age: 22,
            name: 'Peter'
        })
        collection.insertOne({
            id: uuid(),
            age: 44,
            name: 'Peter'
        })
        collection.insertOne({
            id: uuid(),
            age: 32,
            name: 'Pan'
        })
        collection.insertOne({
            id: uuid(),
            age: 42,
            name: 'Ksenia'
        })

        return new Promise((resolve) => setTimeout(resolve, 50))
    })

    afterEach(() => {
        return mongoDbClient
            .db()
            .collection('users')
            .drop()
    })

    after(() => {
        return mongoDbClient.close()
    })

    after(() => {
        return storage.close()
    })

    it('queries by id using an index', async () => {
        const { executionStats } = await mongoDbClient.db().collection('users').find({ id: ids.at(0) }).explain('executionStats')
        expect(executionStats.totalKeysExamined).to.equal(1)
    })
})