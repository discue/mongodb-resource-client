import Emittery from 'emittery'
import * as mongodb from 'mongodb'
import History from './history.js'
import { withActiveSpan } from './tracer.js'

const { Timestamp } = mongodb

/**
 * @typedef ConstructorOptions
 * @name ConstructorOptions
 * @property {MongoClient} client configured mongo client to use. Can be null if url is set
 * @property {string} [databaseName=null] name of the mongodb database
 * @property {string} collectionName name of the mongodb collection used to store the resources
 */

/**
 * @typedef GetOptions
 * @name GetOptions
 * @property {boolean} withMetadata true if also meta data should be returned
 * @property {object} projection MongoDB projection object e.g. { id: 0, name: 0 }
 * @protected
 */

/**
 * @typedef WithMongoClient
 * @name WithMongoClient
 * @property {import('mongodb').MongoClient} client
 * @protected
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

export default (class {
    /**
     * @param {ConstructorOptions} options
     * @returns
     * @public
     */
    constructor({ client, databaseName, collectionName } = {}) {
        if (client) {
            /** @private */ this._mongoDbClient = client
        }
        else {
            throw new Error('Configuration Error. `client` needs to be set.')
        }
        /** @private */ this._databaseName = process.env.DSQ_MONGODB_RESOURCE_CLIENT_DB_NAME || databaseName
        /** @private */ this._collectionName = collectionName
        /** @private */ this._transactionsEnabled = process.env.DSQ_MONGOD_ENABLE_TRANSACTIONS === 'true'
        /** @private */ this._history = null

        /** @protected */ this._emitter = new Emittery()
        /** @private */ this._eventListenersCount = {
            create: 0,
            update: 0,
            delete: 0
        }
        /** @private */ this._listenerMap = new Map()

        // Emittery v2 listeners receive a `{name, data}` object. Meta events
        // provide `data` with `{ eventName, listener }`. Support that shape
        // and guard against unexpected values.
        this._emitter.on(Emittery.listenerAdded, ({ data } = {}) => {
            const eventName = data?.eventName
            if (eventName && Object.prototype.hasOwnProperty.call(this._eventListenersCount, eventName)) {
                this._eventListenersCount[eventName]++
            }
        })
        this._emitter.on(Emittery.listenerRemoved, ({ data } = {}) => {
            const eventName = data?.eventName
            if (eventName && Object.prototype.hasOwnProperty.call(this._eventListenersCount, eventName)) {
                this._eventListenersCount[eventName]--
            }
        })
    }
    /**
     * @returns {import('mongodb').MongoClient}
     * @protected
     */
    async _getConnectedClient() {
        return this._mongoDbClient
    }
    /**
     * @param {import('mongodb').MongoClient} [givenClient]
     * @returns {import('mongodb').Db}
     * @protected
     */
    async _getDb(givenClient) {
        return this._runWithActiveSpan('get-db-instance', null, async () => {
            const client = givenClient ?? await this._getConnectedClient()
            return client.db(this._databaseName)
        })
    }
    /**
     * @param {import('mongodb').MongoClient} [collectionName]
     * @param {import('mongodb').MongoClient} [givenClient]
     * @returns {Promise.<Collection>}
     * @protected
     */
    async _getCollection(collectionName, givenClient) {
        return this._runWithActiveSpan('get-db-collection', null, async () => {
            if (collectionName && typeof collectionName !== 'string') {
                givenClient = collectionName
                collectionName = null
            }
            const db = await this._getDb(givenClient)
            return db.collection(collectionName ?? this._collectionName)
        })
    }
    /**
     * @param {string} spanName
     * @param {string | Array.<string> }resourceIds
     * @param {Function} callback
     * @protected
     */
    async _runWithActiveSpan(spanName, resourceIds, callback) {
        return withActiveSpan(`${spanName}`, { 'peer.service': 'resource-client', resourceIds, resourceName: this._collectionName, databaseName: this._databaseName }, callback)
    }

    /**
     * @typedef {import('mongodb').ClientSession} ClientSession
     */
    /**
     * @callback WithSessionCallback
     * @param {ClientSession} clientSession
     */
    /**
     * @param {WithSessionCallback} callback
     * @protected
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
        }
        catch (e) {
            if (session.transaction.isActive && !session.transaction.isCommitted) {
                await session.abortTransaction()
            }
            throw e
        }
        finally {
            await session.endSession()
        }
    }
    /**
     * @param {object} options
     * @returns {object}
     * @protected
     */
    _passSessionIfTransactionEnabled(options) {
        if (!this._transactionsEnabled && options?.session) {
            delete options.session
        }
        return options
    }
    /**
     * @returns {object}
     * @protected
     */
    _createMetadata() {
        const timestamp = Timestamp.fromNumber(Date.now())
        return {
            created_at: timestamp,
            updated_at: timestamp
        }
    }
    /**
     * @returns {object}
     * @protected
     */
    _createUpdateMetadata() {
        const timestamp = Timestamp.fromNumber(Date.now())
        return {
            '_meta_data.updated_at': timestamp
        }
    }

    /**
     * @callback AsyncFunction
     * @returns {Promise.<any>}
     */

    /**
     * @param {('create'|'update'|'delete'|'close')} eventName
     * @param {AsyncFunction} callback
     * @returns {Function} a function to unsubscribe the listener
     */
    on(eventName, callback) {
        // Wrap listener for Emittery v2 which delivers {name, data} objects.
        // Keep a mapping so `off` can remove the wrapped listener using the
        // original callback reference.
        let map = this._listenerMap.get(eventName)
        if (!map) {
            map = new WeakMap()
            this._listenerMap.set(eventName, map)
        }
        const wrapped = (evt) => {
            const payload = (evt && Object.prototype.hasOwnProperty.call(evt, 'data')) ? evt.data : evt
            return callback(payload)
        }
        map.set(callback, wrapped)
        return this._emitter.on(eventName, wrapped)
    }

    /**
     * @param {('create'|'update'|'delete'|'close')} eventName
     * @param {AsyncFunction} callback
     * @returns {Function} a function to unsubscribe the listener
     */
    off(eventName, callback) {
        const map = this._listenerMap.get(eventName)
        const wrapped = map?.get(callback) ?? callback
        if (map && map.has(callback)) {
            map.delete(callback)
        }
        return this._emitter.off(eventName, wrapped)
    }

    enableHistory() {
        this._history = new History({ client: this._mongoDbClient, databaseName: this._databaseName, collectionName: this._collectionName, storage: this })
    }

    disableHistory() {
        this._history.disable()
        this._history = null
    }

    /**
     * Closes the database client
     *
     * @function close
     * @returns {void}
     */
    async close() {
        // Emittery v2 may throw an AggregateError when listeners fail. Make
        // sure we always clear listeners and close the client, while still
        // propagating the original error.
        let emitError
        try {
            await this._emitter.emit('close')
        }
        catch (e) {
            emitError = e
        }
        this._emitter.clearListeners()
        await this._mongoDbClient.close()
        if (emitError) {
            throw emitError
        }
    }
})
