const Base = require('./simple-resource-storage.js')
const OneToFewStorage = require('./one-to-few-ref-storage.js')
const { PROJECT, EQUALS, ELEMENT_AT, LOOKUP, AS_ROOT, EXISTS } = require('./aggregations.js')
const usageEventTrigger = require('./usage-event-trigger.js')
const { createTracer } = require('@discue/open-telemetry-tracing')
const { name } = require('../package.json')

/**
 * @private
 */
const { withActiveSpan } = createTracer({
    filepath: __filename,
    name: 'mongodb-resource-client'
})


/**
 * @name ConstructorOptions
 * @typedef ConstructorOptions
 * @property {String} [url=null] url to mongo instance. Can be null if client is set
 * @property {MongoClient} [client=null] configured mongo client to use. Can be null if url is set
 * @property {string} [databaseName=null] name of the mongodb database
 * @property {string} collectionName name of the mongodb collection used to store the resources
 * @property {string} resourceName name of the resource e.g. users, customers, topics, shipments
 * @property {string} [resourcePath=resourceName] slash separated path describing the hierarchy e.g. universities/teachers/subjects/exams.
 * @property {string} [hiddenResourcePath=null] slash separated path describing which path elements should not be returned to callers
 * @property {string} enableTwoWayReferences true if documents should also store references to their parents e.g. student have references to their schools
 * @property {import('node:events').EventEmitter} eventEmitter if provided, will trigger events base on resource creation, updates and deletion
 * 
 * @example
 * const { OneToManyResourceStorage } = require('@discue/mongodb-resource-client')
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
 * @property {boolean} addDocumentPath true if $path propety should be added to documents e.g. `$path=/countries/1/cities/2/companies`
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
 * ```js
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
 * ```js
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
        baseOptions.eventEmitter = null
        super(baseOptions)

        const hostOptions = Object.assign({}, options)
        this._hostStorage = new OneToFewStorage(hostOptions)

        this._enableTwoWayReferences = options.enableTwoWayReferences
        this._resourceName = options.resourceName
        this._referencePath = options.twoWayReferencePath
        this._resourcePath = (options.resourcePath || options.collectionName).split('/').filter(s => s)
        this._parentResource = this._resourcePath.at(-1)
        this._hiddenResourcePath = options.hiddenResourcePath || ''
        this._resourceLevel = this._resourcePath.length

        this._emitUsageEventEnabled = options.eventEmitter != null
        this._childEmitUsageEvent = usageEventTrigger(this.usageEventPrefix, options.resourceName, options.eventEmitter)
    }

    get usageEventPrefix() {
        return `one-to-many-resource.${this._resourceName}`
    }

    /**
     * Returns true if a resource with given ids exists.
     * 
     * @name exists
     * @param {String|Array.<String>} resourceIds 
     * @returns {boolean}
     */
    async exists(resourceIds) {
        return withActiveSpan(`${name}#exists-one-to-many-resource-by-id`, { resourceIds, resourceName: this._collectionName, databaseName: this._databaseName }, async () => {
            const resource = await this.get(resourceIds)
            return resource != null
        })
    }

    /**
     * Returns a resource by ids.
     * 
     * @name get
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {GetOptions} options
     * @returns {Object}
     */
    async get(resourceIds, options) {
        return withActiveSpan(`${name}#get-one-to-many-resource-by-id`, { "peer.service": "resource-client", resourceIds, resourceName: this._collectionName, databaseName: this._databaseName }, async () => {
            return this._getUnsafe(resourceIds, options)
        })
    }

    /**
     * Returns a resource without safety checks and tracing
     * 
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {GetOptions} options
     * @returns {Object}
     */
    async _getUnsafe(resourceIds, { withMetadata = false, projection } = {}) {
        const collection = await this._getCollection(this._parentResource)
        const aggregationStages = [
            EQUALS('id', resourceIds.at(-2)),
            LOOKUP({
                pipeline: [
                    EQUALS('id', resourceIds.at(-1))
                ],
                from: this._resourceName,
                localField: this._resourceName,
                foreignField: 'id',
                as: this._resourceName
            }),
            PROJECT({
                resource: ELEMENT_AT(this._resourceName, 0)
            }),
            EXISTS('resource'),
            AS_ROOT('resource')
        ]

        if (!withMetadata) {
            aggregationStages.push(PROJECT({ _id: 0, _meta_data: 0 }))
        } else {
            aggregationStages.push(PROJECT({ _id: 0 }))
        }

        if (projection) {
            aggregationStages.push(PROJECT(projection))
        }

        const result = await collection.aggregate(aggregationStages)
        const array = await result.toArray()

        return array.at(0) ?? null
    }

    _getResourceIdsForHostStorage(resourceIds) {
        return resourceIds.slice(this._resourceLevel - 1)
    }

    /**
     * Returns resources based on return value of {@link findReferences}.
     * 
     * @name getAll
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {GetOptions} options
     */
    async getAll(resourceIds, { withMetadata = false, addDocumentPath, projection } = {}) {
        return withActiveSpan(`${name}#get-all-one-to-many-resources-by-id`, { resourceIds, resourceName: this._collectionName, databaseName: this._databaseName }, async () => {
            const collection = await this._getCollection(this._parentResource)
            const currentQueueAggregrations = []
            if (!withMetadata) {
                currentQueueAggregrations.push(PROJECT({ _id: 0, _meta_data: 0 }))
            } else {
                currentQueueAggregrations.push(PROJECT({ _id: 0 }))
            }

            if (projection) {
                currentQueueAggregrations.push(PROJECT(projection))
            }
            const aggregationStages = [
                EQUALS('id', resourceIds.at(-1)),
                LOOKUP({
                    pipeline: currentQueueAggregrations,
                    from: this._resourceName,
                    localField: this._resourceName,
                    foreignField: 'id',
                    as: 'resources'
                }),
                PROJECT({ 'resources': 1 })
            ]

            const result = await collection.aggregate(aggregationStages)
            const [results] = await result.toArray()
            if (!results?.resources?.length) {
                return []
            }
            const { resources } = results

            if (addDocumentPath) {
                resources.forEach((result) => {
                    const { id } = result

                    // not ideal but right now lets only support one reference per document
                    // refsArray.forEach((refs) => {
                    const path = this._resourcePath.reduce((context, path, index) => {
                        if (!this._hiddenResourcePath.includes(path)) {
                            context.push(path, resourceIds.at(index))
                        }
                        return context
                        // }, [])
                    }, [''])
                    path.push(this._resourceName, id)
                    result.$path = path.join('/')
                })
            }

            return resources
        })
    }

    /**
     * Add a resource to a collection by ids.
     * 
     * @name create
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {Object} resource the resource to be stored
     * @returns 
     */
    async create(resourceIds, resource) {
        return withActiveSpan(`${name}#create-one-to-many-resource-by-id`, { resourceIds, resourceName: this._collectionName, databaseName: this._databaseName }, async () => {
            return this._withTransaction(async (session, client) => {
                const newId = await super.create(resourceIds.slice(-1), resource, { session, client })
                await this._hostStorage.create(this._getResourceIdsForHostStorage(resourceIds), newId, { session, client })

                if (this._enableTwoWayReferences) {
                    await this._updateUnsafe(newId, {
                        [`${this._hostStorage._collectionName}_ref`]: resourceIds.at(-2)
                    }, { session, client })
                }

                await session.commitTransaction()
                await this._childEmitUsageEvent({ context: 'create', after: resource, resourceIds })

                return newId
            })
        })
    }

    /**
     * Updates a resource by ids
     * 
     * @name update
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @param {Object} update values that should be updated
     * @returns 
     */
    async update(resourceIds, update) {
        return withActiveSpan(`${name}#update-one-to-many-resource-by-id`, { resourceIds, resourceName: this._collectionName, databaseName: this._databaseName }, async () => {
            return this._withTransaction(async (session, client) => {
                const resource = await this.get(resourceIds)
                if (!resource) {
                    throw new Error(`${resourceIds} does not exist.`)
                }

                const updateResult = await this._updateUnsafe(resourceIds.slice(-1), update, { session, client })
                await session.commitTransaction()

                if (this._emitUsageEventEnabled) {
                    const newResource = await this.get(resourceIds)
                    await this._childEmitUsageEvent({ context: 'update', before: resource, after: newResource, resourceIds })
                }

                return updateResult
            })
        })
    }

    /**
     * Deletes a resource by ids
     * 
     * @name delete
     * @param {String|Array.<String>} resourceIds resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
     * @returns 
     */
    async delete(resourceIds) {
        return withActiveSpan(`${name}#delete-one-to-many-resource-by-id`, { resourceIds, resourceName: this._collectionName, databaseName: this._databaseName }, async () => {
            return this._withTransaction(async (session, client) => {
                const resource = await this.get(resourceIds)
                if (!resource) {
                    throw new Error(`${resourceIds} does not exist.`)
                }

                const deleteResult = await this._hostStorage.delete(this._getResourceIdsForHostStorage(resourceIds), { session, client })
                await this._deleteUnsafe(resourceIds.slice(-1), resource, { session, client })
                await session.commitTransaction()

                await this._childEmitUsageEvent({ context: 'delete', before: resource, resourceIds })

                return deleteResult
            })
        })
    }

    /**
     * Closes all clients.
     * 
     * @returns {Promise.<void>}
     */
    close() {
        return Promise.all([
            this._hostStorage.close(),
            super.close()
        ])
    }
}