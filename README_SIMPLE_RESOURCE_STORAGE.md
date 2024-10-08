<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## ConstructorOptions

### Properties

*   `client` **MongoClient** configured mongo client to use. Can be null if url is set
*   `databaseName` **[string][1]?** name of the mongodb database
*   `collectionName` **[string][1]** name of the mongodb collection used to store the resources
*   `indexes` **[Array][2]<[object][3]>?** indexes to be created on instantiation. Use format {key:1} for single indexes and {key1: 1, key:2} for compound indexes. See [https://www.mongodb.com/docs/manual/reference/command/createIndexes/#command-fields][4]

### Examples

```javascript
import { MongoClient } from 'mongodb'
import { SimpleResourceStorage } from '@discue/mongodb-resource-client'

const client = new MongoClient(url, {
  serverApi: { version: '1', strict: true, deprecationErrors: true }, // https://www.mongodb.com/docs/manual/reference/stable-api/
})

const storage = new SimpleResourceStorage({
  client,
  collectionName: 'api_clients',
})
```

## SimpleResourceStorage

Simple resource class with crud operation methods to create, update, delete, and
get stored entities and documents.

## WithSessionCallback

Type: [Function][5]

## get

Returns a resource by ids.

### Parameters

*   `resourceIds` **([string][1] | [Array][2]<[string][1]>)** resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
*   `options` **GetOptions**&#x20;

Returns **[object][3]**&#x20;

## getAll

Returns all resources.

### Parameters

*   `options` **GetOptions**&#x20;

Returns **[Array][2]<[object][3]>**&#x20;

## getAll

Returns all children of a certain type/collection. Imagine this method walking a tree and returning all leaves at a certain level.

Currently only supports trees with three levels.

### Parameters

*   `resourceIds` **([string][1] | [Array][2]<[string][1]>)** resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
*   `childPath` **([string][1] | [Array][2]<[string][1]>)** the path of the children to query e.g. /api\_clients/queues/messages
*   `options` **GetChildrenOptions?**&#x20;

Returns **[Promise][6]\<ChildrenAndResourcePaths>**&#x20;

## countAllChildren

Returns the count of all children of a certain type/collection.

Currently only supports trees with three levels.

### Parameters

*   `resourceIds` **([string][1] | [Array][2]<[string][1]>)** resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
*   `childPath` **([string][1] | [Array][2]<[string][1]>)** the path of the children to query e.g. /api\_clients/queues/messages
*   `options` **GetChildrenOptions?**&#x20;

Returns **[Promise][6]<[number][7]>**&#x20;

## find

*   **See**: [README\_AGGREGATIONS.md][8]

Returns all resources that pass the given aggregation stages.

### Parameters

*   `aggregations` **[Array][2]<[object][3]>** a list of valid aggregation objects (optional, default `[]`)

Returns **[Array][2]<[object][3]>**&#x20;

## exists

Returns true if a resource with given ids exists.

### Parameters

*   `resourceIds` **([string][1] | [Array][2]<[string][1]>)**&#x20;

Returns **[boolean][9]**&#x20;

## create

Adds a resource to a collection by ids.

### Parameters

*   `resourceIds` **([string][1] | [Array][2]<[string][1]>)** resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
*   `resource` **[object][3]** the resource to be stored

## create

Adds a resource to a collection without any checks.

### Parameters

*   `resourceIds` **([string][1] | [Array][2]<[string][1]>)** resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
*   `resource` **[object][3]** the resource to be stored

Returns **any**&#x20;

## update

Updates a resource by ids.

### Parameters

*   `resourceIds` **([string][1] | [Array][2]<[string][1]>)** resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
*   `update` **[object][3]** values that should be updated
*   `options` **UpdateOptions**&#x20;

## delete

Deletes a resource by ids.

### Parameters

*   `resourceIds` **([string][1] | [Array][2]<[string][1]>)** resource ids that will added to the resource path i.e. /users/${id}/documents/${id}

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[4]: https://www.mongodb.com/docs/manual/reference/command/createIndexes/#command-fields

[5]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[6]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise

[7]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[8]: README_AGGREGATIONS.md

[9]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean
