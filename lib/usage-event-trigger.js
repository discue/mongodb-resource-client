/**
 * 
 * @param {String} resourceName 
 * @param {import('node:events').EventEmitter} eventEmitter 
 * @returns 
 */
module.exports = (eventPrefix, collectionName, eventEmitter) => {

    return async ({ context, resourceIds, before, after }, callback) => {
        const event = {
            after,
            before,
            collectionName,
            resourceIds,
            error: false
        }
        try {
            if (callback) {
                let result = callback.apply()
                if (result.then) {
                    result = await result
                }
                return result
            }
        } catch (e) {
            event.error = true
            throw e
        } finally {
            if (eventEmitter) {
                eventEmitter.emit(`${eventPrefix}.${context}`, event)
            }
        }
    }
}