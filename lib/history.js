const ResourceStorage = require('./simple-resource-storage.js')

/**
 * @name ConstructorOptions
 * @typedef ConstructorOptions
 * @description Options for class constructor
 * @property {String} [url=null] url to mongo instance. Can be null if client is set
 * @property {MongoClient} [client=null] configured mongo client to use. Can be null if url is set
 * @property {string} [databaseName=null] name of the mongodb database
 * @property {string} collectionName name of the mongodb collection used to store the resources
 * @property {string} usageEventPrefix the usageEventPrefix of the target storage module
 * @property {number} [connectTimeout=10_000] the connect timeout of the mongo db client if client was not passed
 * @property {import('node:events').EventEmitter} eventEmitter if provided, will trigger events base on resource creation, updates and deletion
 * 
 * @example
 * const { EventEmiter } from 'events'
 * const { OneToFewResourceStorage, ResourceStorageHistory } = require('@discue/mongodb-resource-client')
 * 
 * const eventEmitter = new EventEmitter()
 * const collectionName = 'api_clients'
 * const url = 'mongodb://127.0.0.1:27017'
 * 
 * const oneToFewResourceStorage = new OneToFewResourceStorage({
 *   url,
 *   collectionName,
 *   eventEmitter
 * })
 * 
 * const history = new ResourceStorageHistory({
 *   url,
 *   collectionName,
 *   usageEventPrefix: oneToFewResourceStorage.usageEventPrefix
 *   eventEmitter
 * })
 * history.listenForStorageEvents()
 */

/**
 * Simple resource class that will listen to storage event of the given **eventEmitter** to populate a history collection / table.
 * 
 * @name ResourceStorageHistory
 * @class
 */
module.exports = class {

    /**
     * @public
     * @param {ConstructorOptions} options 
     */
    constructor({ url, client, databaseName, collectionName, connectTimeout = 10_000, usageEventPrefix, eventEmitter } = {}) {

        this._eventEmitter = eventEmitter
        this._collectionName = `${collectionName}_history`
        this._usageEventPrefix = usageEventPrefix

        this._resourceStorage = new ResourceStorage({ url, client, databaseName, collectionName: this._collectionName, connectTimeout })
    }

    /**
     * Activate listening for storage events to monitor changes of target storage resource to
     * populate the history table.
     * 
     * @public
     */
    listenForStorageEvents() {
        this._registerEventHandlers(this._eventEmitter)
    }

    /**
     * @private
     * @param {import('node:events').EventEmitter} eventEmitter 
     */
    _registerEventHandlers(eventEmitter) {
        eventEmitter.on(`${this._usageEventPrefix}.create`, (event) => this._eventHandler('create', event))
        eventEmitter.on(`${this._usageEventPrefix}.update`, (event) => this._eventHandler('update', event))
        eventEmitter.on(`${this._usageEventPrefix}.delete`, (event) => this._eventHandler('delete', event))
    }

    /**
     * @private
     * @param {Object} event 
     * @param {boolean} event.error 
     * @param {Object} event.after
     * @param {Array.<String>} event.resourceIds
     */
    async _eventHandler(action, { error, after, resourceIds }) {
        if (!error) {
            if (action === 'create') {
                await this._resourceStorage.create(resourceIds, {
                    history: [{
                        timestamp: Date.now(),
                        action,
                        resource: after
                    }]
                })
            } else {
                await this._resourceStorage.update(resourceIds, {
                    $push: {
                        history: {
                            timestamp: Date.now(),
                            action,
                            resource: after
                        }
                    }
                })
            }
        }
    }

    /**
     * Closes the database client
     * 
     * @method close
     * @returns {void}
     */
    close() {
        return this._resourceStorage.close()
    }
}