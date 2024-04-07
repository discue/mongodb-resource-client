'use strict'

/**
 * 
 * @param {import('mongodb').AbstractCursor} cursor 
 * @returns {Promise}
 */
module.exports.toArrayAndClose = async function (cursor) {
    try {
        const array = await cursor.toArray()
        return array
    } finally {
        await cursor.close()
    }
}

/**
 * 
 * @param {import('mongodb').AbstractCursor} cursor 
 * @returns {Promise}
 */
module.exports.getFirstAndClose = async function (cursor) {
    try {
        const first = await cursor.next()
        return first
    } finally {
        await cursor.close()
    }
}