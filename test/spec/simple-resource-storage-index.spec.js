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
        mongoDbClient = new MongoClient('mongodb://127.0.0.1:27021/?replicaSet=rs0')
    })

    beforeEach(async () => {
        storage = new Storage({ client: mongoDbClient, databaseName: 'test', collectionName: 'users3', indexes: [{ age: 1 }, { key: { name: 1 } }, { age: 1, name: 1 }] })

        const collection = mongoDbClient.db('test').collection('users3')
        const firstId = uuid()
        ids.push(firstId)

        await collection.insertOne({
            id: firstId,
            age: 22,
            name: 'Peter'
        })
        await collection.insertOne({
            id: uuid(),
            age: 44,
            name: 'Peter'
        })
        await collection.insertOne({
            id: uuid(),
            age: 32,
            name: 'Pan'
        })
        await collection.insertOne({
            id: uuid(),
            age: 32,
            name: 'Mike'
        })
        await collection.insertOne({
            id: uuid(),
            age: 42,
            name: 'Ksenia'
        })

        return new Promise((resolve) => setTimeout(resolve, 250))
    })

    afterEach(() => {
        return mongoDbClient.db('test').collection('users3').drop()
    })

    after(() => {
        return mongoDbClient.close()
    })

    after(() => {
        return storage.close()
    })

    it('queries by id using an index', async () => {
        const stats = await mongoDbClient.db('test').collection('users3').find({ id: ids.at(0) }).explain('executionStats')
        expect(stats.executionStats.totalDocsExamined).to.equal(1)
    })

    it('queries by other fields using a custom single field index', async () => {
        const stats = await mongoDbClient.db('test').collection('users3').find({ age: 42 }).explain('executionStats')
        expect(stats.executionStats.totalDocsExamined).to.equal(1)
    })

    it('queries by other fields using a custom index', async () => {
        const stats = await mongoDbClient.db('test').collection('users3').find({ age: 32, name: 'Mike' }).explain('executionStats')
        expect(stats.executionStats.totalDocsExamined).to.equal(1)
    })

    it('queries by other fields using a custom index', async () => {
        const stats = await mongoDbClient.db('test').collection('users3').aggregate([
            EQUALS('age', 32),
            EQUALS('name', 'Mike')
        ]).explain('executionStats')
        expect(stats.executionStats.totalDocsExamined).to.equal(1)
    })
})