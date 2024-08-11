import { expect as expect$0 } from "chai";
import { randomUUID as uuid } from "crypto";
import * as mongodb from "mongodb";
import Storage from "../../lib/one-to-few-resource-storage.js";
import retry from "../retry.js";

const { MongoClient, Timestamp } = mongodb;
const expect = { expect: expect$0 }.expect;
describe('OneToFewResourceStorage', () => {
    /**
     * @type {import('mongodb').MongoClient}
     */
    let mongoDbClient;
    let insertedDocumentId;
    let storage;
    before(() => {
        mongoDbClient = new MongoClient('mongodb://127.0.0.1:27021/?replicaSet=rs0');
        storage = new Storage({ client: mongoDbClient, collectionName: 'api_clients', resourceName: 'queues' });
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
    describe('.exists', () => {
        it('returns true if a document exists', async () => {
            const exists = await storage.exists([insertedDocumentId, 999]);
            expect(exists).to.be.true;
        });
        it('returns false if a document does not exists', async () => {
            const exists = await storage.exists([insertedDocumentId, 111]);
            expect(exists).to.be.false;
        });
    });
    describe('.get', () => {
        it('returns an existing document', async () => {
            const doc = await storage.get([insertedDocumentId, 999]);
            expect(doc.name).to.equal('3');
        });
        it('returns only projected fields', async () => {
            const doc = await storage.get([insertedDocumentId, 999], { projection: { id: 1 } });
            expect(doc.id).not.to.be.undefined;
            expect(doc.id).not.to.be.null;
            expect(doc.name).to.be.undefined;
        });
        it('ignores explicitly not projected fields', async () => {
            const doc = await storage.get([insertedDocumentId, 999], { projection: { name: 0 } });
            expect(doc.id).not.to.be.undefined;
            expect(doc.id).not.to.be.null;
            expect(doc.name).to.be.undefined;
        });
        it('does not return mongodb _id field', async () => {
            const doc = await storage.get([insertedDocumentId, 999]);
            expect(doc._id).to.be.undefined;
        });
        it('does not return _meta_data by default', async () => {
            const doc = await storage.get([insertedDocumentId, 999]);
            expect(doc._meta_data).to.be.undefined;
        });
        it('returns _meta_data', async () => {
            const doc = await storage.get([insertedDocumentId, 999], { withMetadata: true });
            expect(doc._meta_data).not.to.be.undefined;
        });
        it('returns null if document does not exists', async () => {
            const doc = await storage.get([insertedDocumentId, 111]);
            expect(doc).to.be.null;
        });
        it('does not throw if doc does not exists', async () => {
            return new Promise((resolve, reject) => {
                storage.get('abc').then(resolve, reject);
            });
        });
    });
    describe('.getAll', () => {
        after(() => {
            storage = new Storage({ client: mongoDbClient, collectionName: 'api_clients', resourceName: 'queues' });
        });
        it('returns an existing document', async () => {
            const docs = await storage.getAll([insertedDocumentId]);
            expect(docs).to.have.length(3);
            docs.forEach(doc => {
                expect(doc.name).not.to.be.undefined;
                expect(doc.name).not.to.be.null;
            });
        });
        it('returns only projected fields', async () => {
            const docs = await storage.getAll([insertedDocumentId], { projection: { id: 1 } });
            expect(docs).to.have.length(3);
            docs.forEach(doc => {
                expect(doc.id).not.to.be.undefined;
                expect(doc.id).not.to.be.undefined;
                expect(doc.name).to.be.undefined;
            });
        });
        it('ignores explicitly not projected fields', async () => {
            const docs = await storage.getAll([insertedDocumentId], { projection: { name: 0 } });
            expect(docs).to.have.length(3);
            docs.forEach(doc => {
                expect(doc.id).not.to.be.undefined;
                expect(doc.id).not.to.be.undefined;
                expect(doc.name).to.be.undefined;
            });
        });
        it('does not return _meta_data by default', async () => {
            const docs = await storage.getAll([insertedDocumentId]);
            expect(docs).to.have.length(3);
            docs.forEach(doc => {
                expect(doc.name).not.to.be.undefined;
                expect(doc.name).not.to.be.null;
                expect(doc._meta_data).to.be.undefined;
            });
        });
        it('returns _meta_data', async () => {
            const docs = await storage.getAll([insertedDocumentId], { withMetadata: true });
            expect(docs).to.have.length(3);
            docs.forEach(doc => {
                expect(doc.name).not.to.be.undefined;
                expect(doc.name).not.to.be.null;
                expect(doc._meta_data).not.to.be.undefined;
            });
        });
        it('does not return _id field', async () => {
            const docs = await storage.getAll([insertedDocumentId]);
            docs.forEach((doc) => {
                expect(doc._id).to.be.undefined;
            });
        });
        it('returns an empty list if collection is empty', async () => {
            const collection = await storage._getCollection();
            await collection.deleteMany({});
            const docs = await storage.getAll([insertedDocumentId]);
            expect(docs).to.be.empty;
        });
    });
    describe('.create', () => {
        it('creates a new document', async () => {
            const newId = uuid();
            await storage.create([insertedDocumentId, newId], { my: 'ghost' });
            const docs = await storage.getAll([insertedDocumentId]);
            expect(docs).to.have.length(4);
            const doc = await storage.get([insertedDocumentId, newId]);
            expect(doc.my).to.equal('ghost');
        });
        it('ensures id is unique', async () => {
            const id = uuid();
            await storage.create([insertedDocumentId, id], { my: 'ghost' });
            return new Promise((resolve, reject) => {
                storage.create([insertedDocumentId, id], { my: 'ghost' }).then(reject, resolve);
            });
        });
        it('returns the documentId', async () => {
            const newId = uuid();
            const storedId = await storage.create([insertedDocumentId, newId], { my: 'ghost' });
            expect(storedId).to.equal(newId);
        });
    });
    describe('.update', () => {
        it('updates a document', async () => {
            await storage.update([insertedDocumentId, 999], { 'queues.name': 'peter' });
            const doc = await storage.get([insertedDocumentId, 999]);
            expect(doc.name).to.equal('peter');
        });
        it('sets a new updated_at timestamp', async () => {
            await storage.update([insertedDocumentId, 999], { 'queues.name': 'peter' });
            const doc = await storage.get([insertedDocumentId, 999], { withMetadata: true });
            expect(doc._meta_data.updated_at.toInt()).to.be.greaterThan(doc._meta_data.created_at.toInt());
        });
        it('throws if document does not exist', async () => {
            return new Promise((resolve, reject) => {
                storage.update([insertedDocumentId, 911]).then(reject, resolve);
            });
        });
    });
    describe('.delete', () => {
        it('deletes a document', async () => {
            await storage.delete([insertedDocumentId, 999]);
            const doc = await storage.get([insertedDocumentId, 999]);
            expect(doc).to.be.null;
        });
        it('throws if document does not exist', async () => {
            return new Promise((resolve, reject) => {
                storage.delete([insertedDocumentId, 911]).then(reject, resolve);
            });
        });
    });
});
