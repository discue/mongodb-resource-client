const { PROJECT } = require('./aggregations.js')
const Base = require('./simple-resource-storage.js')
const { Timestamp } = require('mongodb')

/**
 * @name ConstructorOptions
 * @typedef ConstructorOptions
 * @description Options for class constructor
 * @property {String} [url=null] url to mongo instance. Can be null if client is set
 * @property {MongoClient} [client=null] configured mongo client to use. Can be null if url is set
 * @property {string} [databaseName=default] name of the mongodb database
 * @property {string} collectionName name of the mongodb collection used to store the resources
 * @property {string} resourceName name of the resource e.g. users, customers, topics, shipments
 * 
 * @example
 * const { OneToFewResourceStorage } = require('./@discue/mongodb-resource-client')
 * const oneToFewResourceStorage = new OneToFewResourceStorage({
 *   url: 'mongodb://127.0.0.1:27017',
 *   collectionName: 'api_clients',
 *   resourceName: 'queues'
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
 * @typedef {import('mongodb').MongoClient} MongoClient
 */

/**
 * Allows to manage a list of documents in another document to e.g. store a list of
 * students of each school. As the child documents will be embedded, it is easy
 * to retrieve them (only one query), but harder to get all students across e.g.
 * a country in various schools.
 * 
 * <strong>Universities collection</strong>
 * ```json
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
module.exports = class extends Base {

    /**
     * @public
     * @param {ConstructorOptions} options 
     */
    constructor(options) {
        super(options)

        this._resourceName = options.resourceName
    }

    /**
     * Returns a resource by ids.
     * 
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {GetOptions} options
     * @returns {Promise.<Object>}
     */
    async get(resourceIds, { withMetadata = false, projection } = {}) {
        const collection = await this._getCollection()
        const aggregationStages = [
            {
                $match: {
                    id: resourceIds.at(0)
                },
            },
            { $unwind: `$${this._resourceName}` },
            {
                $match: {
                    [`${this._resourceName}.id`]: resourceIds.at(1)
                },
            },
            { $replaceRoot: { newRoot: `$${this._resourceName}` } }
        ]

        if (!withMetadata) {
            aggregationStages.push({
                $project: {
                    _meta_data: 0
                }
            })
        }

        if (projection) {
            aggregationStages.push(PROJECT(projection))
        }

        const cursor = await collection.aggregate(aggregationStages)
        return cursor.next()
    }

    /**
     * Returns all resources.
     * 
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {GetOptions} options
     * @returns {Promise.<Array.<Object>>}
     */
    async getAll(resourceIds, { withMetadata = false, projection } = {}) {
        const collection = await this._getCollection()
        const aggregationStages = [
            {
                $match: {
                    id: resourceIds.at(0)
                },
            },
            { $unwind: `$${this._resourceName}` },
            { $replaceRoot: { newRoot: `$${this._resourceName}` } }
        ]

        if (!withMetadata) {
            aggregationStages.push({
                $project: {
                    _meta_data: 0
                }
            })
        }

        if (projection) {
            aggregationStages.push(PROJECT(projection))
        }

        return collection.aggregate(aggregationStages).toArray()
    }

    /**
     * Add a resource to a collection by ids.
     * 
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {Object} resource the resource to be stored
     * @returns {ObjectId}
     */
    async create(resourceIds, resource) {
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

        return resourceIds.at(-1)
    }

    /**
     * Updates a resource by ids
     * 
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {Object} update values that should be updated
     * @returns {void}
     */
    async update(resourceIds, update) {
        const exists = await this.exists(resourceIds)
        if (!exists) {
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
        }, update)

        const success = result.ok === 1
        if (!success) {
            throw new Error(`Was not able to update ${resourceIds} with resource ${update}.`)
        }
    }

    _createUpdateMetadata() {
        const timestamp = Timestamp.fromNumber(Date.now())
        return {
            [`${this._resourceName}._meta_data.updated_at`]: timestamp
        }
    }

    /**
     * Deletes a resource by ids
     * 
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @returns {void}
     */
    async delete(resourceIds) {
        const exists = await this.exists(resourceIds)
        if (!exists) {
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
        })

        const success = result.ok === 1
        if (!success) {
            throw new Error(`Was not able to delete ${resourceIds}.`)
        }
    }
}