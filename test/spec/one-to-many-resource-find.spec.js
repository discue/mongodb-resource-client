import { expect as expect$0 } from "chai";
import { randomUUID as uuid } from "crypto";
import * as mongodb from "mongodb";
import Storage from "../../lib/one-to-many-resource-storage.js";
import SimpleStorage from "../../lib/simple-resource-storage.js";
import retry from "../retry.js";

const { MongoClient, Timestamp } = mongodb;
const expect = { expect: expect$0 }.expect;
describe('OneToManyResource', () => {
    /**
     * @type {import('mongodb').MongoClient}
     */
    let mongoDbClient;
    let listenerIds;
    let firstQueueId;
    let secondQueueId;
    let thirdQueueId;
    let firstClientId;
    let secondClientId;
    let listeners;
    let apiClients;
    before(() => {
        mongoDbClient = new MongoClient('mongodb://127.0.0.1:27021/?replicaSet=rs0');
        listeners = new Storage({ client: mongoDbClient, collectionName: 'queues', resourceName: 'listeners', resourcePath: 'api_clients/queues', enableTwoWayReferences: true });
        apiClients = new SimpleStorage({ client: mongoDbClient, collectionName: 'api_clients' });
    });
    beforeEach(async () => {
        listenerIds = [uuid(), uuid(), uuid(), uuid()];
        const listenersCollection = mongoDbClient.db().collection('listeners');
        await listenersCollection.insertOne({
            _meta_data: {
                created_at: Timestamp.fromNumber(Date.now())
            },
            id: listenerIds.at(0),
            name: 'first'
        });
        await listenersCollection.insertOne({
            _meta_data: {
                created_at: Timestamp.fromNumber(Date.now())
            },
            id: listenerIds.at(1),
            name: 'second'
        });
        await listenersCollection.insertOne({
            _meta_data: {
                created_at: Timestamp.fromNumber(Date.now())
            },
            id: listenerIds.at(2),
            name: 'third'
        });
        await listenersCollection.insertOne({
            _meta_data: {
                created_at: Timestamp.fromNumber(Date.now())
            },
            id: listenerIds.at(3),
            name: 'fourth'
        });
        const queuesCollection = mongoDbClient.db().collection('queues');
        await queuesCollection.insertOne({
            id: firstQueueId = uuid(),
            listeners: [
                listenerIds.at(0),
                listenerIds.at(1)
            ]
        });
        await queuesCollection.insertOne({
            id: secondQueueId = uuid(),
            listeners: [
                listenerIds.at(2)
            ]
        });
        await queuesCollection.insertOne({
            id: thirdQueueId = uuid(),
            listeners: [
                listenerIds.at(3)
            ]
        });
        const clientsCollection = mongoDbClient.db().collection('api_clients');
        await clientsCollection.insertOne({
            id: firstClientId = uuid(),
            queues: [
                firstQueueId,
                secondQueueId
            ]
        });
        await clientsCollection.insertOne({
            id: secondClientId = uuid(),
            queues: [
                thirdQueueId
            ]
        });
    });
    beforeEach(async () => {
        return retry(async () => {
            const indexes = await mongoDbClient.db('test').collection('listeners').listIndexes().toArray();
            expect(indexes).to.have.length(2);
        });
    });
    after(() => {
        return listeners.close();
    });
    after(() => {
        return apiClients.close();
    });
    describe('.find', () => {
        it('returns a resource matched by name', async () => {
            const listener = await listeners.find([firstClientId, firstQueueId], { match: { name: 'first' } });
            expect(listener.id).to.equal(listenerIds.at(0));
        });
        it('returns null if no resource found', async () => {
            const listener = await listeners.find([firstClientId, firstQueueId], { match: { name: 'first123' } });
            expect(listener).to.be.null;
        });
        it('does not return a resource if its not referenced by root', async () => {
            const listener = await listeners.find([secondClientId, firstQueueId], { match: { name: 'first' } });
            expect(listener).to.be.null;
        });
        it('does not return a resource if its not referenced by root', async () => {
            const listener = await listeners.find([firstClientId, secondQueueId], { match: { name: 'first' } });
            expect(listener).to.be.null;
        });
    });
});
