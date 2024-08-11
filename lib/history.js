import ResourceStorage from './simple-resource-storage.js'
import { withActiveSpan } from './tracer.js'

export default (class {
    /**
     * @public
     * @param {ConstructorOptions} options
     */
    constructor({ client, databaseName, collectionName, connectTimeout = 10_000, usageEventPrefix, eventEmitter } = {}) {
        this._eventEmitter = eventEmitter
        this._collectionName = collectionName
        this._usageEventPrefix = usageEventPrefix
        this._resourceStorage = new ResourceStorage({ client, databaseName, collectionName: this._collectionName, connectTimeout })
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
        eventEmitter.on(`${this._usageEventPrefix}.close`, () => this.close())
    }
    /**
     * @private
     * @param {Object} event
     * @param {boolean} event.error
     * @param {Object} event.after
     * @param {Array.<String>} event.resourceIds
     */
    async _eventHandler(action, { error, after, resourceIds, collectionName }) {
        if (!error) {
            return withActiveSpan(`handle-history-relevant-event`, { action, resourceIds }, async () => {
                if (action === 'create' && collectionName != this._collectionName) {
                    await this._resourceStorage.create(resourceIds, {
                        history: [{
                            timestamp: Date.now(),
                            action,
                            resource: after
                        }]
                    })
                }
                else {
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
            })
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
})
