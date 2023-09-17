const ResourceStorage = require('./simple-resource-storage.js')

/**
 * @name ConstructorOptions
 * @typedef ConstructorOptions
 * @property {String} [url=null] url to mongo instance. Can be null if client is set
 * @property {MongoClient} [client=null] configured mongo client to use. Can be null if url is set
 * @property {string} [databaseName=null] name of the mongodb database
 * @property {number} [connectTimeout=10_000] the connect timeout of the mongo db client if client was not passed
 *
 * @example
 * const { ResourceLock } = require('@discue/mongodb-resource-client')
 * 
 * const url = 'mongodb://127.0.0.1:27017'
 * const lock = new ResourceLock({
 *   url
 * })
 * 
 * await lock.doWhileLocked([123], () => {
 *      // do important stuff while lock is being held for 5s by default
 * })
 */

/**
 * Creates lock documents and allows to execute functions with a lock.
 * 
 * @name ResourceLock
 * @class
 */
module.exports = class {

    /**
     * @public
     * @param {ConstructorOptions} options 
     */
    constructor({ url, client, databaseName, connectTimeout = 10_000 } = {}) {

        const collectionName = '_locks'
        this._resourceStorage = new ResourceStorage({ url, client, databaseName, collectionName, connectTimeout })
        this._resourceStorage._getCollection().then(collection => {
            collection.createIndex({ locked_at: 1 }, {
                expireAfterSeconds: 1
            })
        })
    }

    /**
     * Creates an entry in the `locks` collection. The context param is a unique identifier. If context already
     * exists, the method will throw.
     * 
     * @param {Array.<string>} ids the resource ids
     */
    async lock(ids) {
        return this._resourceStorage.create(ids, {
            locked_at: Date.now()
        })
    }

    /**
     * Deletes an entry from the `locks` collection unlocking the document. 
     * The context param is a unique identifier. If context has already been
     * removed, the method will throw.
     * 
     * @param {Array.<string>} ids the resource ids
     */
    async unlock(ids) {
        return this._resourceStorage.delete(ids)
    }

    /**
     * Executes the callback only if the appropriate lock document has been created successfully.
     * Unlocks the document either after completion of the callback or after `lockTimeout` millis
     * have passed. 
     * 
     * @param {Array.<string>} ids the resource ids
     * @param {Function} callback callback to execute with lock
     * @param {Object} options
     * @param {Number} [options.lockTimeout=5_000] max time to wait in milliseconds
     * @param {Number} [options.waitTimeout=5_000] max time to wait in milliseconds
     * @param {Number} [options.retryInterval=125] max time to wait in between retries
     * @throws {Error} Unable to establish lock - if unable to establish lock for a document 
     * @throws {Error} Lock interrupted by timeout - if callback did not return before lockTimeout
     */
    async doWhileLocked(ids, callback, { lockTimeout = 5_000, waitTimeout = 5_000, retryInterval = 125 } = {}) {
        return new Promise((resolve, reject) => {
            let timeout

            // override the callback here. The lock timeout should only start
            // after the lock was established
            this._doWhileLocked(ids, async () => {

                timeout = setTimeout(() => {
                    this.unlock(ids)
                        .finally(() => {
                            reject(new Error('Lock interrupted by timeout'))
                        })
                }, lockTimeout)

                return callback()

            }, { lockTimeout, waitTimeout, retryInterval })
                .then((result) => {
                    clearTimeout(timeout)
                    resolve(result)
                }, (error) => {
                    clearTimeout(timeout)
                    reject(error)
                })
        })
    }

    /**
     * Executes the callback only if the appropriate lock document has been created successfully.
     * Unlocks the document either after completion.
     * 
     * @private
     * @param {Array.<string>} ids the resource ids
     * @param {Function} callback callback to execute with lock
     * @param {Object} options
     * @param {Number} [options.waitTimeout=5_000] max time to wait in milliseconds
     * @param {Number} [options.retryInterval=125] max time to wait in between retries
     * @throws {Error} Unable to establish lock - if unable to establish lock for a document 
     */
    async _doWhileLocked(ids, callback, { waitTimeout = 5_000, retryInterval = 125 } = {}) {
        const locked = await this._ensureIsLocked(ids, { waitTimeout, retryInterval })
        if (!locked) {
            throw new Error('Unable to establish lock.')
        }
        try {
            const result = await callback.call()
            return result
        } finally {
            await this.unlock(ids)
        }
    }


    /**
     * Creates the lock for the given id waiting `waitTimeout` milliseconds and retrying 
     * every `retryInterval` milliseconds.
     * 
     * @private
     * @param {Array.<string>} ids the resource ids
     * @param {Object} options
     * @param {Number} [options.waitTimeout] max time to wait in milliseconds
     * @param {Number} [options.retryInterval] max time to wait in between retries
     * @returns {Promise.<boolean>} 
     */
    async _ensureIsLocked(ids, { waitTimeout, retryInterval }) {
        const start = Date.now()

        while (Date.now() - start <= waitTimeout) {
            try {
                await this.lock(ids)
                return true
            } catch (e) {
                if (!e.message.includes('already exists') && !e.message.includes('duplicate key')) {
                    throw e
                }
                await new Promise((resolve) => setTimeout(resolve, retryInterval))
            }
        }

        return false
    }

    /**
     * Closes the database client.
     * 
     * @method close
     * @returns {void}
     */
    close() {
        return this._resourceStorage.close()
    }
}