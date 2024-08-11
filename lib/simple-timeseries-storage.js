import BaseStorage from './base-storage.js'
import { toArrayAndClose } from './safe-cursor.js'
import { withActiveSpan } from './tracer.js'
import eventTrigger from './usage-event-trigger.js'

export default (class extends BaseStorage {
    /**
     * @public
     * @param {ConstructorOptions} options
     * @returns
     */
    constructor({ client, databaseName, collectionName, eventEmitter, timeseries: { timeField = 'timestamp', metaField = 'metadata', granularity = 'seconds' } = {} } = {}) {
        super({ client, databaseName, collectionName })
        /** @private */ this._timeField = timeField
        /** @private */ this._eventEmitter = eventEmitter
        /** @private */ this._emitUsageEventEnabled = eventEmitter != null
        /** @private */ this._emitUsageEvent = eventTrigger(this.usageEventPrefix, collectionName, eventEmitter)
        super._getDb().then((db) => {
            db.createCollection(collectionName, { timeseries: { timeField, metaField, granularity } }).catch(() => { })
        })
    }
    get usageEventPrefix() {
        return `simple-timeseries.${this._collectionName}`
    }
    /**
     * @private
     */
    async _withActiveSpan(spanName, resourceIds, callback) {
        return withActiveSpan(`${spanName}`, { 'peer.service': 'resource-client', resourceIds, resourceName: this._collectionName, databaseName: this._databaseName }, callback)
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
        return this._withActiveSpan('find-timeseries-data', { resourceName: this._collectionName, databaseName: this._databaseName }, async () => {
            const collection = await super._getCollection()
            const cursor = collection.aggregate(aggregations)
            return toArrayAndClose(cursor)
        })
    }
    /**
     * Adds a resource to the timeseries.
     *
     * @method create
     * @param {Object} resource the resource to be stored. If timeField is missing, current timestamp will be added
     * @param {import('mongodb').InsertOneOptions} [options=null]
     * @returns
     */
    async create(resource, options) {
        return this._withActiveSpan('add-timeseries-data', null, async () => {
            if (!resource[this._timeField]) {
                resource[this._timeField] = new Date()
            }
            const collection = await super._getCollection()
            const result = await collection.insertOne(resource, options)
            const success = result.acknowledged === true
            if (!success) {
                throw new Error(`Was not able to insert ${resource}.`)
            }
        })
    }
})
