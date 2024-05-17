'use strict'

const { Timestamp } = require('mongodb')
const { createTracer } = require('@discue/open-telemetry-tracing')
const { name } = require('../package.json')

/**
 * @private
 */
const { withActiveSpan } = createTracer({
    filepath: __filename
})

/**
 * @name ConstructorOptions
 * @typedef ConstructorOptions
 * @property {MongoClient} [client=null] configured mongo client to use. Can be null if url is set
 * @property {string} [databaseName=null] name of the mongodb database
 * @property {string} collectionName name of the mongodb collection used to store the resources
 * @property {Array.<Object>} [indexes=null] indexes to be created on instantiation. Use format {key:1} for single indexes and {key1: 1, key:2} for compound indexes. See https://www.mongodb.com/docs/manual/reference/command/createIndexes/#command-fields
 * @property {import('node:events').EventEmitter} eventEmitter if provided, will trigger events base on resource creation, updates and deletion
 * 
 * @example
 * const { MongoClient } = require('mongodb')
 * const { SimpleResourceStorage } = require('@discue/mongodb-resource-client')
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
    constructor({ client, databaseName, collectionName } = {}) {
        if (client) {
            this._mongoDbClient = client
        } else {
            throw new Error('Configuration Error. `client` needs to be set.')
        }

        /** @private */ this._databaseName = process.env.DSQ_MONGODB_RESOURCE_CLIENT_DB_NAME || databaseName
        /** @private */ this._collectionName = collectionName

        /** @private */ this._transactionsEnabled = process.env.DSQ_MONGOD_ENABLE_TRANSACTIONS === 'true'
    }

    /**
     * @private
     * @returns {import('mongodb').MongoClient}
     */
    async _getConnectedClient() {
        return this._mongoDbClient
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
     * Closes the database client
     * 
     * @method close
     * @returns {void}
     */
    async close() {
        return this._mongoDbClient.close()
    }
}