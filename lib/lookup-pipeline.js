const { PROJECT, EQUALS, LOOKUP, REDUCE, CONCAT_ARRAYS, TO_OBJECT, LET, APPEND_OBJECTS, JOIN_STRINGS, EQUALS_ALL } = require('./aggregations.js')

/**
 * 
 * @param {object} options
 * @param {string} options.rootId the id of the root object
 * @param {string} options.childCollectionName the collectionName of the child resource
 * @param {Array} options.pipeline an array of other pipelines that should be executed after the lookup
 * @returns {Array}
 */
module.exports.getSingleLookupPipeline = function ({ rootId, childCollectionName, pipeline = [] }) {
    return [
        EQUALS('id', rootId),
        PROJECT({ _id: 0, _meta_data: 0 }),
        LOOKUP({
            pipeline,
            from: childCollectionName,
            localField: childCollectionName,
            as: childCollectionName
        })
    ]
}

/**
 * @name GetOptions
 * @private
 * @typedef GetOptions
 * @property {boolean} withMetadata true if also meta data should be returned
 * @property {Object} projection MongoDB projection object e.g. { id: 0, name: 0 }
 * @property {Object} match MongoDB match object e.g. { id: 0, name: 0 }
 */

/**
 * 
 * @param {object} options
 * @param {string} options.parentCollectionName name of the parent collection
 * @param {string} options.childCollectionName the collectionName of the child resource
 * @param {GetOptions} options.options
 * @returns {Array}
 */
module.exports.joinAndQueryChildResourcesPipeline = function ({ parentCollectionName, childCollectionName, options }) {
    const lookupPipeline = [
        PROJECT({
            _id: 0,
            _meta_data: options.withMetadata ? 1 : 0
        })
    ]

    if (options.match) {
        lookupPipeline.push(EQUALS_ALL(options.match))
    }

    if (options.projection) {
        lookupPipeline.push(PROJECT(options.projection))
    }

    const pipeline = [
        PROJECT({
            _id: 0,
            parent: `$${parentCollectionName}`,
            [childCollectionName]:
                REDUCE({
                    input: `$${parentCollectionName}.${childCollectionName}`,
                    initialValue: [],
                    inExpression: CONCAT_ARRAYS()
                })
        }),
        LOOKUP({
            from: childCollectionName,
            pipeline: lookupPipeline,
            as: 'children',
            localField: childCollectionName,
        }),
        PROJECT({
            children: '$children',
            resource_paths: REDUCE({
                input: `$parent`,
                inExpression: APPEND_OBJECTS(
                    LET({
                        vars: {
                            parent: '$$this.id',
                            children: `$$this.${childCollectionName}`
                        },
                        inExpression: REDUCE({
                            input: '$$children',
                            inExpression:
                                APPEND_OBJECTS(
                                    TO_OBJECT({
                                        value: JOIN_STRINGS('/',
                                            `${parentCollectionName}`,
                                            '$$parent',
                                            `${childCollectionName}`,
                                            '$$this')
                                    }))
                        })
                    })
                )
            })
        })
    ]

    return pipeline
}