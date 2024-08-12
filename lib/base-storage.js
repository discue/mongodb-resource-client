import Emittery from 'emittery'
import * as mongodb from 'mongodb'
import History from './history.js'
import { withActiveSpan } from './tracer.js'

const { Timestamp } = mongodb

export default (class {
    /**
     * @public
     * @param {ConstructorOptions} options
     * @returns
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

        this._emitter.on(Emittery.listenerAdded, ({ eventName }) => {
            this._eventListenersCount[eventName]++
        })
        this._emitter.on(Emittery.listenerRemoved, ({ eventName }) => {
            this._eventListenersCount[eventName]--
        })
    }
    /**
     * @protected
     * @returns {import('mongodb').MongoClient}
     */
    async _getConnectedClient() {
        return this._mongoDbClient
    }
    /**
     * @protected
     * @param {import('mongodb').MongoClient} [givenClient]
     * @returns {import('mongodb').Db}
     */
    async _getDb(givenClient) {
        return this._runWithActiveSpan('get-db-instance', null, async () => {
            const client = givenClient ?? await this._getConnectedClient()
            return client.db(this._databaseName)
        })
    }
    /**
     * @protected
     * @param {import('mongodb').MongoClient} [collectionName]
     * @param {import('mongodb').MongoClient} [givenClient]
     * @returns {Promise.<Collection>}
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
     * @protected
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
     * @protected
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
     * @protected
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
     * @protected
     * @returns {object}
     */
    _createUpdateMetadata() {
        const timestamp = Timestamp.fromNumber(Date.now())
        return {
            '_meta_data.updated_at': timestamp
        }
    }

    /**
     * @protected
     */
    async _withActiveSpan(spanName, resourceIds, callback) {
        return withActiveSpan(`${spanName}`, { 'peer.service': 'resource-client', resourceIds, resourceName: this._collectionName, databaseName: this._databaseName }, callback)
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
        return this._emitter.on(eventName, callback)
    }

    /**
     * @param {('create'|'update'|'delete'|'close')} eventName
     * @param {AsyncFunction} callback
     * @returns {Function} a function to unsubscribe the listener
     */
    off(eventName, callback) {
        return this._emitter.off(eventName, callback)
    }

    /**
     * @returns {Function} a function to unsubscribe the listener
     */
    enableHistory() {
        this._history = new History({ client: this._mongoDbClient, databaseName: this._databaseName, collectionName: this._collectionName, storage: this })
    }

    /**
     * @returns {Function} a function to unsubscribe the listener
     */
    disableHistory() {
        this._history.disable()
        this._history = null
    }

    /**
     * Closes the database client
     *
     * @method close
     * @returns {void}
     */
    async close() {
        this._emitter.clearListeners()
        return this._mongoDbClient.close()
    }
})
