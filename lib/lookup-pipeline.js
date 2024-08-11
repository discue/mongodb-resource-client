import { APPEND_OBJECTS, CONCAT_ARRAYS, EQUALS, EQUALS_ALL, JOIN_STRINGS, LET, LOOKUP, PROJECT, REDUCE, TO_OBJECT } from './aggregations.js'

export const getSingleLookupPipeline = function ({ rootId, childCollectionName, pipeline = [] }) {
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

export const joinAndQueryChildResourcesPipeline = function ({ parentCollectionName, childCollectionName, options }) {
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
            [childCollectionName]: REDUCE({
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
                inExpression: APPEND_OBJECTS(LET({
                    vars: {
                        parent: '$$this.id',
                        children: `$$this.${childCollectionName}`
                    },
                    inExpression: REDUCE({
                        input: '$$children',
                        inExpression: APPEND_OBJECTS(TO_OBJECT({
                            value: JOIN_STRINGS('/', `${parentCollectionName}`, '$$parent', `${childCollectionName}`, '$$this')
                        }))
                    })
                }))
            })
        })
    ]
    return pipeline
}
