/**
 * Returns a $match aggregation stage
 * 
 * @param {String} field the target field name
 * @param {unknown} target the target value
 * @returns {Object} an object containing a MongoDb projection object
 * 
 */
module.exports.EQUALS = (field, target) => {
    return {
        $match: {
            [field]: target
        }
    }
}

/**
 * Returns a $in aggregation stage
 * 
 * @param {String} field the target field name
 * @param {Array} targets the target values
 * @returns {Object} an object containing a MongoDb projection object
 * 
 */
module.exports.EQUALS_ANY_OF = (field, targets) => {
    return {
        $match: {
            [field]: {
                $in: targets
            }
        }
    }
}

/**
 * Returns a $match aggregation stage
 *
 * @param {String} field the target field name
 * @param {unknown} target the target value
 * @returns {Object} an object containing a MongoDb projection object
 * 
 */
module.exports.LESS_THAN = (field, target) => {
    return {
        $match: {
            [field]: {
                $lt: target
            }
        }
    }
}

/**
 * Returns a $match aggregation stage
 * 
 * @param {String} field the target field name
 * @param {unknown} target the target value
 * @returns {Object} an object containing a MongoDb projection object
 * 
 */
module.exports.LESS_THAN_OR_EQUAL = (field, target) => {
    return {
        $match: {
            [field]: {
                $lte: target
            }
        }
    }
}

/**
 * Returns a $match aggregation stage
 * 
 * @param {String} field the target field name
 * @param {unknown} target the target value
 * @returns {Object} an object containing a MongoDb projection object
 * 
 */
module.exports.GREATER_THAN = (field, target) => {
    return {
        $match: {
            [field]: {
                $gt: target
            }
        }
    }
}

/**
 * Returns a $match aggregation stage
 * 
 * @param {String} field the target field name
 * @param {unknown} target the target value
 * @returns {Object} an object containing a MongoDb projection object
 * 
 */
module.exports.GREATER_THAN_OR_EQUAL = (field, target) => {
    return {
        $match: {
            [field]: {
                $gte: target
            }
        }
    }
}

/**
 * Returns a $limit aggregation stage
 * 
 * @param {Number} amount the desired maximum number of elements the query should return
 * @returns {Object} an object containing a MongoDb projection object
 * 
 */
module.exports.LIMIT = (amount) => {
    return {
        $limit: amount
    }
}

/**
 * Returns a $sort aggregation stage
 * 
 * @param {Object} projection
 * @returns {Object} an object containing a MongoDb projection object
 * 
 */
module.exports.PROJECT = (projection) => {
    return {
        $project: projection
    }
}

/**
 * Returns a $sort aggregation stage
 * 
 * @param {...String} field the target field name
 * @returns {Object} an object containing a MongoDb projection object
 * 
 */
module.exports.SORT_BY_ASC = (...field) => {
    return {
        $sort: reduce(field, 1)
    }
}

/**
 * Returns a $sort aggregation stage
 * 
 * @param {...String} field the target field name
 * @returns {Object} an object containing a MongoDb projection object
 * 
 */
module.exports.SORT_BY_DESC = (...field) => {
    return {
        $sort: reduce(field, -1)
    }
}

/**
 * Returns a $sortByCount aggregation stage. Will add required $ prefix to field if missing.
 * 
 * @param {String} field the target field name
 * @returns {Object} an object containing a MongoDb projection object
 * 
 */
module.exports.SORT_BY_COUNT = (field) => {
    return {
        $sortByCount: withLeadingDollar(field)
    }
}

/**
 * Returns a $unwind aggregation stage. Will add required $ prefix to field if missing.
 * 
 * @param {String} field the target field name
 * @returns {Object} an object containing a MongoDb projection object
 * 
 */
module.exports.UNWIND = (field) => {
    return {
        $unwind: withLeadingDollar(field)
    }
}

/**
 * Returns a $count aggregation stage
 * 
 * @returns {Object} an object containing a MongoDb projection object
 * 
 */
