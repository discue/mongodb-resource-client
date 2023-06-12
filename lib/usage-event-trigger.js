/**
 * 
 * @param {String} resourceName 
 * @param {import('node:events').EventEmitter} eventEmitter 
 * @returns 
 */
module.exports = (collectionName, eventEmitter) => {

    return async (context, resourceIds, callback) => {
        const event = {
            context,
            collectionName,
            resourceIds,
            error: false
        }
        try {
            let result = callback.apply()
            if (result.then) {
                result = await result
            }
            return result
        } catch (e) {
            event.error = true
            throw e
        } finally {
            if (eventEmitter) {
                eventEmitter.emit(`${collectionName}.${context}`, event)
            }
        }
    }
}