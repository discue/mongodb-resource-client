const { MongoClient, Timestamp } = require('mongodb')
const { EQUALS, LIMIT, PROJECT } = require('./aggregations.js')
const eventTrigger = require('./usage-event-trigger.js')
const { createTracer } = require('@discue/open-telemetry-tracing')
const { name } = require('../package.json')
const { getSingleLookupPipeline, joinAndQueryChildResourcesPipeline } = require('./lookup-pipeline.js')
const { toArrayAndClose, getFirstAndClose } = require('./safe-cursor.js')

/**
 * @private
 */
const { withActiveSpan } = createTracer({
    filepath: __filename
})


/**
 * @name ConstructorOptions
 * @typedef ConstructorOptions
 * @property {String} [url=null] url to mongo instance. Can be null if client is set
 * @property {MongoClient} [client=null] configured mongo client to use. Can be null if url is set
 * @property {string} [databaseName=null] name of the mongodb database
 * @property {string} collectionName name of the mongodb collection used to store the resources
 * @property {number} [connectTimeout=10_000] the connect timeout of the mongo db client if client was not passed
 * @property {import('node:events').EventEmitter} eventEmitter if provided, will trigger events base on resource creation, updates and deletion
 * 
 * @example
 * const { SimpleResourceStorage } = require('@discue/mongodb-resource-client')
 * const storage = new SimpleResourceStorage({
 *   url: 'mongodb://127.0.0.1:27017',
 *   collectionName: 'api_clients',
 * })
 */

/**
 * @name GetOptions
 * @private
 * @typedef GetOptions
 * @property {boolean} withMetadata true if also meta data should be returned
 * @property {Object} projection MongoDB projection object e.g. { id: 0, name: 0 }
 */

/**
 * @name WithMongoClient
 * @private
 * @typedef WithMongoClient
 * @property {import('mongodb').MongoClient} client
 */

/**
 * @private
 * @typedef {import('mongodb').Collection} Collection
 * @typedef {import('mongodb').MongoClient} MongoClient
 */

/**
 * Simple resource class with crud operation methods to create, update, delete, and
 * get stored entities and documents.
 * 
 * @name SimpleResourceStorage
 * @class
 */
