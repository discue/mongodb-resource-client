'use strict'

const { MongoClient, Timestamp } = require('mongodb')
const Storage = require('../../lib/one-to-many-resource-storage.js')
const expect = require('chai').expect
const { randomUUID: uuid } = require('crypto')

describe('OnToManyResourceStorage', () => {
    /**
     * @type {import('mongodb').MongoClient}
     */
    let mongoDbClient
    let listenerIds
    let resourceId
    let unrelatedResourceId
    let storage

    before(() => {
        mongoDbClient = new MongoClient('mongodb://127.0.0.1:27021')
        storage = new Storage({ client: mongoDbClient, collectionName: 'queues', resourceName: 'listeners', enableTwoWayReferences: true })
    })

    beforeEach(async () => {
        listenerIds = [uuid(), uuid(), uuid()]
        const listenersCollection = mongoDbClient.db().collection('listeners')
        await listenersCollection.insertOne({
            _meta_data: {
                created_at: Timestamp.fromNumber(Date.now())
            },
            id: listenerIds.at(0),
            name: 'first'
        })
        await listenersCollection.insertOne({
            _meta_data: {
                created_at: Timestamp.fromNumber(Date.now())
            },
            id: listenerIds.at(1),
            name: 'second'
        })
        await listenersCollection.insertOne({
            _meta_data: {
                created_at: Timestamp.fromNumber(Date.now())
            },
            id: listenerIds.at(2),
            name: 'third'
        })

        const queuesCollection = mongoDbClient.db().collection('queues')
        await queuesCollection.insertOne({
            id: resourceId = uuid(),
            listeners: [
                listenerIds.at(0),
                listenerIds.at(1)
            ]
        })

        // await queuesCollection.insertOne({
        //     id: unrelatedResourceId = uuid(),
        //     listeners: [
        //         listenerIds.at(2)
        //     ]
        // })

        return new Promise((resolve) => setTimeout(resolve, 50))
    })

    after(() => {
        return mongoDbClient.close()
    })

    after(() => {
        return storage.close()
    })

    describe('.exists', () => {
        it('returns true if a document exists', async () => {
            const exists = await storage.exists([resourceId, listenerIds.at(0)])
            expect(exists).to.be.true
        })
        it('returns true only if document is being referenced', async () => {
            const exists = await storage.exists([resourceId, listenerIds.at(2)])
            expect(exists).to.be.false
        })
        it('returns false if host has reference', async () => {
            const exists = await storage.exists([unrelatedResourceId, listenerIds.at(0)])
            expect(exists).to.be.false
        })
        it('returns false if a document does not exists', async () => {
            const exists = await storage.exists([resourceId, 111])
            expect(exists).to.be.false
        })
    })

    describe('.get', () => {
        it('throws if not enough resource ids are provided', () => {
            return new Promise((resolve, reject) => {
                storage.get([resourceId]).then(reject, resolve)
            })
        })
        it('throws if too many resource ids are provided', () => {
            return new Promise((resolve, reject) => {
                storage.get([resourceId, resourceId, resourceId]).then(reject, resolve)
            })
        })
        it('returns an existing document', async () => {
            const doc = await storage.get([resourceId, listenerIds.at(0)])
            expect(doc.name).to.equal('first')
        })
        it('returns null if an existing document is not referenced by host document', async () => {
            const doc = await storage.get([unrelatedResourceId, listenerIds.at(0)])
            expect(doc).to.be.null
        })
        it('does only return projected fields', async () => {
            const doc = await storage.get([resourceId, listenerIds.at(0)], { projection: { id: 1 } })
            expect(doc.id).not.to.be.undefined
            expect(doc.id).not.to.be.undefined
            expect(doc.name).to.be.undefined
        })
        it('ignores explicitly not projected fields', async () => {
            const doc = await storage.get([resourceId, listenerIds.at(0)], { projection: { name: 0 } })
            expect(doc.id).not.to.be.undefined
            expect(doc.id).not.to.be.undefined
            expect(doc.name).to.be.undefined
        })
        it('does not return _id field', async () => {
            const doc = await storage.get([resourceId, listenerIds.at(0)])
            expect(doc._id).to.be.undefined
        })
        it('does not return _meta_data by default', async () => {
            const doc = await storage.get([resourceId, listenerIds.at(0)])
            expect(doc._meta_data).to.be.undefined
        })
        it('returns _meta_data', async () => {
            const doc = await storage.get([resourceId, listenerIds.at(0)], { withMetadata: true })
            expect(doc._meta_data).not.to.be.undefined
        })
        it('returns another document', async () => {
            const doc = await storage.get([resourceId, listenerIds.at(1)])
            expect(doc.name).to.equal('second')
        })
        it('returns null if document does not exists', async () => {
            const doc = await storage.get([resourceId, 111])
            expect(doc).to.be.null
        })
        it('does not throw if doc does not exists', async () => {
            return new Promise((resolve, reject) => {
                storage.get(['abc', '123']).then(resolve, reject)
            })
        })
    })

    describe('.getAll', () => {
        after(() => {
            storage = new Storage({ client: mongoDbClient, collectionName: 'queues', resourceName: 'listeners', enableTwoWayReferences: true })
        })
        it('throws if too many resource ids are provided', () => {
            return new Promise((resolve, reject) => {
                storage.getAll([resourceId, resourceId]).then(reject, resolve)
            })
        })
        it('returns an existing document', async () => {
            const docs = await storage.getAll([resourceId])
            expect(docs).to.have.length(2)

            docs.forEach(doc => {
                expect(doc.name).not.to.be.undefined
                expect(doc.name).not.to.be.null
            })
        })
        it('returns document path if requested', async () => {
            const docs = await storage.getAll([resourceId], { addDocumentPath: true })
            expect(docs).to.have.length(2)

            docs.forEach((doc) => {
                const { $path: path } = doc
                const split = path.split('/')
                expect(split.at(1)).to.equal('queues')
                expect(split.at(2)).to.equal(resourceId)
                expect(split.at(3)).to.equal('listeners')
                expect(listenerIds).to.include(split.at(4))
            })
        })
        it('hides document path elements if requested', async () => {
            storage._hiddenResourcePath = '/queues'
            const docs = await storage.getAll([resourceId], { addDocumentPath: true })
            expect(docs).to.have.length(2)

            docs.forEach((doc) => {
                const { $path: path } = doc
                const split = path.split('/')
                expect(split.at(1)).to.equal('listeners')
                expect(listenerIds).to.include(split.at(2))
            })
        })
        it('returns an empty list if no resource was found because of an unknown id', async () => {
            const docs = await storage.getAll([12])
            expect(docs).to.have.length(0)
        })
        it('returns only projected fields', async () => {
            const docs = await storage.getAll([resourceId], { projection: { id: 1 } })
            expect(docs).to.have.length(2)

            docs.forEach(doc => {
                expect(doc.id).not.to.be.undefined
                expect(doc.id).not.to.be.null
                expect(doc.name).to.be.undefined
            })
        })
        it('ignores explicitly not projected fields', async () => {
            const docs = await storage.getAll([resourceId], { projection: { name: 0 } })
            expect(docs).to.have.length(2)

            docs.forEach(doc => {
                expect(doc.id).not.to.be.undefined
                expect(doc.id).not.to.be.null
                expect(doc.name).to.be.undefined
            })
        })
        it('does not return _meta_data by default', async () => {
            const docs = await storage.getAll([resourceId])
            expect(docs).to.have.length(2)

            docs.forEach(doc => {
                expect(doc._meta_data).to.be.undefined
            })
        })
        it('returns meta data', async () => {
            const docs = await storage.getAll([resourceId], { withMetadata: true })
            expect(docs).to.have.length(2)

            docs.forEach(doc => {
                expect(doc._meta_data).not.to.be.undefined
            })
        })
        it('does not return _id field', async () => {
            const docs = await storage.getAll([resourceId])
            docs.forEach((doc) => {
                expect(doc._id).to.be.undefined
            })
        })
        it('returns an empty list if collection is empty', async () => {
            const collection = await storage._getCollection()
            await collection.drop()

            const docs = await storage.getAll([resourceId])
            expect(docs).to.be.empty
        })
    })

    describe('.create', () => {
        it('throws if not enough resource ids are provided', () => {
            return new Promise((resolve, reject) => {
                storage.get([resourceId]).then(reject, resolve)
            })
        })
        it('throws too many resource ids are provided', () => {
            return new Promise((resolve, reject) => {
                storage.get([resourceId, resourceId, resourceId]).then(reject, resolve)
            })
        })
        it('creates a new document', async () => {
            const newId = uuid()
            await storage.create([resourceId, newId], { my: 'ghost' })

            const docs = await storage.getAll([resourceId])
            expect(docs).to.have.length(3)

            const doc = await storage.get([resourceId, newId])
            expect(doc.my).to.equal('ghost')
        })
        it('does not create a new document if parent does not exist', async () => {
            const newId = uuid()
            try {
                await storage.create(['123', newId], { my: 'ghost' })
                throw new Error('Must throw because parent must exist')
            } catch (e) {
                expect(e.message).to.contain('not able to insert')
            }
        })
        it('ensures id is unique', async () => {
            const id = uuid()
            await storage.create([resourceId, id], { my: 'ghost' })
            return new Promise((resolve, reject) => {
                storage.create([resourceId, id], { my: 'ghost' }).then(reject, resolve)
            })
        })
        it('returns the new documentId', async () => {
            const newId = uuid()
            const storedId = await storage.create([resourceId, newId], { my: 'ghost' })
            expect(storedId).to.equal(newId)
        })
        it('also adds a reference to entity if requested', async () => {
            const newId = uuid()
            await storage.create([resourceId, newId], { my: 'ghost' })

            const doc = await storage.get([resourceId, newId])
            expect(doc.queues_ref).to.equal(resourceId)
        })
    })

    describe('.update', () => {
        it('throws if not enough resource ids are provided', () => {
            return new Promise((resolve, reject) => {
                storage.update([resourceId]).then(reject, resolve)
            })
        })
        it('throws if too many resource ids are provided', () => {
            return new Promise((resolve, reject) => {
                storage.update([resourceId, resourceId, resourceId]).then(reject, resolve)
            })
        })
        it('updates a document', async () => {
            await storage.update([resourceId, listenerIds.at(1)], { 'name': 'peter' })
            const doc = await storage.get([resourceId, listenerIds.at(1)])
            expect(doc.name).to.equal('peter')
        })
        it('sets a new updated_at timestamp', async () => {
            await storage.update([resourceId, listenerIds.at(1)], { 'name': 'peter' })
            const doc = await storage.get([resourceId, listenerIds.at(1)], { withMetadata: true })
            expect(doc._meta_data.updated_at.toInt()).to.be.greaterThan(doc._meta_data.created_at.toInt())
        })
        it('throws if document does not exist', async () => {
            return new Promise((resolve, reject) => {
                storage.update([resourceId, 911]).then(reject, resolve)
            })
        })
    })

    describe('.delete', () => {
        it('throws if not enough resource ids are provided', () => {
            return new Promise((resolve, reject) => {
                storage.delete([resourceId]).then(reject, resolve)
            })
        })
        it('throws if too many resource ids are provided', () => {
            return new Promise((resolve, reject) => {
                storage.delete([resourceId, resourceId, resourceId]).then(reject, resolve)
            })
        })
        it('deletes a document', async () => {
            await storage.delete([resourceId, listenerIds.at(1)])
            const doc = await storage.get([resourceId, listenerIds.at(1)])
            expect(doc).to.be.null

            const docs = await storage.getAll([resourceId])
            expect(docs).to.have.length(1)
        })
        it('also deletes the document reference', async () => {
            // await new Promise((resolve) => setTimeout(resolve, 30_000))
            await storage.delete([resourceId, listenerIds.at(1)])
            const queuesCollection = mongoDbClient.db().collection('queues')
            const { listeners } = await queuesCollection.findOne({
                id: resourceId,
            })
            expect(listeners).to.have.length(1)
            expect(listeners).to.deep.equal(listenerIds.slice(0, 1))
        })
        it('throws if document does not exist', async () => {
            return new Promise((resolve, reject) => {
                storage.delete([resourceId, 911]).then(reject, resolve)
            })
        })
    })
})