const { PROJECT, EQUALS, LOOKUP } = require('./aggregations.js')

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
            foreignField: 'id',
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
        {
            "$project": {
                "_id": 0,
                "_meta_data": options.withMetadata ? 1 : 0
            }
        }
    ]

    if (options.projection) {
        lookupPipeline.push(PROJECT(options.projection))
    }

    const pipeline = [{
        $project: {
            _id: 0,
            [childCollectionName]: {
                $reduce: {
                    input: `$${parentCollectionName}.${childCollectionName}`,
                    initialValue: [],
                    in: {
                        $concatArrays: [
                            "$$value",
                            "$$this"
                        ]
                    }
                }
            }
        }
    },
    {
        $lookup: {
            from: childCollectionName,
            pipeline: lookupPipeline,
            as: childCollectionName,
            localField: childCollectionName,
            foreignField: "id"
        }
    }]

    return pipeline
}