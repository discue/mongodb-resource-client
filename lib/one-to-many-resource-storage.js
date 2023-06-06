const Base = require('./simple-resource-storage.js')
const OneToFewStorage = require('./one-to-few-ref-storage.js')
const { PROJECT, EQUALS, EQUALS_ANY_OF } = require('./aggregations.js')

/**
 * @name ConstructorOptions
 * @typedef ConstructorOptions
 * @property {String} [url=null] url to mongo instance. Can be null if client is set
 * @property {MongoClient} [client=null] configured mongo client to use. Can be null if url is set
 * @property {string} [databaseName=default] name of the mongodb database
 * @property {string} collectionName name of the mongodb collection used to store the resources
 * @property {string} resourceName name of the resource e.g. users, customers, topics, shipments
 * @property {string} [resourcePath=resourceName] slash separated path describing the hierarchy e.g. universities/teachers/subjects/exams.
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
        this._resourceName = options.resourceName
        this._referencePath = options.twoWayReferencePath
        this._resourcePath = (options.resourcePath || options.collectionName).split('/').filter(s => s)
        this._resourceLevel = this._resourcePath.length
    }

    /**
     * Returns true if a resource with given ids exists.
     * 
     * @param {String|Array.<String>} resourceIds 
     * @returns {boolean}
     */
    async exists(resourceIds) {
        const resource = await this.get(resourceIds)
        return resource != null
    }

    /**
     * Returns a resource by ids.
     * 
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {GetOptions} options
     * @returns {Object}
     */
    async get(resourceIds, options) {
        const resource = await super.get(resourceIds.slice(-1), options)
        if (resource != null) {
            const hasRefs = await this._verifyReferencesUntilRootObject(resourceIds)
            if (hasRefs) {
                return resource
            }
        }

        return null
    }

    async _verifyReferencesUntilRootObject(resourceIds) {
        let childResourceName = this._resourceName
        for (let i = resourceIds.length, n = 1; i > n; i--) {
            const parentName = this._resourcePath.at(i - 2)
            const parentId = resourceIds.at(i - 2)
            const childId = resourceIds.at(i - 1)

            const hasReference = await this._verifyReferences(parentName, parentId, childResourceName, childId)
            if (hasReference !== true) {
                console.warn(`Unable to establish relationship between ${parentName}#${parentId} and ${childResourceName}#${childId}`)
                return false
            }

            childResourceName = parentName
        }

        return true
    }

    async _verifyReferences(collectionName, parentId, childResourceName, childId) {
        const collection = await this._getCollection(collectionName)

        const stages = [
            EQUALS('id', parentId),
            EQUALS_ANY_OF(childResourceName, [childId])
        ]

        const results = await collection.aggregate(stages).toArray()
        return results.length > 0
    }

    _getResourceIdsForHostStorage(resourceIds) {
        return resourceIds.slice(this._resourceLevel - 1)
    }

    /**
     * Returns all resources.
     * 
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {GetOptions} options
     */
    async getAll(resourceIds, { withMetadata = false, projection } = {}) {
        const references = await this._hostStorage.getAll(this._getResourceIdsForHostStorage(resourceIds))
        const collection = await this._getCollection()

        const aggregationStages = [
            {
                $match: {
                    id: {
                        $in: references
                    }
                }
            }
        ]

        if (!withMetadata) {
            aggregationStages.push({
                $project: { _id: 0, _meta_data: 0 }
            })
        } else {
            aggregationStages.push({
                $project: { _id: 0 }
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
     * @returns 
     */
    async create(resourceIds, resource) {
        const newId = await super.create(resourceIds.slice(-1), resource)
        await this._hostStorage.create(this._getResourceIdsForHostStorage(resourceIds), newId)

        if (this._enableTwoWayReferences) {
            await super._updateUnsafe([resourceIds.at(1), newId], {
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
        return super._updateUnsafe(resourceIds.slice(-1), update)
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
        await super._deleteUnsafe(resourceIds.slice(-1))
        return this._hostStorage.delete(this._getResourceIdsForHostStorage(resourceIds))
    }

    close() {
        return Promise.all([
            this._hostStorage.close(),
            super.close()
        ])
    }
}