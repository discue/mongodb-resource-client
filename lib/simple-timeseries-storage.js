import BaseStorage from './base-storage.js'
import { toArrayAndClose } from './safe-cursor.js'


/**
 * @typedef ConstructorOptions
 * @name ConstructorOptions
 * @property {MongoClient} client configured mongo client to use. Can be null if url is set
 * @property {string} [databaseName=null] name of the mongodb database
 * @property {string} collectionName name of the mongodb collection used to store the resources
 * @property {Array.<object>} [indexes=null] indexes to be created on instantiation. Use format {key:1} for single indexes and {key1: 1, key:2} for compound indexes. See https://www.mongodb.com/docs/manual/reference/command/createIndexes/#command-fields
 * @example
 * import { MongoClient } from 'mongodb'
 * import { SimpleTimeseriesStorage } from '@discue/mongodb-resource-client'
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
 * @typedef GetOptions
 * @name GetOptions
 * @property {boolean} withMetadata true if also meta data should be returned
 * @property {object} projection MongoDB projection object e.g. { id: 0, name: 0 }
 * @private
 */

/**
 * @typedef {import('mongodb').Collection} Collection
 * @typedef {import('mongodb').MongoClient} MongoClient
 * @private
 */

/**
 * Simple resource class that allows appending to Timeseries
 * 
 * @name SimpleTimeseriesStorage
 * @class
 */

export default class extends BaseStorage {
    /**
     * @param {ConstructorOptions} options
     * @returns
     * @public
     */
    constructor({ client, databaseName, collectionName, timeseries: { timeField = 'timestamp', metaField = 'metadata', granularity = 'seconds' } = {} } = {}) {
        super({ client, databaseName, collectionName })
        /** @private */ this._timeField = timeField

        super._getDb().then((db) => {
            db.createCollection(collectionName, { timeseries: { timeField, metaField, granularity } }).catch(() => { })
        })
    }

    /**
     * Returns all resources that pass the given aggregation stages.
     *
     * @function find
     * @param {Array.<object>} [aggregations=[]] a list of valid aggregation objects
     * @returns {Array.<object>}
     * @see {@link README_AGGREGATIONS.md}
     */
    async find(aggregations = []) {
        return this._runWithActiveSpan('find-timeseries-data', { resourceName: this._collectionName, databaseName: this._databaseName }, async () => {
            const collection = await super._getCollection()
            const cursor = collection.aggregate(aggregations)
            return toArrayAndClose(cursor)
        })
    }
    /**
     * Adds a resource to the timeseries.
     *
     * @function create
     * @param {object} resource the resource to be stored. If timeField is missing, current timestamp will be added
     * @param {import('mongodb').InsertOneOptions} [options=null]
     * @returns
     */
    async create(resource, options) {
        return this._runWithActiveSpan('add-timeseries-data', null, async () => {
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
