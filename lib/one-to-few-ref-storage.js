const Base = require('./simple-resource-storage.js')

/**
 * @name ConstructorOptions
 * @typedef ConstructorOptions
 * @description Options for class constructor
 * @property {String} url url to mongo instance
 * @property {string} [databaseName=default] name of the mongodb database
 * @property {string} collectionName name of the mongodb collection used to store the resources
 * @property {string} resourceName name of the resource e.g. users, customers, topics, shipments
 * 
 * @example
 * const { OneToFewRefstorage } = require('./@discue/mongodb-resource-client')
 * const onetoFewRefStorage = new OneToFewRefStorage({
 *   url: 'mongodb://127.0.0.1:27017',
 *   collectionName: 'api_clients',
 *   resourceName: 'queues'
 * })
 */

/**
 * @private ObjectId
 * @typedef {import('mongodb').ObjectId} ObjectId
 */

/**
 * Similar to @link OneToFewResourceStorage, but allows only managing of
 * references. Meaning: Instead of embedding objects in the target array
 * this class only stores references to other objects. 
 * 
 * <strong>Universities collection</strong>
 * ```json
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
            _id: resourceIds.at(0),
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
            _id: resourceIds.at(0)
        })

        return parent[`${this._resourceName}`]
    }

    /**
     * Add a reference to a collection by ids.
     * 
     * @method create
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {Object} ref the resource to be stored
     * @returns {Promise.<ObjectId>}
     */
    async create(resourceIds, ref) {
        const exists = await this.exists(resourceIds)

        if (exists) {
            throw new Error(`${resourceIds} already exists. ${JSON.stringify(exists)}`)
        }

        const collection = await this._getCollection()
        const result = await collection.updateOne({
            _id: resourceIds.at(0)
        }, {
            $push: {
                [this._resourceName]: ref
            }
        })

        const success = result.acknowledged === true && result.modifiedCount === 1
        if (!success) {
            throw new Error(`Was not able to insert ${resourceIds} with resource ${ref}`)
        }

        return ref
    }

    /**
     * Delete a reference
     * 
     * @method delete
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @returns {Promise.<void>}
     */
    async delete(resourceIds) {
        const exists = await this.exists(resourceIds)
        if (!exists) {
            throw new Error(`${resourceIds} does not exist.`)
        }

        const collection = await this._getCollection()
        const result = await collection.findOneAndUpdate({
            _id: resourceIds.at(0),
        }, {
            $pull: {
                [`${this._resourceName}`]: resourceIds.at(1)
            }
        })

        const success = result.ok === 1
        if (!success) {
            throw new Error(`Was not able to delete ${resourceIds}.`)
        }
    }
}