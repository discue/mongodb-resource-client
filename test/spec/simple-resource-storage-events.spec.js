import { expect } from "chai";
import { randomUUID as uuid } from "crypto";
import * as mongodb from "mongodb";
import Storage from "../../lib/simple-resource-storage.js";
import retry from "../retry.js";

const { MongoClient, Timestamp } = mongodb;

describe('SimpleResourceStorage Events', () => {
    /**
     * @type {import('mongodb').MongoClient}
     */
    let mongoDbClient;
    let insertedDocumentId;
    let storage;
    before(() => {
        mongoDbClient = new MongoClient('mongodb://127.0.0.1:27021/?replicaSet=rs0');
    });
    beforeEach(() => {
        storage = new Storage({ client: mongoDbClient, collectionName: '_subscriptions' });
    });
    beforeEach(async () => {
        insertedDocumentId = uuid();
        const collection = mongoDbClient.db().collection('_subscriptions');
        await collection.insertOne({
            _meta_data: {
                created_at: Timestamp.fromNumber(Date.now())
            },
            id: insertedDocumentId,
            hello: 'world'
        });
        await collection.insertOne({
            _meta_data: {
                created_at: Timestamp.fromNumber(Date.now())
            },
            id: uuid(),
            hello: 'world2'
        });
    });
    beforeEach(async () => {
        return retry(async () => {
            const indexes = await mongoDbClient.db('test').collection('_subscriptions').listIndexes().toArray();
            expect(indexes).to.have.length(2);
        });
    });
    afterEach(async () => {
        try {
            const collection = mongoDbClient.db().collection('_subscriptions');
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
        it('sends a create event', async () => {
            return new Promise((resolve, reject) => {
                const id = uuid();
                storage.on('create', (event) => {
                    expect(event.resourceIds).to.equal(id);
                    expect(event.before).to.be.undefined;
                    expect(event.after.my).to.equal('ghost');
                    resolve();
                })
                storage.create(id, { my: 'ghost' }).catch(reject);
            });
        });
    });
    describe('.updates', () => {
        it('creates an update event', async () => {
            return new Promise((resolve, reject) => {
                storage.on('update', (event) => {
                    expect(event.resourceIds).to.deep.equal([insertedDocumentId]);
                    expect(event.before.hello).to.equal('world');
                    expect(event.after.hello).to.equal('peter');
                    resolve();
                });
                storage.update([insertedDocumentId], { hello: 'peter' }).catch(reject);
            });
        });
    });
    describe('.deletes', () => {
        it('creates a delete event', async () => {
            const resource = await storage.get([insertedDocumentId]);
            return new Promise((resolve, reject) => {
                storage.on('delete', (event) => {
                    expect(event.resourceIds).to.deep.equal([insertedDocumentId]);
                    expect(event.before).to.deep.equal(resource);
                    expect(event.after).to.be.undefined;
                    resolve();
                });
                storage.delete([insertedDocumentId]).catch(reject);
            });
        });
    });
});
