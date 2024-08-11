import { expect } from "chai";
import { randomUUID as uuid } from "crypto";
import * as mongodb from "mongodb";
import Storage from "../../lib/one-to-few-ref-storage.js";
import retry from "../retry.js";

const { MongoClient } = mongodb;

describe('OneToFewRefStorage', () => {
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
                1234,
                4567,
                9999
            ]
        });
        await collection.insertOne({
            id: insertedDocumentId,
            queues: [
                123,
                456,
                999
            ].reverse()
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
        it('returns true if a ref exists', async () => {
            const exists = await storage.exists([insertedDocumentId, 456]);
            expect(exists).to.be.true;
        });
        it('returns false if a does not exists', async () => {
            const exists = await storage.exists([insertedDocumentId, 12314]);
            expect(exists).to.be.false;
        });
    });
    describe('.getAll', () => {
        it('returns all existing refs', async () => {
            const docs = await storage.getAll([insertedDocumentId]);
            expect(docs).to.have.length(3);
            expect(docs).to.deep.equal([999, 456, 123]);
            expect(docs._id).to.be.undefined;
        });
        it('returns null if document does not exist', async () => {
            const docs = await storage.getAll([123]);
            expect(docs).to.have.length(0);
        });
    });
    describe('.create', () => {
        it('adds a new ref', async () => {
            const newId = uuid();
            await storage.create([insertedDocumentId], newId);
            const docs = await storage.getAll([insertedDocumentId]);
            expect(docs).to.have.length(4);
            expect(docs).to.deep.equal([999, 456, 123, newId]);
        });
        it('ensures ids are unique', async () => {
            const newId = uuid();
            await storage.create([insertedDocumentId], newId);
            await storage.create([insertedDocumentId], newId);
            const docs = await storage.getAll([insertedDocumentId]);
            expect(docs).to.have.length(4);
            expect(docs).to.deep.equal([999, 456, 123, newId]);
        });
        it('returns the document id', async () => {
            const newId = uuid();
            const storedId = await storage.create([insertedDocumentId], newId);
            expect(storedId).to.equal(newId);
        });
    });
    describe('.findReferences', () => {
        it('finds documents with references', async () => {
            const docs = await storage.findReferences([insertedDocumentId], [123]);
            expect(docs).to.have.length(1);
        });
        it('returns an empty set if target does not contain ref', async () => {
            const docs = await storage.findReferences([insertedDocumentId], [1234]);
            expect(docs).to.have.length(0);
        });
        it('returns the document id', async () => {
            const newId = uuid();
            const storedId = await storage.create([insertedDocumentId], newId);
            expect(storedId).to.equal(newId);
        });
    });
    describe('.delete', () => {
        it('deletes a document', async () => {
            await storage.delete([insertedDocumentId, 999]);
            const docs = await storage.getAll([insertedDocumentId]);
            expect(docs).to.have.length(2);
            expect(docs).to.deep.equal([456, 123]);
        });
        it('throws if document does not exist', async () => {
            return new Promise((resolve, reject) => {
                storage.delete([insertedDocumentId, 911]).then(reject, resolve);
            });
        });
    });
});
