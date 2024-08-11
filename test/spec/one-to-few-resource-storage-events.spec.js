import { expect as expect$0 } from "chai";
import { randomUUID as uuid } from "crypto";
import EventEmitter from "events";
import * as mongodb from "mongodb";
import Storage from "../../lib/one-to-few-resource-storage.js";
import retry from "../retry.js";

const { MongoClient, Timestamp } = mongodb;
const expect = { expect: expect$0 }.expect;
describe('OneToFewResourceStorage Events', () => {
    const eventEmitter = new EventEmitter();
    /**
     * @type {import('mongodb').MongoClient}
     */
    let mongoDbClient;
    let insertedDocumentId;
    let testDocOfChoice;
    let storage;
    before(() => {
        mongoDbClient = new MongoClient('mongodb://127.0.0.1:27021/?replicaSet=rs0');
        storage = new Storage({ client: mongoDbClient, collectionName: 'api_clients', resourceName: 'queues', eventEmitter });
    });
    beforeEach(async () => {
        insertedDocumentId = uuid();
        const collection = mongoDbClient.db().collection('api_clients');
        await collection.insertOne({
            id: uuid(),
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
        });
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
        });
    });
    beforeEach(async () => {
        const collection = mongoDbClient.db().collection('unrelated_collection');
        await collection.insertOne({
            id: uuid(),
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
        });
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
        });
    });
    beforeEach(async () => {
        return retry(async () => {
            const indexes = await mongoDbClient.db('test').collection('api_clients').listIndexes().toArray();
            expect(indexes).to.have.length(2);
        });
    });
    after(() => {
        return storage.close();
    });
    describe('.create', () => {
        it('creates a create event', async () => {
            const newId = uuid();
            return new Promise((resolve, reject) => {
                eventEmitter.once(`${storage.usageEventPrefix}.create`, (event) => {
                    expect(event.resourceIds).to.deep.equal([insertedDocumentId, newId]);
                    expect(event.collectionName).to.equal('queues');
                    expect(event.error).to.be.false;
                    expect(event.before).to.be.undefined;
                    expect(event.after).to.deep.equal({ my: 'ghost' });
                    resolve();
                });
                storage.create([insertedDocumentId, newId], { my: 'ghost' }).catch(reject);
            });
        });
    });
    describe('.update', () => {
        it('creates an update event', async () => {
            return new Promise((resolve, reject) => {
                eventEmitter.once(`${storage.usageEventPrefix}.update`, (event) => {
                    expect(event.resourceIds).to.deep.equal([insertedDocumentId, 999]);
                    expect(event.collectionName).to.equal('queues');
                    expect(event.error).to.be.false;
                    expect(event.before.id).to.equal(testDocOfChoice.id);
                    expect(event.before.name).to.equal(testDocOfChoice.name);
                    expect(event.after.id).to.equal(testDocOfChoice.id);
                    expect(event.after.name).to.equal('peter');
                    resolve();
                });
                storage.update([insertedDocumentId, 999], { 'queues.name': 'peter' }).catch(reject);
            });
        });
    });
    describe('.delete', () => {
        it('creates a delete event', async () => {
            return new Promise((resolve, reject) => {
                eventEmitter.once(`${storage.usageEventPrefix}.delete`, (event) => {
                    expect(event.resourceIds).to.deep.equal([insertedDocumentId, 999]);
                    expect(event.collectionName).to.equal('queues');
                    expect(event.error).to.be.false;
                    expect(event.before.id).to.equal(testDocOfChoice.id);
                    expect(event.before.name).to.equal(testDocOfChoice.name);
                    expect(event.after).to.be.undefined;
                    resolve();
                });
                storage.delete([insertedDocumentId, 999], { 'queues.name': 'peter' }).catch(reject);
            });
        });
    });
});
