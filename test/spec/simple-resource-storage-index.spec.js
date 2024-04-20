'use strict'

const { MongoClient } = require('mongodb')
const Storage = require('../../lib/simple-resource-storage.js')
const expect = require('chai').expect
const { randomUUID: uuid } = require('crypto')
const { EQUALS } = require('../../lib/aggregations.js')

describe('SimpleResourceStorage Index', () => {
    /**
     * @type {import('mongodb').MongoClient}
     */
    let mongoDbClient
    let storage

    let ids = []

    before(() => {
        mongoDbClient = new MongoClient('mongodb://127.0.0.1:27021')
        storage = new Storage({ client: mongoDbClient, collectionName: 'users', indexes: [{ age: 1 }, { name: 1 }] })
    })

    before(() => {
        const collection = mongoDbClient.db('test').collection('users')
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
            age: 32,
            name: 'Mike'
        })
        collection.insertOne({
            id: uuid(),
            age: 42,
            name: 'Ksenia'
        })

        return new Promise((resolve) => setTimeout(resolve, 50))
    })

    after(() => {
        return mongoDbClient.close()
    })

    after(() => {
        return storage.close()
    })

    it('queries by id using an index', async () => {
        const stats = await mongoDbClient.db('test').collection('users').find({ id: ids.at(0) }).explain('executionStats')
        expect(stats.executionStats.totalDocsExamined).to.equal(1)
    })


    it('queries by other fields using a custom single field index', async () => {
        const indexes = await mongoDbClient.db('test').collection('users').listIndexes().toArray()
        const stats = await mongoDbClient.db('test').collection('users').find({ age: 42 }).explain('executionStats')
        expect(stats.executionStats.totalDocsExamined).to.equal(1)
    })

    it('queries by other fields using a custom index', async () => {
        const stats = await mongoDbClient.db('test').collection('users').find({ age: 32, name: 'Mike' }).explain('executionStats')
        // console.log('stats', JSON.stringify(stats, null, 2))
        expect(stats.executionStats.totalDocsExamined).to.equal(1)
    })

    it('queries by other fields using a custom index', async () => {
        const stats = await mongoDbClient.db('test').collection('users').aggregate([
            EQUALS('age', 32),
            EQUALS('name', 'Mike')
        ]).explain('executionStats')
        expect(stats.executionStats.totalDocsExamined).to.equal(1)
    })
})