module.exports = class {

    /**
     * @public
     * @param {ConstructorOptions} options 
     * @returns 
     */
    constructor({ url, client, databaseName, collectionName, connectTimeout = 10_000, eventEmitter } = {}) {
        if (client) {
            this._mongoDbClient = client
        } else if (url) {
            this._mongoDbClient = new MongoClient(url, {
                connectTimeoutMS: connectTimeout,
            })

            // if no client was provided, we need to take care of closing it
            process.on('SIGTERM', () => {
                this._mongoDbClient.close()
            })
        } else {
            throw new Error('Configuration Error. Either `url` or `client` needs to be set.')
        }
        /** @private */ this._url = url
        /** @private */ this._databaseName = process.env.DSQ_MONGODB_RESOURCE_CLIENT_DB_NAME || databaseName
        /** @private */ this._useSharedClient = process.env.DSQ_MONGODB_USE_SHARED_DB_CLIENT === 'false' ? false : true
        /** @private */ this._collectionName = collectionName

        /** @private */ this._eventEmitter = eventEmitter
        /** @private */ this._emitUsageEventEnabled = eventEmitter != null
        /** @private */ this._emitUsageEvent = eventTrigger(this.usageEventPrefix, collectionName, eventEmitter)

        /** @private */ this._transactionsEnabled = process.env.DSQ_MONGOD_ENABLE_TRANSACTIONS === 'true'

        this._getCollection().then(collection => {
            collection.createIndex([['id', 1], ['id', -1]], {
                unique: true
            })
        }).catch((e) => {
            console.error(`[mongodb-resource-client] Unable to create index for collection ${this._collectionName} in db ${this._databaseName}`, e)
        })
    }

    get usageEventPrefix() {
        return `simple-resource.${this._collectionName}`
    }

    /**
     * 
     * @param {import('node:events').EventEmitter} eventEmitter 
     */
    enableEventing(eventEmitter) {
        this._emitUsageEventEnabled = eventEmitter != null
        this._emitUsageEvent = eventTrigger(this.usageEventPrefix, this._collectionName, eventEmitter)
    }

    /**
     * 
     */
    disableEventing() {
        this._emitUsageEventEnabled = false
        this._emitUsageEvent = null
    }

    /**
     * @private
     * @returns {import('mongodb').MongoClient}
     */
    async _getConnectedClient() {
        if (this._useSharedClient) {
            return this._mongoDbClient
        } else {
            return this._mongoDbClient.connect()
        }
    }

    /**
     * @private
     * @param {import('mongodb').MongoClient} [givenClient]
     * @returns {import('mongodb').Db}
     */
    async _getDb(givenClient) {
        return this._withActiveSpan('get-db-instance', null, async () => {
            const client = givenClient ?? await this._getConnectedClient()
            return client.db(this._databaseName)
        })
    }

    /**
     * @private
     * @param {import('mongodb').MongoClient} [collectionName]
     * @param {import('mongodb').MongoClient} [givenClient]
     * @returns {Promise.<Collection>}
     */
    async _getCollection(collectionName, givenClient) {
        return this._withActiveSpan('get-db-collection', null, async () => {
            if (collectionName && typeof collectionName !== 'string') {
                givenClient = collectionName
                collectionName = null
            }
            const db = await this._getDb(givenClient)
            return db.collection(collectionName ?? this._collectionName)
        })
    }

    /**
     * @private
     */
    async _withActiveSpan(spanName, resourceIds, callback) {
        return withActiveSpan(`${name}#${spanName}`, { 'peer.service': 'resource-client', resourceIds, resourceName: this._collectionName, databaseName: this._databaseName }, callback)
    }

    /**
     * @callback WithSessionCallback
     * @param {import('mongodb').ClientSession}
     */

    /**
     * @private
     * @param {WithSessionCallback} callback 
     */
    async _withTransaction(callback) {
        const client = await this._getConnectedClient()
        const session = client.startSession()
        try {
            return await session.withTransaction((transaction) => callback.call(this, transaction, client), {
                readPreference: 'primary',
                readConcern: { level: 'local' },
                writeConcern: { w: 'majority' }
            })
        } catch (e) {
            if (session.transaction.isActive && !session.transaction.isCommitted) {
                await session.abortTransaction()
            }
            throw e
        } finally {
            await session.endSession()
        }
    }

    /**
     * @private
     * @param {object} options 
     * @returns {object}
     */
    _passSessionIfTransactionEnabled(options) {
        if (!this._transactionsEnabled && options?.session) {
            delete options.session
        }
        return options
    }

    /**
     * @private
     * @param {Array.<string>} ids 
     * @returns 
     */
    _toStringIfArray(ids) {
        if (Array.isArray(ids)) {
            if (ids.length === 1) {
                return ids.at(0)
            }
            return ids.join('#')
        } else {
            return ids
        }
    }

    /**
     * Returns a resource by ids.
     * 
     * @method get
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {GetOptions} options
     * @returns {Object}
     */
    async get(resourceIds, { withMetadata = false, projection } = {}) {
        return this.__getResource(resourceIds, { withMetadata, projection })
    }

    /**
     * Returns a resource by ids.
     * 
     * @private
     * @method get
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {GetOptions} options
     * @returns {Object}
     */
    async __getResource(resourceIds, { withMetadata = false, projection } = {}) {
        return this._withActiveSpan('get-simple-resource-by-id', resourceIds, async () => {
            const collection = await this._getCollection()
            const aggregationStages = [
                EQUALS('id', this._toStringIfArray(resourceIds)),
                LIMIT(1)
            ]

            if (!withMetadata) {
                aggregationStages.push(PROJECT({ _id: 0, _meta_data: 0 }))
            } else {
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
     * @method getAll
     * @param {GetOptions} options
     * @returns {Array.<Object>}
     */
    async getAll({ withMetadata = false, projection } = {}) {
        return this._withActiveSpan('get-all-simple-resources', { resourceName: this._collectionName, databaseName: this._databaseName }, async () => {
            const collection = await this._getCollection()
            const aggregationStages = []

            if (!withMetadata) {
                aggregationStages.push(PROJECT({ _id: 0, _meta_data: 0 }))
            } else {
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
     * @name GetChildrenOptions
     * @private
     * @typedef GetOptions
     * @property {boolean} withMetadata true if also meta data should be returned
     * @property {Object} projection MongoDB projection object e.g. { id: 0, name: 0 }
     * @property {Object} match MongoDB match object e.g. { id: 0, name: 0 }
     */

    /**
     * @typedef ChildrenAndResourcePaths
     * @property {Array.<Object>} children
     * @property {Object} resourcePaths and object mapping child ids to their resource path e.g. { 4: '/queues/123/listeners/4'}
     */

    /**
     * Returns all children of a certain type/collection. Imagine this method walking a tree and returning all leaves at a certain level.
     * 
     * Currently only supports trees with three levels.
     * 
     * @name getAll
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {String|Array.<String>} childPath the path of the children to query e.g. /api_clients/queues/messages
     * @param {GetChildrenOptions} [options]
     * @returns {Promise.<ChildrenAndResourcePaths>}
     */
    async getAllChildren(resourceIds, childPath, { withMetadata = false, projection, match } = {}) {
        return this._withActiveSpan('get-all-simple-resource-children', resourceIds, async () => {
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
                return result
            }

            const children = result.at(0).children
            let resourcePaths = result.at(0).resource_paths
            if (!children || children.length === 0) {
                return []
            }

            return { children, resourcePaths }
        })
    }

    /**
     * Returns all resources that pass the given aggregation stages.
     * 
     * @see {@link README_AGGREGATIONS.md}
     * @method find
     * @param {Array.<Object>} [aggregations=[]] a list of valid aggregation objects
     * @returns {Array.<Object>}
     */
    async find(aggregations = []) {
        return this._withActiveSpan('find-simple-resources', { resourceName: this._collectionName, databaseName: this._databaseName }, async () => {
            const collection = await this._getCollection()

            const cursor = collection.aggregate(aggregations)
            return toArrayAndClose(cursor)
        })
    }

    /**
     * Returns true if a resource with given ids exists.
     * 
     * @method exists
     * @param {String|Array.<String>} resourceIds 
     * @returns {boolean}
     */
    async exists(resourceIds) {
        return this._withActiveSpan('exists-simple-resource-by-id', resourceIds, async () => {
            const resource = await this.get(resourceIds)
            return resource != undefined
        })
    }

    /**
     * Returns true if a resource with given ids exists.
     * 
     * @private
     * @method exists
     * @param {String|Array.<String>} resourceIds 
     * @returns {boolean}
     */
    async _checkResourceExistsSimple(resourceIds) {
        return this._withActiveSpan('exists-simple-resource-by-id', resourceIds, async () => {
            const resource = await this.__getResource(resourceIds)
            return resource != undefined
        })
    }

    /**
     * Adds a resource to a collection by ids.
     *
     * @method create
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {Object} resource the resource to be stored
     * @param {import('mongodb').InsertOneOptions} [options=null]
     * @returns 
     */
    async create(resourceIds, resource, options) {
        return this._withActiveSpan('create-simple-resource-by-id', resourceIds, async () => {
            const exists = await this._checkResourceExistsSimple(resourceIds)
            if (exists) {
                throw new Error(`${resourceIds} already exists. ${JSON.stringify(exists)}`)
            }

            const collection = await this._getCollection()
            const result = await collection.insertOne(Object.assign(resource, {
                id: this._toStringIfArray(resourceIds),
                _meta_data: this._createMetadata()
            }), this._passSessionIfTransactionEnabled(options))

            const success = result.acknowledged === true
            if (!success) {
                throw new Error(`Was not able to insert ${resourceIds} with resource ${resource}`)
            }

            if (this._emitUsageEventEnabled) {
                await this._emitUsageEvent({ context: 'create', after: resource, resourceIds })
            }

            return this._toStringIfArray(resourceIds)
        })
    }

    /**
     * @private
     * @returns {object}
     */
    _createMetadata() {
        const timestamp = Timestamp.fromNumber(Date.now())
        return {
            created_at: timestamp,
            updated_at: timestamp
        }
    }

    /**
     * Updates a resource by ids.
     * 
     * @method update
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {Object} update values that should be updated
     * @returns 
     */
    async update(resourceIds, update) {
        return this._withActiveSpan('update-simple-resource-by-id', resourceIds, async () => {
            return this._withTransaction(async (session, client) => {
                const resource = await this.get(resourceIds)
                if (!resource) {
                    throw new Error(`${resourceIds} does not exist.`)
                }

                const updateResult = await this._updateUnsafe(resourceIds, update, { session, client })
                await session.commitTransaction()

                if (this._emitUsageEventEnabled) {
                    const newResource = await this.get(resourceIds)
                    await this._emitUsageEvent({ context: 'update', before: resource, after: newResource, resourceIds })
                }

                return updateResult
            })
        })
    }

    /**
     * Updates a resource by ids without checking its existence
     *
     * @private
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {Object} update values that should be updated
     * @param {import('mongodb').DeleteOptions | WithMongoClient} options
     * @returns 
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
        } else {
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
     * @private
     * @returns {object}
     */
    _createUpdateMetadata() {
        const timestamp = Timestamp.fromNumber(Date.now())
        return {
            '_meta_data.updated_at': timestamp
        }
    }

    /**
     * Deletes a resource by ids.
     * 
     * @method delete
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @returns 
     */
    async delete(resourceIds) {
        return this._withActiveSpan('delete-simple-resource-by-id', resourceIds, async () => {
            return this._withTransaction(async (session, client) => {
                const resource = await this.get(resourceIds)
                if (!resource) {
                    throw new Error(`${resourceIds} does not exist.`)
                }

                const deleteResult = await this._deleteUnsafe(resourceIds, resource, { session, client })
                await session.commitTransaction()

                if (this._emitUsageEventEnabled) {
                    await this._emitUsageEvent({ context: 'delete', before: resource, resourceIds })
                }

                return deleteResult
            })
        })
    }

    /**
     * Deletes a resource by ids without checking its existence.
     * 
     * @private
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {import('mongodb').DeleteOptions | WithMongoClient} options
     * @returns 
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

    /**
     * Closes the database client
     * 
     * @method close
     * @returns {void}
     */
    async close() {
        if (this._emitUsageEventEnabled) {
            await this._emitUsageEvent({ context: 'close' })
        }
        return this._mongoDbClient.close()
    }
}