module.exports.COUNT = () => {
    return {
        $count: "count"
    }
}

/**
 * @typedef LookupOptions
 * @property {String} from the collection to lookup from
 * @property {String} as name of the merged field
 * @property {String} localField local field name
 * @property {String} foreignField field name of the `from` collection
 * @property {Array} pipeline pipeline for aggregation of the lookup query
 */

/**
 * 
 * @param {LookupOptions} options
 * @returns {Object}
 */
module.exports.LOOKUP = ({ from, as, localField, foreignField = 'id', pipeline = [] }) => {
    return {
        $lookup: {
            from, pipeline, as, localField, foreignField
        }
    }
}

/**
 * @typedef ReduceOptions
 * @property {String} input any expression resolving to an array
 * @property {any} initialValue the initial value used for reduction
 * @property {Object} inExpression any expression applied to each element of the array
 */

/**
 * 
 * @param {ReduceOptions} options
 * @returns {Object}
 */
module.exports.REDUCE = ({ input, initialValue = {}, inExpression }) => {
    return {
        $reduce: {
            input, initialValue, in: inExpression
        }
    }
}

/**
 * Returns a $mergeObjects expression that appends the result of the given expressions to $$value
 * 
 * @param {...any} expressions a list of expressions that evaluate to an object
 * @returns {Object}
 */
module.exports.APPEND_OBJECTS = (...expressions) => {
    return {
        $mergeObjects: ["$$value", ...expressions]
    }
}

/**
 * @typedef LetOptions
 * @property {Object} vars an object defining additional variables for the expression
 * @property {Object} inExpression any expression
 */

/**
 * 
 * @param {LetOptions} options
 * @returns 
 */
module.exports.LET = ({ vars, inExpression }) => {
    return {
        $let: {
            vars, in: inExpression
        }
    }
}

/**
 * @typedef ToObjectOptions
 * @property {String} key the object key
 * @property {Object} expression any expression
 */

/**
 * 
 * @param {ToObjectOptions} options
 * @returns 
 */
module.exports.TO_OBJECT = ({ key = "$$this", value }) => {
    return {
        $arrayToObject: [
            [
                {
                    k: key,
                    v: value
                }
            ]
        ]
    }
}

/**
 * 
 * @param  {...any} strings strings to concat
 * @returns {Object}
 */
module.exports.CONCAT_STRINGS = (...strings) => {
    return {
        $concat: strings
    }
}

/**
 * 
 * @param  {String} separator separator to be used for joining given strings
 * @param  {...any} strings strings to concat
 * @returns {Object}
 */
module.exports.JOIN_STRINGS = (separator, ...strings) => {
    const array = strings.reduce((context, next) => {
        context.push(separator, next)
        return context
    }, [])
    return module.exports.CONCAT_STRINGS.apply(null, array)
}

/**
 * 
 * @returns {Object}
 */
module.exports.CONCAT_ARRAYS = () => {
    return {
        $concatArrays: [
            "$$value",
            "$$this"
        ]
    }
}

/**
 * 
 * @param {String} arrayName name of the array
 * @param {Number} index 
 * @returns {Object}
 */
module.exports.ELEMENT_AT = (arrayName, index) => {
    return {
        $arrayElemAt: [withLeadingDollar(arrayName), index]
    }
}

/**
 * 
 * @param {String} fieldName the field to return as root 
 * @returns {Object}
 */
module.exports.AS_ROOT = (fieldName) => {
    return {
        $replaceRoot: {
            newRoot: withLeadingDollar(fieldName)
        }
    }
}

/**
 * 
 * @param {String} fieldName the field to check for existence
 * @returns 
 */
module.exports.EXISTS = (fieldName) => {
    return {
        $match: { [fieldName]: { $exists: true } }
    }
}

function withLeadingDollar(string) {
    if (!string.startsWith('$')) {
        string = `$${string}`
    }
    return string
}

function reduce(array, value) {
    return array.reduce((context, element) => {
        return Object.assign(context, {
            [element]: value
        })
    }, {})
}