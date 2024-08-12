import * as mongodb from 'mongodb'
import { EQUALS, LIMIT, PROJECT } from './aggregations.js'
import { getFirstAndClose, toArrayAndClose } from './safe-cursor.js'
import Base from './simple-resource-storage.js'

const { Timestamp } = mongodb

/**
 * @name ConstructorOptions
 * @typedef ConstructorOptions
 * @property {MongoClient} client configured mongo client to use. Can be null if url is set
 * @property {string} [databaseName=null] name of the mongodb database
 * @property {string} collectionName name of the mongodb collection used to store the resources
 * @property {string} resourceName name of the resource e.g. users, customers, topics, shipments
 * 
 * @example
 * import { MongoClient } from 'mongodb'
 * import { OneToFewResourceStorage } from '@discue/mongodb-resource-client'
 * 
 * const client = new MongoClient(url, {
 *   serverApi: { version: '1', strict: true, deprecationErrors: true }, // https://www.mongodb.com/docs/manual/reference/stable-api/
 * })
 * 
 * const oneToFewResourceStorage = new OneToFewResourceStorage({
 *   client,
 *   collectionName: 'api_clients',
 *   resourceName: 'queues'
 * })
 */

/**
 * @name GetOptions
 * @typedef GetOptions
 * @property {boolean} withMetadata true if also meta data should be returned
 * @property {Object} projection MongoDB projection object e.g. { id: 0, name: 0 }
 */

/**
 * @private 
 * @typedef {import('mongodb').MongoClient} MongoClient
 */

/**
 * Allows to manage a list of documents in another document to e.g. store a list of
 * students of each school. As the child documents will be embedded, it is easy
 * to retrieve them (only one query), but harder to get all students across e.g.
 * a country in various schools.
 * 
 * <strong>Universities collection</strong>
 * ```js
 * {
 *   name: 'University Munich',
 *   students: [
 *     {
 *        name: 'Stef',
 *        city: 'Munich
 *     },
 *     {
 *         name: 'Frank',
 *        city: 'Stuttgart
 *     }
 *   ]
 * }
 * ```
 * 
 * @name OneToFewResourceStorage
 * @class
 */

export default class extends Base {
    /**
     * @public
     * @param {ConstructorOptions} options
     */
    constructor(options) {
        super(options)
        /** @private */ this._resourceName = options.resourceName
    }

    /**
     * Returns a resource by ids.
     *
     * @name get
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {GetOptions} options
     * @returns {Promise.<Object>}
     */
    async get(resourceIds, { withMetadata = false, projection } = {}) {
        return this._runWithActiveSpan('get-one-to-few-resource-by-id', resourceIds, async () => {
            const collection = await this._getCollection()
            const aggregationStages = [
                EQUALS('id', resourceIds.at(0)),
                LIMIT(1),
                { $unwind: `$${this._resourceName}` },
                EQUALS(`${this._resourceName}.id`, resourceIds.at(1)),
                { $replaceRoot: { newRoot: `$${this._resourceName}` } }
            ]
            if (!withMetadata) {
                aggregationStages.push(PROJECT({ _meta_data: 0 }))
            }
            if (projection) {
                aggregationStages.push(PROJECT(projection))
            }
            const cursor = collection.aggregate(aggregationStages)
            return getFirstAndClose(cursor)
        })
    }

    /**
     * Returns all resources.
     *
     * @name getAll
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {GetOptions} options
     * @returns {Promise.<Array.<Object>>}
     */
    async getAll(resourceIds, { withMetadata = false, projection } = {}) {
        return this._runWithActiveSpan('get-all-one-to-few-resources-by-id', resourceIds, async () => {
            const collection = await this._getCollection()
            const aggregationStages = [
                EQUALS('id', resourceIds.at(0)),
                { $unwind: `$${this._resourceName}` },
                { $replaceRoot: { newRoot: `$${this._resourceName}` } }
            ]
            if (!withMetadata) {
                aggregationStages.push(PROJECT({ _meta_data: 0 }))
            }
            if (projection) {
                aggregationStages.push(PROJECT(projection))
            }
            const cursor = collection.aggregate(aggregationStages)
            return toArrayAndClose(cursor)
        })
    }
    /**
     * Add a resource to a collection by ids.
     *
     * @name create
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {Object} resource the resource to be stored
     * @returns {ObjectId}
     */
    async create(resourceIds, resource) {
        return this._runWithActiveSpan('create-one-to-few-resource-by-id', resourceIds, async () => {
            const exists = await this.exists(resourceIds)
            if (exists) {
                throw new Error(`${resourceIds} already exists. ${JSON.stringify(exists)}`)
            }
            const update = Object.assign({}, resource)
            update.id = resourceIds.at(-1)
            const collection = await this._getCollection()
            const result = await collection.updateOne({
                id: resourceIds.at(0)
            }, {
                $push: {
                    [this._resourceName]: update
                }
            })
            const success = result.acknowledged === true && result.modifiedCount === 1
            if (!success) {
                throw new Error(`Was not able to insert ${resourceIds} with resource ${resource}`)
            }
            this._emitter.emit('create', { after: resource, resourceIds })
            return resourceIds.at(-1)
        })
    }
    /**
     * Updates a resource by ids
     *
     * @name update
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {Object} update values that should be updated
     * @returns {void}
     */
    async update(resourceIds, update) {
        return this._runWithActiveSpan('update-one-to-few-resource-by-id', resourceIds, async () => {
            const beforeResource = await this.get(resourceIds)
            if (!beforeResource) {
                throw new Error(`${resourceIds} does not exist.`)
            }
            const hasAtomicOperator = Object.keys(update).find(key => key.startsWith('$'))
            if (!hasAtomicOperator) {
                update = [{
                    $addFields: Object.assign({}, update, this._createUpdateMetadata())
                }]
            }
            const collection = await this._getCollection()
            const result = await collection.findOneAndUpdate({
                id: resourceIds.at(0),
                [`${this._resourceName}`]: {
                    $elemMatch: {
                        id: resourceIds.at(1)
                    }
                }
            }, update, {
                includeResultMetadata: true
            })
            const success = result.ok === 1
            if (!success) {
                throw new Error(`Was not able to update ${resourceIds} with resource ${update}.`)
            }
            const afterResource = await this.get(resourceIds)
            await this._emitter.emit('update', { before: beforeResource, after: afterResource, resourceIds })
            return result
        })
    }
    /**
     *
     * @private
     */
    _createUpdateMetadata() {
        const timestamp = Timestamp.fromNumber(Date.now())
        return {
            [`${this._resourceName}._meta_data.updated_at`]: timestamp
        }
    }
    /**
     * Deletes a resource by ids
     *
     * @name delete
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @returns {void}
     */
    async delete(resourceIds) {
        return this._runWithActiveSpan('delete-one-to-few-resource-by-id', resourceIds, async () => {
            const resource = await this.get(resourceIds)
            if (!resource) {
                throw new Error(`${resourceIds} does not exist.`)
            }
            const collection = await this._getCollection()
            const result = await collection.findOneAndUpdate({
                id: resourceIds.at(0),
            }, {
                $pull: {
                    [`${this._resourceName}`]: {
                        id: resourceIds.at(1)
                    }
                }
            }, { includeResultMetadata: true })
            const success = result.ok === 1
            if (!success) {
                throw new Error(`Was not able to delete ${resourceIds}.`)
            }
            await this._emitter.emit('delete', { before: resource, resourceIds })
        })
    }
}
