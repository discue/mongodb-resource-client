/**
 *
 * @param {string} string
 * @returns {string}
 */
function withLeadingDollar(string) {
    if (!string.startsWith('$')) {
        string = `$${string}`;
    }
    return string;
}

function reduce(array, value) {
    return array.reduce((context, element) => {
        return Object.assign(context, {
            [element]: value
        });
    }, {});
}

/**
 * @typedef Match
 * @property {object} $match
 */

/**
 * 
 * @param {string} field the name of the field
 * @param {string} target the target value
 * @returns {Match}
 */
export const EQUALS = (field, target) => {
    return {
        $match: {
            [field]: { $eq: target }
        }
    };
};

/**
 * 
 * @param {object} object an object containing they key value pairs to query for
 * @param {object} [options] options
 * @param {prefix} options.target a prefix to add to all keys
 * @returns {Match}
 */
export const EQUALS_ALL = (object, { prefix } = {}) => {
    const keyPrefix = prefix ? `${prefix}.` : '';
    const query = Object.entries(object).reduce((context, [key, value]) => {
        context[`${keyPrefix}${key}`] = { $eq: value };
        return context;
    }, {});
    return { $match: query };
};

/**
 * 
 * @param {string} field the name of the field
 * @param {Array} targets the target value
 * @returns {Match}
 */
export const EQUALS_ANY_OF = (field, targets) => {
    return {
        $match: {
            [field]: {
                $in: targets
            }
        }
    };
};

/**
 * 
 * @returns {Match}
 */
export const EQUALS_WILDCARD = () => {
    return {
        $match: { _id: { $exists: true } }
    };
};

/**
 * 
 * @param {string} field the name of the field
 * @param {string} target the target value
 * @returns {Match}
 */
export const LESS_THAN = (field, target) => {
    return {
        $match: {
            [field]: {
                $lt: target
            }
        }
    };
};

/**
 * 
 * @param {string} field the name of the field
 * @param {string} target the target value
 * @returns {Match}
 */
export const LESS_THAN_OR_EQUAL = (field, target) => {
    return {
        $match: {
            [field]: {
                $lte: target
            }
        }
    };
};

/**
 * 
 * @param {string} field the name of the field
 * @param {string} target the target value
 * @returns {Match}
 */
export const GREATER_THAN = (field, target) => {
    return {
        $match: {
            [field]: {
                $gt: target
            }
        }
    };
};

/**
 * 
 * @param {string} field the name of the field
 * @param {string} target the target value
 * @returns {Match}
 */
export const GREATER_THAN_OR_EQUAL = (field, target) => {
    return {
        $match: {
            [field]: {
                $gte: target
            }
        }
    };
};

/**
 * @typedef Limit
 * @property {object} $limit
 */

/**
 * 
 * @param {number} amount the amount of documents to return
 * @returns {Limit}
 */
export const LIMIT = (amount) => {
    return {
        $limit: amount
    };
};

/**
 * @typedef Projection
 * @property {object} $limit
 */

/**
 * 
 * @param {object} projection the projection object
 * @returns {Projection}
 */
export const PROJECT = (projection) => {
    return {
        $project: projection
    };
};

/**
 * @typedef Sort
 * @property {object} $sort
 */

/**
 * 
 * @param  {...string} field 
 * @returns {Sort}
 */
export const SORT_BY_ASC = (...field) => {
    return {
        $sort: reduce(field, 1)
    };
};

/**
 * 
 * @param  {...string} field 
 * @returns {Sort}
 */
export const SORT_BY_DESC = (...field) => {
    return {
        $sort: reduce(field, -1)
    };
};

/**
 * @typedef SortByCount
 * @property {object} $sortByCount
 */

/**
 * 
 * @param {string} field 
 * @returns {SortByCount}
 */
export const SORT_BY_COUNT = (field) => {
    return {
        $sortByCount: withLeadingDollar(field)
    };
};

/**
 * @typedef Unwind
 * @property {object} $unwind
 */

/**
 * 
 * @param {string} field 
 * @returns {Unwind}
 */
export const UNWIND = (field) => {
    return {
        $unwind: withLeadingDollar(field)
    };
};

/**
 * @typedef Count
 * @property {object} $count
 */

/**
 * 
 * @returns {Count}
 */
export const COUNT = () => {
    return {
        $count: 'count'
    };
};

/**
 * @typedef Lookup
 * @property {object} $lookup
 */

/**
 * @typedef LookupOptions
 * @property {string} from the collection to lookup from
 * @property {string} as name of the merged field
 * @property {string} localField local field name
 * @property {string} foreignField field name of the `from` collection
 * @property {Array} pipeline pipeline for  of the lookup query
 */

/**
 * 
 * @param {LookupOptions} options
 * @returns {Lookup}
 */
export const LOOKUP = ({ from, as, localField, foreignField = 'id', pipeline = [] }) => {
    return {
        $lookup: {
            from, pipeline, as, localField, foreignField
        }
    };
};

/**
 * @typedef Reduce
 * @property {object} $reduce
 */

