import ResourceStorage from './simple-resource-storage.js'
import { withActiveSpan } from './tracer.js'

/**
 * @typedef ConstructorOptions
 * @name ConstructorOptions
 * @description Options for class constructor
 * @property {MongoClient} client configured mongo client to use. Can be null if url is set
 * @property {string} [databaseName=null] name of the mongodb database
 * @property {string} collectionName name of the mongodb collection used to store the resources
 * @property {import('./base-storage.js')} storage the target storage object.
 * @example
 * import { OneToFewResourceStorage } from '@discue/mongodb-resource-client'
 * 
 * const collectionName = 'api_clients'
 * const url = 'mongodb://127.0.0.1:27017'
 * 
 * const storage = new OneToFewResourceStorage({
 *   url,
 *   collectionName
 * })
 * 
 * storage.enableHistory()
 */

/**
 * Simple resource class that will listen to storage events of the given storage object
 * 
 * @name ResourceStorageHistory
 * @class
 */

export default class {
    /**
     * @param {ConstructorOptions} options
     * @public
     */
    constructor({ client, databaseName, collectionName, connectTimeout = 10_000, storage } = {}) {
        /** @private */ this._collectionName = `${collectionName}_history`
        /** @private */ this._parentStorage = storage
        /** @private */ this._storage = new ResourceStorage({ client, databaseName, collectionName: this._collectionName, connectTimeout })
        /** @private */ this._eventHandlers = {
            create: (event) => this._eventHandler('create', event),
            update: (event) => this._eventHandler('update', event),
            delete: (event) => this._eventHandler('delete', event)
        }
        this._parentStorage.on('create', this._eventHandlers['create'])
        this._parentStorage.on('update', this._eventHandlers['update'])
        this._parentStorage.on('delete', this._eventHandlers['delete'])
    }

    disable() {
        this._parentStorage.off('create', this._eventHandlers['create'])
        this._parentStorage.off('update', this._eventHandlers['update'])
        this._parentStorage.off('delete', this._eventHandlers['delete'])
    }

    /**
     * @param {string} action
     * @param {object} event
     * @param {object} event.after
     * @param {string | Array.<string>} event.resourceIds
     * @param {string} event.collectionName
     * @private
     */
    async _eventHandler(action, { after, resourceIds, collectionName }) {
        return withActiveSpan(`handle-history-relevant-event`, { action, resourceIds }, async () => {
            if (action === 'create' && collectionName != this._collectionName) {
                await this._storage.create(resourceIds, {
                    history: [{
                        timestamp: Date.now(),
                        action,
                        resource: after
                    }]
                })
            }
            else {
                await this._storage.update(resourceIds, {
                    $push: {
                        history: {
                            timestamp: Date.now(),
                            action,
                            resource: after
                        }
                    }
                })
            }
        })
    }
    /**
     * Closes the database client
     *
     * @function close
     * @returns {void}
     */
    close() {
        return this._storage.close()
    }
}
