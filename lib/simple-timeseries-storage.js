'use strict'

const BaseStorage = require('./base-storage.js')
const { createTracer } = require('@discue/open-telemetry-tracing')
const { name } = require('../package.json')
const { toArrayAndClose } = require('./safe-cursor.js')
const eventTrigger = require('./usage-event-trigger.js')

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
 * const { SimpleTimeseriesStorage } = require('@discue/mongodb-resource-client')
 * 
 * const client = new MongoClient(url, {
 *   serverApi: { version: '1', strict: true, deprecationErrors: true }, // https://www.mongodb.com/docs/manual/reference/stable-api/
 * })
 * 
 * const storage = new SimpleTimeseriesStorage({
 *   client,
 *   collectionName: 'api_access',
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
 * Simple resource class that allows appending to Timeseries
 * 
 * @name SimpleTimeseriesStorage
 * @class
 */
module.exports = class extends BaseStorage {

    /**
     * @public
     * @param {ConstructorOptions} options 
     * @returns 
     */
    constructor(
        { client, databaseName, collectionName, eventEmitter, timeseries: {
            timeField = 'timestamp',
            metaField = 'metadata',
            granularity = 'seconds'
        } = {}
        } = {}) {
        super({ client, databaseName, collectionName })

        /** @private */ this._timeField = timeField

        /** @private */ this._eventEmitter = eventEmitter
        /** @private */ this._emitUsageEventEnabled = eventEmitter != null
        /** @private */ this._emitUsageEvent = eventTrigger(this.usageEventPrefix, collectionName, eventEmitter)

        super._getDb().then((db) => {
            db.createCollection(collectionName, { timeseries: { timeField, metaField, granularity } })
        })
    }

    get usageEventPrefix() {
        return `simple-timeseries.${this._collectionName}`
    }

    /**
     * @private
     */
    async _withActiveSpan(spanName, resourceIds, callback) {
        return withActiveSpan(`${name}#${spanName}`, { 'peer.service': 'resource-client', resourceIds, resourceName: this._collectionName, databaseName: this._databaseName }, callback)
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
}