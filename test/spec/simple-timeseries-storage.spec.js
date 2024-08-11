import * as mongodb from "mongodb";
import Storage from "../../lib/simple-timeseries-storage.js";
import { LESS_THAN, GREATER_THAN } from "../../lib/aggregations.js";
import { expect as expect$0 } from "chai";
'use strict';
const { MongoClient, Timestamp } = mongodb;
const expect = { expect: expect$0 }.expect;
describe('SimpleTimeseriesStorage', () => {
    let storage;
    let collection;
    /**
     * @type {import('mongodb').MongoClient}
     */
    let mongoDbClient;
    let insertedDocumentId;
    before(() => {
        mongoDbClient = new MongoClient('mongodb://127.0.0.1:27021/?replicaSet=rs0');
    });
    beforeEach(() => {
        storage = new Storage({ client: mongoDbClient, collectionName: 'events', databaseName: 'test' });
        collection = mongoDbClient.db('test').collection('events');
    });
    beforeEach(() => {
        return new Promise((resolve) => setTimeout(resolve, 500));
    });
    afterEach(async () => {
        try {
            await collection.deleteMany({});
        }
        catch (e) {
            //
        }
    });
    after(() => {
        return storage.close();
    });
    describe('.create', () => {
        it('adds a new timeseries item', async () => {
            await storage.create({ metadata: {}, value: 1 });
            const items = await collection.find().toArray();
            expect(items).to.have.length(1);
        });
        it('adds the timestamp field if missing', async () => {
            await collection.deleteMany({});
            await storage.create({ metadata: {}, value: 12 });
            await storage.create({ metadata: {}, value: 12 });
            const items = await collection.find().toArray();
            expect(items).to.have.length(2);
            const first = items.at(0);
            expect(first.timestamp).to.be.a('date');
        });
    });
    describe('.find', () => {
        it('executes an aggregation pipeline and returns an empty result', async () => {
            const items = await storage.find([LESS_THAN('timestamp', 1)]);
            expect(items).to.have.length(0);
        });
        it('executes an aggregation pipeline and returns a result', async () => {
            await storage.create({ metadata: {}, value: 12 });
            const items = await storage.find([GREATER_THAN('timestamp', new Date(2010))]);
            expect(items).to.have.length(1);
        });
    });
});
