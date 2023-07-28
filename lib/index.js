'use strict'

/**
 * @typedef {Object} MongoResourceClient
 * 
 * @property {import('./one-to-few-ref-storage.js')} OneToFewRefStorage
 * @property {import('./one-to-few-resource-storage.js')} OneToFewResourceStorage
 * @property {import('./one-to-many-resource-storage.js')} OneToManyResourceStorage
 */

/**
 * @typedef {import('./simple-resource-storage.js')} SimpleResourceStorage
 */
module.exports.SimpleResourceStorage = require('./simple-resource-storage.js')

/**
 * @typedef {import('./one-to-few-ref-storage.js')} OneToFewRefStorage
 */
module.exports.OneToFewRefStorage = require('./one-to-few-ref-storage.js')

/**
 * @typedef {import('./one-to-few-resource-storage.js')} OneToFewResourceStorage
 */
module.exports.OneToFewResourceStorage = require('./one-to-few-resource-storage.js')

/**
 * @typedef {import('./one-to-many-resource-storage.js')} OneToManyResourceStorage
 */
module.exports.OneToManyResourceStorage = require('./one-to-many-resource-storage.js')

/**
 * @typedef {import('./history.js')} ResourceStorageHistory
 */
module.exports.ResourceStorageHistory = require('./history.js')