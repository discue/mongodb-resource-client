import { EQUALS, LIMIT, PROJECT } from './aggregations.js'
import Base from './base-storage.js'
import { getSingleLookupPipeline, joinAndQueryChildResourcesPipeline } from './lookup-pipeline.js'
import { getFirstAndClose, toArrayAndClose } from './safe-cursor.js'

/**
 * @typedef ConstructorOptions
 * @name ConstructorOptions
 * @property {MongoClient} client configured mongo client to use. Can be null if url is set
 * @property {string} [databaseName=null] name of the mongodb database
 * @property {string} collectionName name of the mongodb collection used to store the resources
 * @property {Array.<object>} [indexes=null] indexes to be created on instantiation. Use format {key:1} for single indexes and {key1: 1, key:2} for compound indexes. See https://www.mongodb.com/docs/manual/reference/command/createIndexes/#command-fields
 * @example
 * import { MongoClient } from 'mongodb'
 * import { SimpleResourceStorage } from '@discue/mongodb-resource-client'
 * 
 * const client = new MongoClient(url, {
 *   serverApi: { version: '1', strict: true, deprecationErrors: true }, // https://www.mongodb.com/docs/manual/reference/stable-api/
 * })
 * 
 * const storage = new SimpleResourceStorage({
 *   client,
 *   collectionName: 'api_clients',
 * })
 */

/**
 * @typedef GetOptions
 * @name GetOptions
 * @property {boolean} withMetadata true if also meta data should be returned
 * @property {object} projection MongoDB projection object e.g. { id: 0, name: 0 }
 * @private
 */

/**
 * @typedef WithMongoClient
 * @name WithMongoClient
 * @property {import('mongodb').MongoClient} client
 * @private
 */

/**
 * @typedef {import('mongodb').Collection} Collection
 * @typedef {import('mongodb').MongoClient} MongoClient
 * @private
 */

/**
 * Simple resource class with crud operation methods to create, update, delete, and
 * get stored entities and documents.
 * 
 * @name SimpleResourceStorage
 * @class
 */

export default class extends Base {
    /**
     * @param {ConstructorOptions} options
     * @returns
     * @public
     */
    constructor({ client, databaseName, collectionName, indexes } = {}) {
        super({ client, databaseName, collectionName })
        this._getCollection().then(async (collection) => {
            if (indexes?.length > 0) {
                const indexSpecifications = indexes.map((index) => {
                    if (index.key) {
                        return index
                    }
                    else {
                        return { key: index }
                    }
                })
                await collection.createIndexes(indexSpecifications)
            }
            await collection.createIndex({ id: 1 }, {
                unique: true
            })
        }).catch((e) => {
            console.error(`[mongodb-resource-client] Unable to create index for collection ${this._collectionName} in db ${this._databaseName}`, e)
        })
    }

