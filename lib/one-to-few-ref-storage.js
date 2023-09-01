const { EQUALS_ANY_OF, EQUALS } = require('./aggregations.js')
const Base = require('./simple-resource-storage.js')

/**
 * @name ConstructorOptions
 * @typedef ConstructorOptions
 * @property {String} [url=null] url to mongo instance. Can be null if client is set
 * @property {MongoClient} [client=null] configured mongo client to use. Can be null if url is set
 * @property {string} [databaseName=null] name of the mongodb database
 * @property {string} collectionName name of the mongodb collection used to store the resources
 * @property {string} resourceName name of the resource e.g. users, customers, topics, shipments
 * 
 * @example
 * const { OneToFewRefstorage } = require('@discue/mongodb-resource-client')
 * const onetoFewRefStorage = new OneToFewRefStorage({
 *   url: 'mongodb://127.0.0.1:27017',
 *   collectionName: 'api_clients',
 *   resourceName: 'queues'
 * })
 */

/**
 * @private 
 * @typedef {import('mongodb').ObjectId} ObjectId
 * @typedef {import('mongodb').MongoClient} MongoClient
 */

/**
 * Similar to @link OneToFewResourceStorage, but allows only managing of
 * references. Meaning: Instead of embedding objects in the target array
 * this class only stores references to other objects. 
 * 
 * <strong>Universities collection</strong>
 * ```js
 * {
 *   name: 'University Munich',
 *   students: [1828391, 9440201, 29930302]
 * }
 * {
 *   name: 'University Stuttgart',
 *   students: [551234, 115235, 4451515]
 * }
 * ```
 * 
 * @link https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design
 * @name OneToFewRefStorage
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
     * Returns true if a resource with given ids exists.
     * 
     * @method exists
     * @param {String|Array.<String>} resourceIds 
     * @returns {boolean}
     */
    async exists(resourceIds) {
        const collection = await this._getCollection()
        const parent = await collection.findOne({
            id: resourceIds.at(0),
            [this._resourceName]: {
                $in: [
                    resourceIds.at(1)
                ]
            }
        })

        return parent != null
    }

    /**
     * Returns all references.
     * 
     * @method getAll
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @returns {Array.<Object>}
     */
    async getAll(resourceIds) {
        const collection = await this._getCollection()
        const parent = await collection.findOne({
            id: resourceIds.at(0)
        })

        if (!parent) {
            return []
        }

        return parent[`${this._resourceName}`]
    }

    /**
     * Add a reference to a collection by ids.
     * 
     * @method create
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {Object} ref the resource to be stored
     * @param {import('mongodb').UpdateOptions | WithMongoClient} [options=null]
     * @returns {Promise.<ObjectId>}
     */
    async create(resourceIds, ref, options) {
        const exists = await this.exists(resourceIds)

        if (exists) {
            throw new Error(`${resourceIds} already exists. ${JSON.stringify(exists)}`)
        }

        const collection = await this._getCollection(options?.client)
        const result = await collection.updateOne({
            id: resourceIds.at(0)
        }, {
            $addToSet: {
                [this._resourceName]: ref
            }
        }, this._passSessionIfTransactionEnabled(options))

        const success = result.acknowledged === true && result.matchedCount === 1
        if (!success) {
            throw new Error(`Was not able to insert ${resourceIds} with resource ${ref}`)
        }

        return ref
    }

    /**
        * Delete a reference
        * 
        * @method find
        * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
        * @param {String|Array.<Objecft>} references
        * @returns {Promise.<void>}
        */
    async findReferences(resourceIds, references) {
        const collection = await this._getCollection()

        const stages = [
            EQUALS('id', resourceIds.at(0)),
            EQUALS_ANY_OF(this._resourceName, references)
        ]

        return collection.aggregate(stages).toArray()
    }

    /**
     * Delete a reference
     * 
     * @method delete
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {import('mongodb').FindOneAndUpdateOptions | WithMongoClient} [options=null]
     * @returns {Promise.<void>}
     */
    async delete(resourceIds, options) {
        const exists = await this.exists(resourceIds)
        if (!exists) {
            throw new Error(`${resourceIds} does not exist.`)
        }

        const collection = await this._getCollection(options?.client)
        const result = await collection.findOneAndUpdate({
            id: resourceIds.at(0),
        }, {
            $pull: {
                [`${this._resourceName}`]: resourceIds.at(1)
            }
        }, { includeResultMetadata: true, ...this._passSessionIfTransactionEnabled(options) })

        const success = result.ok === 1
        if (!success) {
            throw new Error(`Was not able to delete ${resourceIds}.`)
        }
    }
}