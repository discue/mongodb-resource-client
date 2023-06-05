const { MongoClient } = require('mongodb')

/**
 * @name ConstructorOptions
 * @typedef ConstructorOptions
 * @description Options for class constructor
 * @property {String} [url=null] url to mongo instance. Can be null if client is set
 * @property {MongoClient} [client=null] configured mongo client to use. Can be null if url is set
 * @property {string} [databaseName=default] name of the mongodb database
 * @property {string} collectionName name of the mongodb collection used to store the resources
 * 
 * @example
 * const { OneToManyResourceStorage } = require('./@discue/mongodb-resource-client')
 * const oneToManyResourceStorage = new OneToManyResourceStorage({
 *   url: 'mongodb://127.0.0.1:27017',
 *   collectionName: 'api_clients',
 * })
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
    constructor({ url, client, databaseName = 'default', collectionName, connectTimeout = 10_000 } = {}) {
        if (client) {
            /**
             * @type {MongoClient}
             */
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
    async _getCollection() {
        const client = await this._getConnectedClient()
        const db = client.db(this._databaseName)
        return db.collection(this._collectionName)
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
     * @returns {Object}
     */
    async get(resourceIds) {
        const collection = await this._getCollection()
        const result = await collection.find({
            id: this._toStringIfArray(resourceIds)
        })
            .limit(1)
            .project({ _id: 0 })

        return result.next()
    }

    /**
     * Returns all resources.
     * 
     * @method getAll
     * @returns {Array.<Object>}
     */
    async getAll() {
        const collection = await this._getCollection()
        return collection.find()
            .project({ _id: 0 })
            .toArray()
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
        console.log({ resource })
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
        const exists = await this.exists(resourceIds)
        if (exists) {
            throw new Error(`${resourceIds} already exists. ${JSON.stringify(exists)}`)
        }

        const collection = await this._getCollection()
        const result = await collection.insertOne(Object.assign(resource, {
            id: this._toStringIfArray(resourceIds)
        }))

        const success = result.acknowledged === true
        if (!success) {
            throw new Error(`Was not able to insert ${resourceIds} with resource ${resource}`)
        }

        return this._toStringIfArray(resourceIds)
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
        const exists = await this.exists(resourceIds)
        if (!exists) {
            throw new Error(`${resourceIds} does not exist.`)
        }

        return this._updateUnsafe(resourceIds, update)
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
        if (!hasAtomicOperator) {
            update = {
                $set: update
            }
        }

        const collection = await this._getCollection()
        const result = await collection.updateOne({
            id: this._toStringIfArray(resourceIds)
        }, update)

        const success = result.acknowledged === true
        if (!success) {
            throw new Error(`Was not able to update ${resourceIds} with resource ${update}.`)
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
        const exists = await this.exists(resourceIds)
        if (!exists) {
            throw new Error(`${resourceIds} does not exist.`)
        }

        return this._deleteUnsafe(resourceIds)
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