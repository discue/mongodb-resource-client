<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## ConstructorOptions

### Properties

*   `client` **MongoClient** configured mongo client to use. Can be null if url is set
*   `databaseName` **[string][1]?** name of the mongodb database
*   `indexes` **[Array][2]<[Object][3]>?** indexes to be created on instantiation. Use format {key:1} for single indexes and {key1: 1, key:2} for compound indexes
*   `collectionName` **[string][1]** name of the mongodb collection used to store the resources
*   `resourceName` **[string][1]** name of the resource e.g. users, customers, topics, shipments
*   `resourcePath` **[string][1]?** slash separated path describing the hierarchy e.g. universities/teachers/subjects/exams.
*   `hiddenResourcePath` **[string][1]?** slash separated path describing which path elements should not be returned to callers
*   `enableTwoWayReferences` **[string][1]** true if documents should also store references to their parents e.g. student have references to their schools

### Examples

```javascript
const { MongoClient } = require('mongodb')
const { OneToManyResourceStorage } = require('@discue/mongodb-resource-client')

const client = new MongoClient(url, {
  serverApi: { version: '1', strict: true, deprecationErrors: true }, // https://www.mongodb.com/docs/manual/reference/stable-api/
})

const oneToManyResourceStorage = new OneToManyResourceStorage({
  client,
  collectionName: 'api_clients',
  resourceName: 'listeners'
  enableTwoWayReferences: true
})
```

## GetOptions

### Properties

*   `withMetadata` **[boolean][4]** true if also meta data should be returned
*   `addDocumentPath` **[boolean][4]** true if $path propety should be added to documents e.g. `$path=/countries/1/cities/2/companies`
*   `projection` **[Object][3]** MongoDB projection object e.g. { id: 0, name: 0 }

## OneToManyResourceStorage

Manages relationships between entities in a more decoupled way by keep storing
entities in separate collections and using references to establish an relationship
between both. This way students can be queried independently of an university,
while all studies of a university can still be looked up via the stored reference.

The references between both collections are kept up-to-date. Deleting a document,
causes the reference to be deleted in the other entity. Adding a document
causes a reference to be updated, too.

<strong>Students collection</strong>

```js
{
  id: 1828391,
  name: 'Miles Morales',
},
{
  id: 4451515,
  name: 'Bryan Jenkins',
}
```

<strong>Universities collection</strong>

```js
{
  name: 'University Munich',
  students: [1828391]
}
{
  name: 'University Stuttgart',
  students: [4451515]
}
```

## exists

Returns true if a resource with given ids exists.

### Parameters

*   `resourceIds` **([String][1] | [Array][2]<[String][1]>)**&#x20;

Returns **[boolean][4]**&#x20;

## get

Returns a resource by ids.

### Parameters

*   `resourceIds` **([String][1] | [Array][2]<[String][1]>)** resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
*   `options` **[Object][3]**&#x20;

Returns **[Object][3]**&#x20;

## find

Find a resource by via options.match query.

### Parameters

*   `resourceIds` **([String][1] | [Array][2]<[String][1]>)** resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
*   `options` **FindOptions**&#x20;

Returns **[Object][3]**&#x20;

## getAll

Returns resources based on return value of [findReferences][5].

### Parameters

*   `resourceIds` **([String][1] | [Array][2]<[String][1]>)** resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
*   `options` **[GetOptions][6]**&#x20;

## create

Add a resource to a collection by ids.

### Parameters

*   `resourceIds` **([String][1] | [Array][2]<[String][1]>)** resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
*   `resource` **[Object][3]** the resource to be stored

## update

Updates a resource by ids

### Parameters

*   `resourceIds` **([String][1] | [Array][2]<[String][1]>)** resource ids that will added to the resource path i.e. /users/${id}/documents/${id}
*   `update` **[Object][3]** values that should be updated

## delete

Deletes a resource by ids

### Parameters

*   `resourceIds` **([String][1] | [Array][2]<[String][1]>)** resource ids that will added to the resource path i.e. /users/${id}/documents/${id}

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[5]: findReferences

[6]: #getoptions
