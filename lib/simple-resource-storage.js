const { MongoClient, Timestamp } = require('mongodb')
const { EQUALS, LIMIT, PROJECT } = require('./aggregations.js')
const eventTrigger = require('./usage-event-trigger.js')

/**
 * @name ConstructorOptions
 * @typedef ConstructorOptions
 * @description Options for class constructor
 * @property {String} [url=null] url to mongo instance. Can be null if client is set
 * @property {MongoClient} [client=null] configured mongo client to use. Can be null if url is set
 * @property {string} [databaseName=default] name of the mongodb database
 * @property {string} collectionName name of the mongodb collection used to store the resources
 * @property {import('node:events').EventEmitter} eventEmitter if provided, will trigger events base on resource creation, updates and deletion
 * 
 * @example
 * const { OneToManyResourceStorage } = require('./@discue/mongodb-resource-client')
 * const oneToManyResourceStorage = new OneToManyResourceStorage({
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
    constructor({ url, client, databaseName = 'default', collectionName, connectTimeout = 10_000, eventEmitter } = {}) {
        if (client) {
            this._mongoDbClient = client
        } else if (url) {
            this._mongoDbClient = new MongoClient(url, {
                connectTimeoutMS: connectTimeout,
            })
        } else {
            throw new Error('Configuration Error. Either `url` or `client` needs to be set.')
        }
        this._url = url
        this._databaseName = databaseName
        this._collectionName = collectionName

        this._emitUsageEventEnabled = eventEmitter != null
        this._emiteUsageEvent = eventTrigger(this.usageEventPrefix, collectionName, eventEmitter)

        this._getCollection().then(collection => {
            collection.createIndex([['id', 1], ['id', -1]], {
                unique: true
            })
        })
    }

    get usageEventPrefix() {
        return `simple-resource.${this._collectionName}`
    }

    /**
     * 
     * @returns {import('mongodb').MongoClient}
     */
    async _getConnectedClient() {
        if (this._mongoDbClient?.topology?.isConnected()) {
            return this._mongoDbClient
        } else {
            return this._mongoDbClient.connect()
        }
    }

    /**
     * 
     * @returns {Promise.<Collection>}
     */
    async _getCollection(collectionName) {
        const client = await this._getConnectedClient()
        const db = client.db(this._databaseName)
        return db.collection(collectionName ?? this._collectionName)
    }

    _toStringIfArray(ids) {
        if (Array.isArray(ids)) {
            return ids.at(0)
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
        return cursor.next()
    }

    /**
     * Returns all resources.
     * 
     * @method getAll
     * @param {GetOptions} options
     * @returns {Array.<Object>}
     */
    async getAll({ withMetadata = false, projection } = {}) {
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

        return collection.aggregate(aggregationStages).toArray()
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
        const collection = await this._getCollection()
        return collection.aggregate(aggregations).toArray()
    }

    /**
     * Returns true if a resource with given ids exists.
     * 
     * @method exists
     * @param {String|Array.<String>} resourceIds 
     * @returns {boolean}
     */
    async exists(resourceIds) {
        const resource = await this.get(resourceIds)
        return resource != undefined
    }

    /**
     * Adds a resource to a collection by ids.
     *
     * @method create
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {Object} resource the resource to be stored
     * @returns 
     */
    async create(resourceIds, resource) {
        return this._emiteUsageEvent({ context: 'create', after: resource, resourceIds }, async () => {
            const exists = await this.exists(resourceIds)
            if (exists) {
                throw new Error(`${resourceIds} already exists. ${JSON.stringify(exists)}`)
            }

            const collection = await this._getCollection()
            const result = await collection.insertOne(Object.assign(resource, {
                id: this._toStringIfArray(resourceIds),
                _meta_data: this._createMetadata()
            }))

            const success = result.acknowledged === true
            if (!success) {
                throw new Error(`Was not able to insert ${resourceIds} with resource ${resource}`)
            }

            return this._toStringIfArray(resourceIds)
        })
    }

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
        const resource = await this.get(resourceIds)
        if (!resource) {
            throw new Error(`${resourceIds} does not exist.`)
        }

        const updateResult = await this._updateUnsafe(resourceIds, update)

        if (this._emitUsageEventEnabled) {
            const newResource = await this.get(resourceIds)
            await this._emiteUsageEvent({ context: 'update', before: resource, after: newResource, resourceIds })
        }

        return updateResult
    }

    /**
     * Updates a resource by ids without checking its existence
     * 
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {Object} update values that should be updated
     * @returns 
     */
    async _updateUnsafe(resourceIds, update) {
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

        const collection = await this._getCollection()
        const result = await collection.updateOne({
            id: this._toStringIfArray(resourceIds)
        }, update)

        const success = result.acknowledged === true
        if (!success) {
            throw new Error(`Was not able to update ${resourceIds} with resource ${update}.`)
        }

        if (updateMetadataSeparately) {
            await collection.updateOne({
                id: this._toStringIfArray(resourceIds)
            }, {
                $set: this._createUpdateMetadata()
            })
        }
    }

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
        const resource = await this.get(resourceIds)
        if (!resource) {
            throw new Error(`${resourceIds} does not exist.`)
        }

        if (this._emitUsageEventEnabled) {
            return this._emiteUsageEvent({ context: 'delete', before: resource, resourceIds })
        }

        return this._deleteUnsafe(resourceIds, resource)
    }

    /**
     * Deletes a resource by ids without checking its existence.
     * 
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @returns 
     */
    async _deleteUnsafe(resourceIds) {
        const collection = await this._getCollection()
        const result = await collection.deleteOne({
            id: this._toStringIfArray(resourceIds)
        })

        const success = result.acknowledged === true
        if (!success) {
            throw new Error(`Was not able to delete ${resourceIds}.`)
        }
    }

    /**
     * Closes the datbase client.
     * 
     * @method close
     * @returns {void}
     */
    close() {
        return this._mongoDbClient.close()
    }
}