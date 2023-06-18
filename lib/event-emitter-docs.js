/**
 * ## EventEmitter
 * 
 * All storage modules accept an instance of `node:events.EventEmitter` as constructor
 * parameter. If the EventEmitter is passed, the module will emit `create`, `update`, 
 * and `delete` events.
 * 
 * An event has the following properties:
 * 
 * ```js
 * const event = {
 *   after : T,
 *   before : T,
 *   collectionName : string,
 *   resourceIds : Array.<String> | String,
 *   error: boolean
 * }
 * ```
 * 
 * To listen to storage events, attach an event listener prefixed with the `usageEventPrefix` of the
 * storage instance.
 * 
 * ```js
 *  eventEmitter.on(`${storage.usageEventPrefix}.create`, async ({ error, before, after, resourceIds }) => {
 *    // do something on create
 *   })
 *  eventEmitter.on(`${storage.usageEventPrefix}.update`, async ({ error, before, after, resourceIds }) => {
 *    // do something on update
 *   })
 *   eventEmitter.on(`${storage.usageEventPrefix}.delete`, async ({ error, before, after, resourceIds }) => {
 *    // do someting on delete
 *   })
 * ```
 */