/**
 * @typedef ReduceOptions
 * @property {string} input any expression resolving to an array
 * @property {any} initialValue the initial value used for reduction
 * @property {object} inExpression any expression applied to each element of the array
 */

/**
 * 
 * @param {ReduceOptions} options
 * @returns {Reduce}
 */
export const REDUCE = ({ input, initialValue = {}, inExpression }) => {
    return {
        $reduce: {
            input, initialValue, in: inExpression
        }
    };
};

/**
 * @typedef AppendObjects
 * @property {object} mergeObjects
 */

/**
 * Returns a $mergeObjects expression that appends the result of the given expressions to $$value
 * 
 * @param {...any} expressions a list of expressions that evaluate to an object
 * @returns {AppendObjects}
 */
export const APPEND_OBJECTS = (...expressions) => {
    return {
        $mergeObjects: ['$$value', ...expressions]
    };
};

/**
 * @typedef Let 
 * @property {object} $let
 */

/**
 * @typedef LetOptions
 * @property {object} vars an object defining additional variables for the expression
 * @property {object} inExpression any expression
 */

/**
 * 
 * @param {LetOptions} options
 * @returns {Let}
 */
export const LET = ({ vars, inExpression }) => {
    return {
        $let: {
            vars, in: inExpression
        }
    };
};

/**
 * @typedef ToObject
 * @property {object} arrayToObject
 */

/**
 * @typedef ToObjectOptions
 * @property {string} key the object key
 * @property {object} expression any expression
 */

/**
 * 
 * @param {ToObjectOptions} options
 * @returns {ToObject}
 */
export const TO_OBJECT = ({ key = '$$this', value }) => {
    return {
        $arrayToObject: [
            [
                {
                    k: key,
                    v: value
                }
            ]
        ]
    };
};

/**
 * @typedef Concat
 * @property {object} $concat
 */

/**
 * 
 * @param  {...strings} strings strings to concat
 * @returns {Concat}
 */
export const CONCAT_STRINGS = (...strings) => {
    return {
        $concat: strings
    };
};


/**
 * 
 * @param  {string} separator separator to be used for joining given strings
 * @param  {...string} strings strings to concat
 * @returns {Concat}
 */
export const JOIN_STRINGS = (separator, ...strings) => {
    const array = strings.reduce((context, next) => {
        context.push(separator, next);
        return context;
    }, []);
    return CONCAT_STRINGS.apply(null, array);
};

/**
 * @typedef ConcatArray
 * @property {Array.<string>} $concatArrays
 */

/**
 * 
 * @returns {ConcatArray}
 */
export const CONCAT_ARRAYS = () => {
    return {
        $concatArrays: [
            '$$value',
            '$$this'
        ]
    };
};

/**
 * @typdef ArrayElementAt
 * @property {Array.<string>} $arrayElemAt
 */

/**
 * 
 * @param {String} arrayName name of the array
 * @param {Number} index 
 * @returns {ArrayElementAt}
 */
export const ELEMENT_AT = (arrayName, index) => {
    return {
        $arrayElemAt: [withLeadingDollar(arrayName), index]
    };
};

/**
 * @typedef ReplaceRoot
 * @property {object} $replaceRoot
 * @property {string} $replaceRoot.newRoot
 */

/**
 * 
 * @param {String} fieldName the field to return as root 
 * @returns {ReplaceRoot}
 */
export const AS_ROOT = (fieldName) => {
    return {
        $replaceRoot: {
            newRoot: withLeadingDollar(fieldName)
        }
    };
};

/**
 * 
 * @param {string} fieldName the target fieldname
 * @returns {Match}
 */
export const EXISTS = (fieldName) => {
    return {
        $match: { [fieldName]: { $exists: true } }
    };
};

/**
 * @typedef Set
 * @property {object} $set
 */

/**
 * 
 * @param {string} fieldName the target fieldname
 * @returns {Set}
 */
export const TO_LONG = (fieldname) => {
    return {
        $set: {
            [fieldname]: {
                $toLong: withLeadingDollar(fieldname)
            }
        }
    };
};

/**
 * @typedef DateTrunc
 * @property {object} $dateTrunc
 */

/**
 * 
 * @param {string} fieldname 
 * @param {object} options
 * @param {string} options.unit e.g. day, month, quarter, year.
 * @param {number} [options.binSize=1] specifies the amount units
 * @param {string} [options.timezone=Europe/Berlin] 
 * @param {string} [options.startOfWeek=monday] 
 * @see https://www.mongodb.com/docs/manual/reference/operator//dateTrunc/
 * @returns {DateTrunc}
 */
export const DATE_TRUNC = (fieldname, { unit, timezone = 'Europe/Berlin', binSize = 1, startOfWeek = 'monday' }) => {
    return {
        $dateTrunc: {
            date: withLeadingDollar(fieldname),
            unit, timezone, binSize, startOfWeek
        }
    };
};

/**
 * @typedef IndexStats
 * @property {object} $indexStats
 */

/**
 * 
 * @returns {IndexStats}
 */
export const INDEX_STATS = () => {
    return {
        '$indexStats': {}
    };
};