const Base = require('./simple-resource-storage.js')
const OneToFewStorage = require('./one-to-few-ref-storage.js')

/**
 * @name ConstructorOptions
 * @typedef ConstructorOptions
 * @property {String} [url=null] url to mongo instance. Can be null if client is set
 * @property {MongoClient} [client=null] configured mongo client to use. Can be null if url is set
 * @property {string} [databaseName=default] name of the mongodb database
 * @property {string} collectionName name of the mongodb collection used to store the resources
 * @property {string} resourceName name of the resource e.g. users, customers, topics, shipments
 * @property {string} enableTwoWayReferences true if documents should also store references to their parents e.g. student have references to their schools
 * 
 * @example
 * const { OneToManyResourceStorage } = require('./@discue/mongodb-resource-client')
 * const oneToManyResourceStorage = new OneToManyResourceStorage({
 *   url: 'mongodb://127.0.0.1:27017',
 *   collectionName: 'api_clients',
 *   resourceName: 'listeners'
 *   enableTwoWayReferences: true
 * })
 */

/**
 * @private 
 * @typedef {import('mongodb').MongoClient} MongoClient
 */

/**
 * Manages relationships between entities in a more decoupled way by keep storing
 * entities in separate collections and using references to establish an relationship
 * between both. This way students can be queried independently of an university,
 * while all studies of a university can still be looked up via the stored reference.
 * 
 * The references between both collections are kept up-to-date. Deleting a document,
 * causes the reference to be deleted in the other entity. Adding a document
 * causes a reference to be updated, too.
 * 
 * <strong>Students collection</strong>
 * ```json
 * {
 *   id: 1828391,
 *   name: 'Miles Morales',
 * },
 * {
 *   id: 4451515,
 *   name: 'Bryan Jenkins',
 * }
 * ```
 *
 * <strong>Universities collection</strong>
 * ```json
 * {
 *   name: 'University Munich',
 *   students: [1828391]
 * }
 * {
 *   name: 'University Stuttgart',
 *   students: [4451515]
 * }
 * ```
 * 
 * @link as described here: https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design
 * @name OneToManyResourceStorage
 * @class
 */
module.exports = class extends Base {

    /**
     * 
     * @param {ConstructorOptions} options 
     * @returns 
     */
    constructor(options) {
        const baseOptions = Object.assign({}, options)
        baseOptions.collectionName = options.resourceName
        super(baseOptions)

        const hostOptions = Object.assign({}, options)
        this._hostStorage = new OneToFewStorage(hostOptions)

        this._enableTwoWayReferences = options.enableTwoWayReferences
        this._referencePath = options.twoWayReferencePath
    }

    /**
     * Returns true if a resource with given ids exists.
     * 
     * @param {String|Array.<String>} resourceIds 
     * @returns {boolean}
     */
    async exists(resourceIds) {
        const resource = await super.get(resourceIds.slice(1))
        return resource != undefined
    }

    /**
     * Returns a resource by ids.
     * 
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @returns {Object}
     */
    async get(resourceIds) {
        return super.get(resourceIds.slice(1))
    }

    /**
     * Returns all resources.
     * 
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @returns {Array.<Object>}
     */
    async getAll(resourceIds) {
        const references = await this._hostStorage.getAll(resourceIds)
        const collection = await this._getCollection()
        return collection.find({ id: { $in: references } }).toArray()
    }

    /**
     * Add a resource to a collection by ids.
     * 
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {Object} resource the resource to be stored
     * @returns 
     */
    async create(resourceIds, resource) {
        const newId = await super.create(resourceIds.slice(1), resource)
        await this._hostStorage.create(resourceIds, newId)

        if (this._enableTwoWayReferences) {
            await super.update([resourceIds.at(1), newId], {
                [`${this._hostStorage._collectionName}_ref`]: resourceIds.at(0)
            })
        }

        return newId
    }

    /**
     * Updates a resource by ids
     * 
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {Object} update values that should be updated
     * @returns 
     */
    async update(resourceIds, update) {
        const exists = await this.exists(resourceIds)
        if (!exists) {
            throw new Error(`${resourceIds} does not exist.`)
        }
        return super._updateUnsafe(resourceIds.slice(1), update)
    }

    /**
     * Deletes a resource by ids
     * 
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @returns 
     */
    async delete(resourceIds) {
        const exists = await this.exists(resourceIds)
        if (!exists) {
            throw new Error(`${resourceIds} does not exist.`)
        }
        await super._deleteUnsafe(resourceIds.slice(1))
        return this._hostStorage.delete(resourceIds)
    }

    close() {
        return Promise.all([
            this._hostStorage.close(),
            super.close()
        ])
    }
}