import SpanStatusCode from '@discue/open-telemetry-tracing/status-codes'
import { AS_ROOT, EQUALS, EQUALS_ALL, LOOKUP, PROJECT, UNWIND } from './aggregations.js'
import OneToFewStorage from './one-to-few-ref-storage.js'
import { toArrayAndClose } from './safe-cursor.js'
import Base from './simple-resource-storage.js'

/**
 * @typedef ConstructorOptions
 * @name ConstructorOptions
 * @property {MongoClient} client configured mongo client to use. Can be null if url is set
 * @property {string} [databaseName=null] name of the mongodb database
 * @property {Array.<object>} [indexes=null] indexes to be created on instantiation. Use format {key:1} for single indexes and {key1: 1, key:2} for compound indexes 
 * @property {string} collectionName name of the mongodb collection used to store the resources
 * @property {string} resourceName name of the resource e.g. users, customers, topics, shipments
 * @property {string} [resourcePath=resourceName] slash separated path describing the hierarchy e.g. universities/teachers/subjects/exams.
 * @property {string} [hiddenResourcePath=null] slash separated path describing which path elements should not be returned to callers
 * @property {string} enableTwoWayReferences true if documents should also store references to their parents e.g. student have references to their schools
 * @example
 * import { MongoClient } from 'mongodb'
 * import { OneToManyResourceStorage } from '@discue/mongodb-resource-client'
 * 
 * const client = new MongoClient(url, {
 *   serverApi: { version: '1', strict: true, deprecationErrors: true }, // https://www.mongodb.com/docs/manual/reference/stable-api/
 * })
 * 
 * const oneToManyResourceStorage = new OneToManyResourceStorage({
 *   client,
 *   collectionName: 'api_clients',
 *   resourceName: 'listeners'
 *   enableTwoWayReferences: true
 * })
 */

/**
 * @typedef GetOptions
 * @name GetOptions
 * @property {boolean} withMetadata true if also meta data should be returned
 * @property {boolean} addDocumentPath true if $path propety should be added to documents e.g. `$path=/countries/1/cities/2/companies`
 * @property {object} projection MongoDB projection object e.g. { id: 0, name: 0 }
 */

/**
 * @typedef {import('mongodb').MongoClient} MongoClient
 * @private 
 */

/**
 * Manages relationships between entities in a more decoupled way by keep storing
 * entities in separate collections and using references to establish an relationship
 * between both. This way students can be queried independently of an university,
 * while all studies of a university can still be looked up via the stored reference.
 * 
 * The references between both collections are kept up-to-date. Deleting a document,
 * causes the reference to be deleted in the other entity. Adding a document
 * causes a reference to be updated, too.
 * 
 * <strong>Students collection</strong>
 * ```js
 * {
 *   id: 1828391,
 *   name: 'Miles Morales',
 * },
 * {
 *   id: 4451515,
 *   name: 'Bryan Jenkins',
 * }
 * ```
 *
 * <strong>Universities collection</strong>
 * ```js
 * {
 *   name: 'University Munich',
 *   students: [1828391]
 * }
 * {
 *   name: 'University Stuttgart',
 *   students: [4451515]
 * }
 * ```
 * 
 * @name OneToManyResourceStorage
 * @class
 * @link as described here: https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design
 */

export default class extends Base {
    /**
     * @param {ConstructorOptions} options
     * @public
     */
    constructor(options) {
        const baseOptions = Object.assign({}, options)
        baseOptions.collectionName = options.resourceName
        super(baseOptions)

        const hostOptions = Object.assign({}, options)
        hostOptions.indexes = null
        /** @private */ this._hostStorage = new OneToFewStorage(hostOptions)
        /** @private */ this._enableTwoWayReferences = options.enableTwoWayReferences
        /** @private */ this._resourceName = options.resourceName
        /** @private */ this._referencePath = options.twoWayReferencePath
        /** @private */ this._resourcePath = (options.resourcePath || options.collectionName).split('/').filter(s => s)
        /** @private */ this._parentResource = this._resourcePath.at(-1)
        /** @private */ this._hiddenResourcePath = options.hiddenResourcePath || ''
        /** @private */ this._resourceLevel = this._resourcePath.length
    }

    /**
     * Returns true if a resource with given ids exists.
     *
     * @name exists
     * @param {string | Array.<string>} resourceIds
     * @returns {boolean}
     */
    async exists(resourceIds) {
        return this._runWithActiveSpan('exists-one-to-many-resource-by-id', resourceIds, async () => {
            const resource = await this.get(resourceIds)
            return resource != null
        })
    }

