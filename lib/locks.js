import { createTracer } from "@discue/open-telemetry-tracing";
import SpanStatusCode from "@discue/open-telemetry-tracing/status-codes";
import package$0 from "../package.json" assert { type: "json" };
import ResourceStorage from "./simple-resource-storage.js";

const { name } = package$0;

/**
 * @private
 */
const { withActiveSpan } = createTracer({
    filepath: import.meta.filename
});

export default (class {
    /**
     * @public
     * @param {ConstructorOptions} options
     */
    constructor({ client, databaseName, connectTimeout = 10_000 } = {}) {
        const collectionName = '_locks';
        this._resourceStorage = new ResourceStorage({ client, databaseName, collectionName, connectTimeout });
        this._resourceStorage._getCollection().then(collection => {
            collection.createIndex({ locked_at: 1 }, {
                expireAfterSeconds: 1
            });
        }).catch((e) => {
            console.error(`[mongodb-resource-client] Unable to create index for collection ${collectionName} in db ${databaseName}`, e);
        });
    }
    /**
     * Creates an entry in the `locks` collection. The context param is a unique identifier. If context already
     * exists, the method will throw.
     *
     * @param {Array.<string>} resourceIds the resource ids
     */
    async lock(resourceIds) {
        return withActiveSpan(`${name}#lock-resource`, { resourceIds }, async () => {
            return this._resourceStorage.create(resourceIds, {
                locked_at: Date.now()
            });
        });
    }
    /**
     * Deletes an entry from the `locks` collection unlocking the document.
     * The context param is a unique identifier. If context has already been
     * removed, the method will throw.
     *
     * @param {Array.<string>} resourceIds the resource ids
     */
    async unlock(resourceIds) {
        return withActiveSpan(`${name}#unlock-resource`, { resourceIds }, async () => {
            return this._resourceStorage._deleteUnsafe(resourceIds);
        });
    }
    /**
     * Executes the callback only if the appropriate lock document has been created successfully.
     * Unlocks the document either after completion of the callback or after `lockTimeout` millis
     * have passed.
     *
     * @param {Array.<string>} resourceIds the resource ids
     * @param {Function} callback callback to execute with lock
     * @param {Object} options
     * @param {Number} [options.lockTimeout=5_000] max time to wait in milliseconds
     * @param {Number} [options.waitTimeout=5_000] max time to wait in milliseconds
     * @param {Number} [options.retryInterval=125] max time to wait in between retries
     * @throws {Error} Unable to establish lock - if unable to establish lock for a document
     * @throws {Error} Lock interrupted by timeout - if callback did not return before lockTimeout
     */
    async doWhileLocked(resourceIds, callback, { lockTimeout = 5_000, waitTimeout = 5_000, retryInterval = 125 } = {}) {
        return withActiveSpan(`${name}#do-while-resource-locked`, { resourceIds, lockTimeout, waitTimeout, retryInterval }, async (span) => {
            return new Promise((resolve, reject) => {
                let timeout;
                // override the callback here. The lock timeout should only start
                // after the lock was established
                this._doWhileLocked(resourceIds, span, async () => {
                    timeout = setTimeout(() => {
                        this.unlock(resourceIds)
                            .finally(() => {
                                span.addEvent('Timeout waiting for lock');
                                reject(new Error('Lock interrupted by timeout'));
                            });
                    }, lockTimeout);
                    return callback();
                }, { lockTimeout, waitTimeout, retryInterval })
                    .then((result) => {
                        clearTimeout(timeout);
                        resolve(result);
                    }, (error) => {
                        span.addEvent('Unable to aquire lock')
                            .setStatus(SpanStatusCode.ERROR);
                        clearTimeout(timeout);
                        reject(error);
                    });
            });
        });
    }
    /**
     * Executes the callback only if the appropriate lock document has been created successfully.
     * Unlocks the document either after completion.
     *
     * @private
     * @param {Array.<string>} ids the resource ids
     * @param {any} span
     * @param {Function} callback callback to execute with lock
     * @param {Object} options
     * @param {Number} [options.waitTimeout=5_000] max time to wait in milliseconds
     * @param {Number} [options.retryInterval=125] max time to wait in between retries
     * @throws {Error} Unable to establish lock - if unable to establish lock for a document
     */
    async _doWhileLocked(ids, span, callback, { waitTimeout = 5_000, retryInterval = 125 } = {}) {
        const locked = await this._ensureIsLocked(ids, span, { waitTimeout, retryInterval });
        if (!locked) {
            throw new Error('Unable to establish lock.');
        }
        try {
            const result = await callback.call();
            return result;
        }
        finally {
            await this.unlock(ids);
        }
    }
    /**
     * Creates the lock for the given id waiting `waitTimeout` milliseconds and retrying
     * every `retryInterval` milliseconds.
     *
     * @private
     * @param {Array.<string>} ids the resource ids
     * @param {any} span
     * @param {Object} options
     * @param {Number} [options.waitTimeout] max time to wait in milliseconds
     * @param {Number} [options.retryInterval] max time to wait in between retries
     * @returns {Promise.<boolean>}
     */
    async _ensureIsLocked(ids, span, { waitTimeout, retryInterval }) {
        const start = Date.now();
        while (Date.now() - start <= waitTimeout) {
            try {
                await this.lock(ids);
                return true;
            }
            catch (e) {
                span.addEvent('Document still locked', {
                    waitedFor: Date.now() - start,
                    waitTimeout, retryInterval
                });
                if (!e.message.includes('already exists') && !e.message.includes('duplicate key')) {
                    throw e;
                }
                await new Promise((resolve) => setTimeout(resolve, retryInterval));
            }
        }
        return false;
    }
    /**
     * Closes the database client.
     *
     * @method close
     * @returns {void}
     */
    close() {
        return this._resourceStorage.close();
    }
});