    /**
     * @callback WithSessionCallback
     * @param {import('mongodb').ClientSession}
     */
    /**
     * @param {Array.<string>} ids
     * @returns
     * @private
     */
    _toStringIfArray(ids) {
        if (Array.isArray(ids)) {
            if (ids.length === 1) {
                return ids.at(0)
            }
            return ids.join('#')
        }
        else {
            return ids
        }
    }
    /**
     * Returns a resource by ids.
     *
     * @function get
     * @param {string | Array.<string>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {GetOptions} options
     * @returns {object}
     */
    async get(resourceIds, { withMetadata = false, projection } = {}) {
        return this.__getResource(resourceIds, { withMetadata, projection })
    }
    /**
     * Returns a resource by ids.
     *
     * @function get
     * @param {string | Array.<string>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {GetOptions} options
     * @returns {object}
     * @private
     */
    async __getResource(resourceIds, { withMetadata = false, projection } = {}) {
        return this._runWithActiveSpan('get-simple-resource-by-id', resourceIds, async () => {
            const collection = await this._getCollection()
            const aggregationStages = [
                EQUALS('id', this._toStringIfArray(resourceIds)),
                LIMIT(1)
            ]
            if (!withMetadata) {
                aggregationStages.push(PROJECT({ _id: 0, _meta_data: 0 }))
            }
            else {
                aggregationStages.push(PROJECT({ _id: 0 }))
            }
            if (projection) {
                aggregationStages.push(PROJECT(projection))
            }
            const cursor = collection.aggregate(aggregationStages)
            return getFirstAndClose(cursor)
        })
    }
    /**
     * Returns all resources.
     *
     * @function getAll
     * @param {GetOptions} options
     * @returns {Array.<object>}
     */
    async getAll({ withMetadata = false, projection } = {}) {
        return this._runWithActiveSpan('get-all-simple-resources', { resourceName: this._collectionName, databaseName: this._databaseName }, async () => {
            const collection = await this._getCollection()
            const aggregationStages = []
            if (!withMetadata) {
                aggregationStages.push(PROJECT({ _id: 0, _meta_data: 0 }))
            }
            else {
                aggregationStages.push(PROJECT({ _id: 0 }))
            }
            if (projection) {
                aggregationStages.push(PROJECT(projection))
            }
            const cursor = collection.aggregate(aggregationStages)
            return toArrayAndClose(cursor)
        })
    }
    /**
     * @typedef GetOptions
     * @name GetChildrenOptions
     * @property {boolean} withMetadata true if also meta data should be returned
     * @property {object} projection MongoDB projection object e.g. { id: 0, name: 0 }
     * @property {object} match MongoDB match object e.g. { id: 0, name: 0 }
     * @private
     */
    /**
     * @typedef ChildrenAndResourcePaths
     * @property {Array.<object>} children
     * @property {object} resourcePaths and object mapping child ids to their resource path e.g. { 4: '/queues/123/listeners/4'}
     */
    /**
     * Returns all children of a certain type/collection. Imagine this method walking a tree and returning all leaves at a certain level.
     *
     * Currently only supports trees with three levels.
     *
     * @name getAll
     * @param {string | Array.<string>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {string | Array.<string>} childPath the path of the children to query e.g. /api_clients/queues/messages
     * @param {GetChildrenOptions} [options]
     * @returns {Promise.<ChildrenAndResourcePaths>}
     */
    async getAllChildren(resourceIds, childPath, { withMetadata = false, projection, match } = {}) {
        return this._runWithActiveSpan('get-all-simple-resource-children', resourceIds, async () => {
            if (childPath.startsWith('/')) {
                childPath = childPath.substring(1)
            }
            const [parent, child] = childPath.split('/')
            if (!parent || !child) {
                throw new Error(`childPath with value ${childPath} does not match expected value "parent/child"`)
            }
            const lookupPipeline = getSingleLookupPipeline({ rootId: this._toStringIfArray(resourceIds), childCollectionName: parent })
            const childResourcesPipeline = joinAndQueryChildResourcesPipeline({ parentCollectionName: parent, childCollectionName: child, options: { withMetadata, projection, match } })
            lookupPipeline.push(...childResourcesPipeline)
            const collection = await this._getCollection()
            const cursor = collection.aggregate(lookupPipeline)
            const result = await toArrayAndClose(cursor)
            if (result.length === 0) {
                return {}
            }
            const children = result.at(0).children ?? []
            const resourcePaths = result.at(0).resource_paths ?? []
            return { children, resourcePaths }
        })
    }
    /**
     * Returns the count of all children of a certain type/collection.
     *
     * Currently only supports trees with three levels.
     *
     * @name countAllChildren
     * @param {string | Array.<string>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {string | Array.<string>} childPath the path of the children to query e.g. /api_clients/queues/messages
     * @param {GetChildrenOptions} [options]
     * @returns {Promise.<number>}
     */
    async countAllChildren(resourceIds, childPath, { withMetadata = false, projection, match } = {}) {
        return this._runWithActiveSpan('count-all-simple-resource-children', resourceIds, async () => {
            if (childPath.startsWith('/')) {
                childPath = childPath.substring(1)
            }
            const [parent, child] = childPath.split('/')
            if (!parent || !child) {
                throw new Error(`childPath with value ${childPath} does not match expected value "parent/child"`)
            }
            const lookupPipeline = getSingleLookupPipeline({ rootId: this._toStringIfArray(resourceIds), childCollectionName: parent })
            const childResourcesPipeline = joinAndQueryChildResourcesPipeline({ parentCollectionName: parent, childCollectionName: child, options: { withMetadata, projection, match } })
            lookupPipeline.push(...childResourcesPipeline)
            lookupPipeline.push(PROJECT({ count: { $size: '$children' } }))
            const collection = await this._getCollection()
            const cursor = collection.aggregate(lookupPipeline)
            const result = await toArrayAndClose(cursor)
            if (result.length === 0) {
                return 0
            }
            return result.at(0).count
        })
    }
    /**
     * Returns all resources that pass the given aggregation stages.
     *
     * @function find
     * @param {Array.<object>} [aggregations=[]] a list of valid aggregation objects
     * @returns {Array.<object>}
     * @see {@link README_AGGREGATIONS.md}
     */
    async find(aggregations = []) {
        return this._runWithActiveSpan('find-simple-resources', { resourceName: this._collectionName, databaseName: this._databaseName }, async () => {
            const collection = await this._getCollection()
            const cursor = collection.aggregate(aggregations)
            return toArrayAndClose(cursor)
        })
    }
    /**
     * Returns true if a resource with given ids exists.
     *
     * @function exists
     * @param {string | Array.<string>} resourceIds
     * @returns {boolean}
     */
    async exists(resourceIds) {
        return this._runWithActiveSpan('exists-simple-resource-by-id', resourceIds, async () => {
            const resource = await this.get(resourceIds)
            return resource != undefined
        })
    }
    /**
     * Adds a resource to a collection by ids.
     *
     * @function create
     * @param {string | Array.<string>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {object} resource the resource to be stored
     * @param {import('mongodb').InsertOneOptions} [options=null]
     * @returns
     */
    async create(resourceIds, resource, options) {
        return this._runWithActiveSpan('create-simple-resource-by-id', resourceIds, async () => {
            await this._createUnsafe(resourceIds, resource, options)
            await this._emitter.emit('create', { after: resource, resourceIds })
            return this._toStringIfArray(resourceIds)
        })
    }

