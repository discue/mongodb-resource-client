
<p align="center">
<a href="https://www.discue.io/" target="_blank" rel="noopener noreferrer"><img width="128" src="https://www.discue.io/icons-fire-no-badge-square/web/icon-192.png" alt="Vue logo">
</a>
</p>

<br/>
<div align="center">

[![GitHub tag](https://img.shields.io/github/tag/discue/mongodb-resource-client?include_prereleases=&sort=semver&color=blue)](https://github.com/discue/mongodb-resource-client/releases/)
[![Latest Stable Version](https://img.shields.io/npm/v/@discue/mongodb-resource-client.svg)](https://www.npmjs.com/package/@discue/mongodb-resource-client)
[![License](https://img.shields.io/npm/l/@discue/mongodb-resource-client.svg)](https://www.npmjs.com/package/@discue/mongodb-resource-client)
<br/>
[![NPM Downloads](https://img.shields.io/npm/dt/@discue/mongodb-resource-client.svg)](https://www.npmjs.com/package/@discue/mongodb-resource-client)
[![NPM Downloads](https://img.shields.io/npm/dm/@discue/mongodb-resource-client.svg)](https://www.npmjs.com/package/@discue/mongodb-resource-client)
<br/>
[![contributions - welcome](https://img.shields.io/badge/contributions-welcome-blue)](/CONTRIBUTING.md "Go to contributions doc")
[![Made with Node.js](https://img.shields.io/badge/Node.js->=12-blue?logo=node.js&logoColor=white)](https://nodejs.org "Go to Node.js homepage")

</div>

# mongodb-resource-client
Light wrapper around [MongoDB](https://mongodb.com/) client library to allow for easier management of resources and documents. All storage modules are based on the best practices described in the article [6 Rules of Thumb for MongoDB Schema Design](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design) from the official [MongoDB blog](https://www.mongodb.com/blog).

## Components
- [Aggregations](README_AGGREGATIONS.md)
- [EventEmitter](README_EVENT_EMITTER.md)
- [OneToFewRefStorage](README_ONE_TO_FEW_REF_STORAGE.md)
- [OneToFewResourceStorage](README_ONE_TO_FEW_RESOURCE_STORAGE.md)
- [OneToManyResourceStorage](README_ONE_TO_MANY_RESOURCE_STORAGE.md)
- [SimpleResourceStoage](README_SIMPLE_RESOURCE_STORAGE.md)

## Transactions
The module supports transactions for atomic updates of multiple collections. However, as only MongoDB replica sets support transactions, transaction support needs to be explicitly enabled via setting the environment variable `DSQ_MONGOD_ENABLE_TRANSACTIONS` with value `true`.

## Installation
```bash
npm install @discue/mongodb-resource-client
```

## Run tests

To run tests, run the following command

```bash
./test.sh
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

