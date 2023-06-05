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
 * @param {String} field the target field name
 * @returns {Object} an object containing a MongoDb projection object
 * 
 */
module.exports.SORT_BY_ASC = (field) => {
    return {
        $sort: {
            [field]: 1
        }
    }
}

/**
 * Returns a $sort aggregation stage
 * 
 * @param {String} field the target field name
 * @returns {Object} an object containing a MongoDb projection object
 * 
 */
module.exports.START_AFTER = (field) => {
    return {
        $sort: {
            [field]: 1
        }
    }
}

/**
 * Returns a $sort aggregation stage
 * 
 * @param {String} field the target field name
 * @returns {Object} an object containing a MongoDb projection object
 * 
 */
module.exports.SORT_BY_DESC = (field) => {
    return {
        $sort: {
            [field]: -1
        }
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