    /**
     * Adds a resource to a collection without any checks.
     * 
     * @function create
     * @param {string | Array.<string>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {object} resource the resource to be stored
     * @param {import('mongodb').InsertOneOptions} [options=null]
     * @returns
     * @protected
     */
    async _createUnsafe(resourceIds, resource, options) {
        const collection = await this._getCollection()
        const result = await collection.insertOne(Object.assign(resource, {
            id: this._toStringIfArray(resourceIds),
            _meta_data: this._createMetadata()
        }), this._passSessionIfTransactionEnabled(options))
        const success = result.acknowledged === true
        if (!success) {
            throw new Error(`Was not able to insert ${resourceIds} with resource ${resource}`)
        }
    }

    /**
     * @typedef UpdateOptions
     * @property {boolean} [upsert=false]
     */
    /**
     * Updates a resource by ids.
     *
     * @function update
     * @param {string | Array.<string>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {object} update values that should be updated
     * @param {UpdateOptions} options
     * @returns
     */
    async update(resourceIds, update, options) {
        return this._runWithActiveSpan('update-simple-resource-by-id', resourceIds, async () => {
            return this._withTransaction(async (session, client) => {
                let resource = null
                if (!options || options.upsert == false) {
                    resource = await this.get(resourceIds)
                    if (!resource) {
                        throw new Error(`${resourceIds} does not exist.`)
                    }
                }
                const updateResult = await this._updateUnsafe(resourceIds, update, { session, client, upsert: options?.upsert })
                await session.commitTransaction()
                const newResource = await this.get(resourceIds)
                await this._emitter.emit('update', { before: resource, after: newResource, resourceIds })
                return updateResult
            })
        })
    }
    /**
     * Updates a resource by ids without checking its existence
     *
     * @param {string | Array.<string>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {object} update values that should be updated
     * @param {import('mongodb').DeleteOptions | WithMongoClient} options
     * @returns
     * @private
     */
    async _updateUnsafe(resourceIds, update, options) {
        const hasAtomicOperator = Object.keys(update).find(key => key.startsWith('$'))
        let updateMetadataSeparately = false
        if (!hasAtomicOperator) {
            update = {
                $set: update
            }
        }
        const objectKeys = Object.keys(update)
        const isSetOperation = objectKeys.at(0) === '$set'
        if (isSetOperation) {
            update = {
                $set: Object.assign({}, update['$set'], this._createUpdateMetadata())
            }
        }
        else {
            // let's not generically interfere with updates and in this case
            // update meta data with another operation
            updateMetadataSeparately = true
        }
        const collection = await this._getCollection(options.client)
        const result = await collection.updateOne({
            id: this._toStringIfArray(resourceIds)
        }, update, this._passSessionIfTransactionEnabled(options))
        const success = result.acknowledged === true
        if (!success) {
            throw new Error(`Was not able to update ${resourceIds} with resource ${update}.`)
        }
        if (updateMetadataSeparately) {
            await collection.updateOne({
                id: this._toStringIfArray(resourceIds)
            }, {
                $set: this._createUpdateMetadata()
            }, this._passSessionIfTransactionEnabled(options))
        }
    }
    /**
     * Deletes a resource by ids.
     *
     * @function delete
     * @param {string | Array.<string>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @returns
     */
    async delete(resourceIds) {
        return this._runWithActiveSpan('delete-simple-resource-by-id', resourceIds, async () => {
            return this._withTransaction(async (session, client) => {
                const resource = await this.get(resourceIds)
                if (!resource) {
                    throw new Error(`${resourceIds} does not exist.`)
                }
                const deleteResult = await this._deleteUnsafe(resourceIds, resource, { session, client })
                await session.commitTransaction()
                await this._emitter.emit('delete', { before: resource, resourceIds })
                return deleteResult
            })
        })
    }
    /**
     * Deletes a resource by ids without checking its existence.
     *
     * @param {string | Array.<string>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {import('mongodb').DeleteOptions | WithMongoClient} options
     * @returns
     * @private
     */
    async _deleteUnsafe(resourceIds, options) {
        const collection = await this._getCollection(options?.client)
        const result = await collection.deleteOne({
            id: this._toStringIfArray(resourceIds)
        }, this._passSessionIfTransactionEnabled(options))
        const success = result.acknowledged === true && result.deletedCount > 0
        if (!success) {
            throw new Error(`Was not able to delete ${resourceIds}.`)
        }
    }
}
