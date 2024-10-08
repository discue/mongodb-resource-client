import SpanStatusCode from '@discue/open-telemetry-tracing/status-codes'
import ResourceStorage from './simple-resource-storage.js'
import { withActiveSpan } from './tracer.js'


/**
 * @typedef ConstructorOptions
 * @name ConstructorOptions
 * @property {import('mongodb').MongoClient} client configured mongo client to use. Can be null if url is set
 * @property {string} [databaseName=null] name of the mongodb database
 * @property {number} [connectTimeout=10_000] the connect timeout of the mongo db client if client was not passed
 * @example
 * import { MongoClient } from 'mongodb'
 * import { ResourceLock } from '@discue/mongodb-resource-client'
 * 
 * const client = new MongoClient(url, {
 *   serverApi: { version: '1', strict: true, deprecationErrors: true }, // https://www.mongodb.com/docs/manual/reference/stable-api/
 * })
 *
 * const lock = new ResourceLock({
 *   client
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

export default class {
    /**
     * @param {ConstructorOptions} options
     * @public
     */
    constructor({ client, databaseName, connectTimeout = 10_000 } = {}) {
        const collectionName = '_locks'
        this._resourceStorage = new ResourceStorage({ client, databaseName, collectionName, connectTimeout })
        this._resourceStorage._getCollection().then(collection => {
            collection.createIndex({ locked_at: 1 }, {
                expireAfterSeconds: 1
            })
        }).catch((e) => {
            console.error(`[mongodb-resource-client] Unable to create index for collection ${collectionName} in db ${databaseName}`, e)
        })
    }
    /**
     * Creates an entry in the `locks` collection. The context param is a unique identifier. If context already
     * exists, the method will throw.
     *
     * @name lock
     * @param {Array.<string>} resourceIds the resource ids
     */
    async lock(resourceIds) {
        return withActiveSpan(`lock-resource`, { resourceIds }, async () => {
            return this._resourceStorage.create(resourceIds, {
                locked_at: Date.now()
            })
        })
    }
    /**
     * Deletes an entry from the `locks` collection unlocking the document.
     * The context param is a unique identifier. If context has already been
     * removed, the method will throw.
     *
     * @name unlock
     * @param {Array.<string>} resourceIds the resource ids
     */
    async unlock(resourceIds) {
        return withActiveSpan(`unlock-resource`, { resourceIds }, async () => {
            return this._resourceStorage._deleteUnsafe(resourceIds)
        })
    }
    /**
     * Executes the callback only if the appropriate lock document has been created successfully.
     * Unlocks the document either after completion of the callback or after `lockTimeout` millis
     * have passed.
     *
     * @name doWhileLocked
     * @param {Array.<string>} resourceIds the resource ids
     * @param {Function} callback callback to execute with lock
     * @param {object} options
     * @param {number} [options.lockTimeout=5_000] max time to wait in milliseconds
     * @param {number} [options.waitTimeout=5_000] max time to wait in milliseconds
     * @param {number} [options.retryInterval=125] max time to wait in between retries
     * @throws {Error} Unable to establish lock - if unable to establish lock for a document
     * @throws {Error} Lock interrupted by timeout - if callback did not return before lockTimeout
     */
    async doWhileLocked(resourceIds, callback, { lockTimeout = 5_000, waitTimeout = 5_000, retryInterval = 125 } = {}) {
        return withActiveSpan(`do-while-resource-locked`, { resourceIds, lockTimeout, waitTimeout, retryInterval }, async (span) => {
            return new Promise((resolve, reject) => {
                let timeout
                // override the callback here. The lock timeout should only start
                // after the lock was established
                this._doWhileLocked(resourceIds, span, async () => {
                    timeout = setTimeout(() => {
                        this.unlock(resourceIds)
                            .finally(() => {
                                span.addEvent('Timeout waiting for lock')
                                reject(new Error('Lock interrupted by timeout'))
                            })
                    }, lockTimeout)
                    return callback()
                }, { lockTimeout, waitTimeout, retryInterval })
                    .then((result) => {
                        clearTimeout(timeout)
                        resolve(result)
                    }, (error) => {
                        span.addEvent('Unable to aquire lock')
                            .setStatus(SpanStatusCode.ERROR)
                        clearTimeout(timeout)
                        reject(error)
                    })
            })
        })
    }
    /**
     * Executes the callback only if the appropriate lock document has been created successfully.
     * Unlocks the document either after completion.
     *
     * @param {Array.<string>} ids the resource ids
     * @param {any} span
     * @param {Function} callback callback to execute with lock
     * @param {object} options
     * @param {number} [options.waitTimeout=5_000] max time to wait in milliseconds
     * @param {number} [options.retryInterval=125] max time to wait in between retries
     * @throws {Error} Unable to establish lock - if unable to establish lock for a document
     * @private
     */
    async _doWhileLocked(ids, span, callback, { waitTimeout = 5_000, retryInterval = 125 } = {}) {
        const locked = await this._ensureIsLocked(ids, span, { waitTimeout, retryInterval })
        if (!locked) {
            throw new Error('Unable to establish lock.')
        }
        try {
            const result = await callback.call()
            return result
        }
        finally {
            await this.unlock(ids)
        }
    }
    /**
     * Creates the lock for the given id waiting `waitTimeout` milliseconds and retrying
     * every `retryInterval` milliseconds.
     *
     * @param {Array.<string>} ids the resource ids
     * @param {any} span
     * @param {object} options
     * @param {number} [options.waitTimeout] max time to wait in milliseconds
     * @param {number} [options.retryInterval] max time to wait in between retries
     * @returns {Promise.<boolean>}
     * @private
     */
    async _ensureIsLocked(ids, span, { waitTimeout, retryInterval }) {
        const start = Date.now()
        while (Date.now() - start <= waitTimeout) {
            try {
                await this.lock(ids)
                return true
            }
            catch (e) {
                span.addEvent('Document still locked', {
                    waitedFor: Date.now() - start,
                    waitTimeout, retryInterval
                })
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
     * @function close
     * @returns {void}
     */
    close() {
        return this._resourceStorage.close()
    }
}
