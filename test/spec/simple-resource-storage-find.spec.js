import { expect } from 'chai'
import { randomUUID as uuid } from 'crypto'
import * as mongodb from 'mongodb'
import { COUNT, EQUALS, EQUALS_ANY_OF, GREATER_THAN, GREATER_THAN_OR_EQUAL, LESS_THAN, LESS_THAN_OR_EQUAL, LIMIT, SORT_BY_ASC, SORT_BY_DESC } from '../../lib/aggregations.js'
import Storage from '../../lib/simple-resource-storage.js'
import retry from '../retry.js'

const { MongoClient } = mongodb

describe('SimpleResourceStorage Find', () => {
    /**
     * @type {import('mongodb').MongoClient}
     */
    let mongoDbClient
    let storage
    before(() => {
        mongoDbClient = new MongoClient('mongodb://127.0.0.1:27021/?replicaSet=rs0')
    })
    beforeEach(() => {
        storage = new Storage({ client: mongoDbClient, collectionName: 'users2', indexes: [{ name: 1 }] })
    })
    beforeEach(async () => {
        const collection = mongoDbClient.db().collection('users2')
        await collection.insertOne({
            id: uuid(),
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
            age: 42,
            name: 'Ksenia'
        })
    })
    beforeEach(async () => {
        return retry(async () => {
            const indexes = await mongoDbClient.db('test').collection('users2').listIndexes().toArray()
            expect(indexes).to.have.length(3)
        })
    })
    afterEach(() => {
        return mongoDbClient
            .db()
            .collection('users2')
            .deleteMany({})
    })
    after(() => {
        return storage.close()
    })
    describe('.find', () => {
        it('returns all documents if no aggregation was given', async () => {
            const docs = await storage.find()
            expect(docs).to.have.length(4)
        })
        it('returns only docs with matching name', async () => {
            const docs = await storage.find([
                EQUALS('name', 'Ksenia')
            ])
            expect(docs).to.have.length(1)
            expect(docs.at(0).age).to.equal(42)
        })
        it('returns only docs with matching name', async () => {
            const docs = await storage.find([
                EQUALS_ANY_OF('name', ['Pan', 'Ksenia']),
                SORT_BY_DESC('name')
            ])
            expect(docs).to.have.length(2)
            expect(docs.at(0).age).to.equal(32)
            expect(docs.at(1).age).to.equal(42)
        })
        it('returns only docs age less than 34', async () => {
            const docs = await storage.find([
                LESS_THAN('age', 35),
                SORT_BY_DESC('name')
            ])
            expect(docs).to.have.length(2)
            expect(docs.at(0).age).to.equal(22)
            expect(docs.at(1).age).to.equal(32)
        })
        it('returns only docs age less than 32 or equal', async () => {
            const docs = await storage.find([
                LESS_THAN_OR_EQUAL('age', 32),
                SORT_BY_DESC('name')
            ])
            expect(docs).to.have.length(2)
            expect(docs.at(0).age).to.equal(22)
            expect(docs.at(1).age).to.equal(32)
        })
        it('returns only docs age greater than 34', async () => {
            const docs = await storage.find([
                GREATER_THAN('age', 34),
                SORT_BY_DESC('name')
            ])
            expect(docs).to.have.length(2)
            expect(docs.at(0).age).to.equal(44)
            expect(docs.at(1).age).to.equal(42)
        })
        it('returns only docs age greater than 32 or equal', async () => {
            const docs = await storage.find([
                GREATER_THAN_OR_EQUAL('age', 32),
                SORT_BY_DESC('name')
            ])
            expect(docs).to.have.length(3)
            expect(docs.at(0).age).to.equal(44)
            expect(docs.at(1).age).to.equal(32)
            expect(docs.at(2).age).to.equal(42)
        })
        it('limits results to 1', async () => {
            const docs = await storage.find([
                LIMIT(1)
            ])
            expect(docs).to.have.length(1)
        })
        it('sorts by age ascending', async () => {
            const docs = await storage.find([
                SORT_BY_ASC('age')
            ])
            expect(docs).to.have.length(4)
            expect(docs.at(0).age).to.equal(22)
            expect(docs.at(1).age).to.equal(32)
            expect(docs.at(2).age).to.equal(42)
            expect(docs.at(3).age).to.equal(44)
        })
        it('sorts by age descending', async () => {
            const docs = await storage.find([
                SORT_BY_DESC('age')
            ])
            expect(docs).to.have.length(4)
            expect(docs.at(3).age).to.equal(22)
            expect(docs.at(2).age).to.equal(32)
            expect(docs.at(1).age).to.equal(42)
            expect(docs.at(0).age).to.equal(44)
        })
        it('counts the number of documents', async () => {
            const docs = await storage.find([
                GREATER_THAN_OR_EQUAL('age', 32),
                SORT_BY_DESC('name'),
                COUNT()
            ])
            expect(docs.at(0).count).to.equal(3)
        })
    })
})
