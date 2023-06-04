'use strict'

/**
 * @typedef {Object} MongoResourceClient
 * @property {import('./simple-resource-storage.js')} SimpleResourceStorage
 * @property {import('./one-to-few-ref-storage.js')} OneToFewRefStorage
 * @property {import('./one-to-few-resource-storage.js')} OneToFewResourceStorage
 * @property {import('./one-to-many-resource-storage.js')} OneToManyResourceStorage
 */

/**
 * @type {MongoResourceClient}
 */
const exp = {
    SimpleResourceStorage: require('./simple-resource-storage.js'),
    OneToFewRefStorage: require('./one-to-few-ref-storage.js'),
    OneToFewResourceStorage: require('./one-to-few-resource-storage.js'),
    OneToManyResourceStorage: require('./one-to-many-resource-storage.js')
}

module.exports = exp