    /**
     * Returns a resource by ids.
     *
     * @name get
     * @param {string | Array.<string>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {object} options
     * @returns {object}
     */
    async get(resourceIds, options) {
        return this._runWithActiveSpan('get-one-to-many-resource-by-id', resourceIds, async (span) => {
            if (!Array.isArray(resourceIds) || !(resourceIds.length == this._resourcePath.length + 1)) {
                const errorMessage = `Given resourceIds ${resourceIds} and resourcePath ${this._resourcePath} dont match lengths. For this operation you need to provide resourceIds with length ${this._resourcePath.length + 1}`
                span.addEvent(errorMessage, {
                    resourceIds,
                    resourcePath: this._resourcePath
                }).setStatus(SpanStatusCode.ERROR)
                throw new Error(errorMessage)
            }
            return this._getResourceWithLookup(resourceIds, options)
        })
    }
    /**
     * @typedef FindOptions
     * @name FindOptions
     * @property {boolean} withMetadata true if also meta data should be returned
     * @property {object} projection MongoDB projection object e.g. { id: 0, name: 0 }
     * @property {object} match MongoDB match object e.g. { id: 123 }
     * @private
     */
    /**
     * Find a resource by via options.match query.
     *
     * @name find
     * @param {string | Array.<string>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {FindOptions} options
     * @returns {object}
     */
    async find(resourceIds, options) {
        return this._runWithActiveSpan('find-one-to-many-resource-by-id', resourceIds, async (span) => {
            if (!Array.isArray(resourceIds) || !(resourceIds.length == this._resourcePath.length)) {
                const errorMessage = `Given resourceIds ${resourceIds} and resourcePath ${this._resourcePath} dont match lengths. For this operations you need to provide a resourceId array with length ${this._resourcePath.length}.`
                span.addEvent(errorMessage, {
                    resourceIds,
                    resourcePath: this._resourcePath
                }).setStatus(SpanStatusCode.ERROR)
                throw new Error(errorMessage)
            }
            return this._getResourceWithLookup(resourceIds, options)
        })
    }
    /**
     * Returns a resource without safety checks and tracing
     *
     * @param {string | Array.<string>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {GetOptions} options
     * @returns {object}
     * @private
     */
    async _getResourceWithLookup(resourceIds, options = {}) {
        const collection = await this._getParentCollection()
        const aggregationStages = this._getNestedLookupStages(resourceIds, options)
        const cursor = collection.aggregate(aggregationStages)
        const result = await toArrayAndClose(cursor)
        return result?.at(0) ?? null
    }
    /**
     *
     * @private
     */
    async _getParentCollection() {
        const parentCollection = this._resourcePath.at(0)
        return this._getCollection(parentCollection)
    }
    /**
     *
     * @param {string | Array.<string>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {GetOptions} options
     * @returns {object}
     * @private
     */
    _getNestedLookupStages(resourceIds, options) {
        const pipeline = []
        for (let i = 0, n = resourceIds.length; i < n; i++) {
            pipeline.push(EQUALS('id', resourceIds.at(i)))
            pipeline.push(PROJECT({ _id: 0, _meta_data: 0 }))
            const childCollection = this._resourcePath.at(i + 1) ?? this._resourceName
            const lookupPipeline = []
            if (i + 1 < resourceIds.length) {
                lookupPipeline.push(EQUALS('id', resourceIds.at(i + 1)))
            }
            else if (options.match) {
                lookupPipeline.push(EQUALS_ALL(options.match))
            }
            pipeline.push(LOOKUP({
                from: childCollection,
                pipeline: lookupPipeline,
                localField: childCollection,
                foreignField: 'id',
                as: childCollection
            }))
            pipeline.push(UNWIND(childCollection))
            pipeline.push(AS_ROOT(childCollection))
            if (childCollection === this._resourceName) {
                break
            }
        }
        if (options.withMetadata) {
            pipeline.push(PROJECT({ _id: 0 }))
        }
        else {
            pipeline.push(PROJECT({ _id: 0, _meta_data: 0 }))
        }
        if (options.projection) {
            pipeline.push(PROJECT(options.projection))
        }
        return pipeline
    }
    /**
     *
     * @param {Array.<string>} resourceIds
     * @private
     */
    _getResourceIdsForHostStorage(resourceIds) {
        return resourceIds.slice(this._resourceLevel - 1)
    }
    /**
     *
     * @name getAll
     * @param {string | Array.<string>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {GetOptions} options
     */
    async getAll(resourceIds, { withMetadata = false, addDocumentPath, projection } = {}) {
        return this._runWithActiveSpan('get-all-one-to-many-resources-by-id', resourceIds, async (span) => {
            if (!Array.isArray(resourceIds) || !(resourceIds.length == this._resourcePath.length)) {
                const errorMessage = `Given resourceIds ${resourceIds} and resourcePath ${this._resourcePath} dont match lengths. For this operations you need to provide a resourceId array with length ${this._resourcePath.length}.`
                span.addEvent(errorMessage, {
                    resourceIds,
                    resourcePath: this._resourcePath
                }).setStatus(SpanStatusCode.ERROR)
                throw new Error(errorMessage)
            }
            const collection = await this._getParentCollection()
            const aggregationStages = this._getNestedLookupStages(resourceIds, { withMetadata, projection })
            const cursor = collection.aggregate(aggregationStages)
            const resources = await toArrayAndClose(cursor)
            if (!resources || resources.length === 0) {
                return []
            }
            if (addDocumentPath) {
                resources.forEach((result) => {
                    const { id } = result
                    // not ideal but right now lets only support one reference per document
                    // refsArray.forEach((refs) => {
                    const path = this._resourcePath.reduce((context, path, index) => {
                        if (!this._hiddenResourcePath.includes(path)) {
                            context.push(path, resourceIds.at(index))
                        }
                        return context
                        // }, [])
                    }, [''])
                    path.push(this._resourceName, id)
                    result.$path = path.join('/')
                })
            }
            return resources
        })
    }
    /**
     * Add a resource to a collection by ids.
     *
     * @name create
     * @param {string | Array.<string>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {object} resource the resource to be stored
     * @returns
     */
    async create(resourceIds, resource) {
        return this._runWithActiveSpan('create-one-to-many-resource-by-id', resourceIds, async (span) => {
            if (!Array.isArray(resourceIds) || !(resourceIds.length == this._resourcePath.length + 1)) {
                const errorMessage = `Given resourceIds ${resourceIds} and resourcePath ${this._resourcePath} dont match lengths. For this operations you need to provide a resourceId array with length ${this._resourcePath.length + 1}.`
                span.addEvent(errorMessage, {
                    resourceIds,
                    resourcePath: this._resourcePath
                }).setStatus(SpanStatusCode.ERROR)
                throw new Error(errorMessage)
            }
            return this._withTransaction(async (session, client) => {
                const newId = resourceIds.at(-1)
                await super._createUnsafe(newId, resource, { session, client })
                await this._hostStorage.create(this._getResourceIdsForHostStorage(resourceIds), newId, { session, client })
                if (this._enableTwoWayReferences) {
                    await this._updateUnsafe(newId, {
                        [`${this._hostStorage._collectionName}_ref`]: resourceIds.at(-2)
                    }, { session, client })
                }
                await session.commitTransaction()
                await this._emitter.emit('create', { after: resource, resourceIds })
                return newId
            })
        })
    }
    /**
     * Updates a resource by ids
     *
     * @name update
     * @param {string | Array.<string>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {object} update values that should be updated
     * @returns
     */
    async update(resourceIds, update) {
        return this._runWithActiveSpan('update-one-to-many-resource-by-id', resourceIds, async (span) => {
            if (!Array.isArray(resourceIds) || !(resourceIds.length == this._resourcePath.length + 1)) {
                const errorMessage = `Given resourceIds ${resourceIds} and resourcePath ${this._resourcePath} dont match lengths. For this operation you need to provide resourceIds with length ${this._resourcePath.length + 1}`
                span.addEvent(errorMessage, {
                    resourceIds,
                    resourcePath: this._resourcePath
                }).setStatus(SpanStatusCode.ERROR)
                throw new Error(errorMessage)
            }
            return this._withTransaction(async (session, client) => {
                const resource = await this.get(resourceIds)
                if (!resource) {
                    throw new Error(`${resourceIds} does not exist.`)
                }
                const updateResult = await this._updateUnsafe(resourceIds.slice(-1), update, { session, client })
                await session.commitTransaction()
                {
                    const newResource = await this.get(resourceIds)
                    await this._emitter.emit('update', { before: resource, after: newResource, resourceIds })
                }
                return updateResult
            })
        })
    }
    /**
     * Deletes a resource by ids
     *
     * @name delete
     * @param {string | Array.<string>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @returns
     */
    async delete(resourceIds) {
        return this._runWithActiveSpan('delete-one-to-many-resource-by-id', resourceIds, async (span) => {
            if (!Array.isArray(resourceIds) || !(resourceIds.length == this._resourcePath.length + 1)) {
                const errorMessage = `Given resourceIds ${resourceIds} and resourcePath ${this._resourcePath} dont match lengths. For this operation you need to provide resourceIds with length ${this._resourcePath.length + 1}`
                span.addEvent(errorMessage, {
                    resourceIds,
                    resourcePath: this._resourcePath
                }).setStatus(SpanStatusCode.ERROR)
                throw new Error(errorMessage)
            }
            return this._withTransaction(async (session, client) => {
                const resource = await this.get(resourceIds)
                if (!resource) {
                    throw new Error(`${resourceIds} does not exist.`)
                }
                const deleteResult = await this._hostStorage.delete(this._getResourceIdsForHostStorage(resourceIds), { session, client })
                await this._deleteUnsafe(resourceIds.slice(-1), resource, { session, client })
                await session.commitTransaction()
                await this._emitter.emit('delete', { before: resource, resourceIds })
                return deleteResult
            })
        })
    }
    /**
     * Closes all clients.
     *
     * @returns {Promise.<void>}
     */
    async close() {
        await this._hostStorage.close()
        // check first whether topology is still set. Very likely we are using
        // the same MongoClient and thus don't need to call `close`
        // of the super class
        if (this._mongoDbClient.topology) {
            await super.close()
        }
    }
}
