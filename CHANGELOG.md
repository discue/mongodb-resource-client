# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.4.0](https://github.com/discue/mongodb-resource-client/compare/v0.3.0...v0.4.0) (2023-06-12)


### Features

* **one-to-many-resource:** add method to get doc without checking refs ([9d1842c](https://github.com/discue/mongodb-resource-client/commit/9d1842c57303728649f0b3bcb1ab91c07ca44997))
* send usage events if eventEmitter is passed to constructor ([678a179](https://github.com/discue/mongodb-resource-client/commit/678a179d9f0560fd0bbcc771ed3c767ae3a7d90d))

## [0.3.0](https://github.com/discue/mongodb-resource-client/compare/v0.2.0...v0.3.0) (2023-06-10)


### Features

* add export for mongodb timestamp ([465d9c4](https://github.com/discue/mongodb-resource-client/commit/465d9c495c6a30a834284266a102f25905e25cda))
* **aggregations:** update aggregations ([6fcf2be](https://github.com/discue/mongodb-resource-client/commit/6fcf2be7236d81e7a7a1a0db688de9eee0661406))
* allow projections for get and get all ([c86f816](https://github.com/discue/mongodb-resource-client/commit/c86f816e39a3daee6e027981be270b39ce0762a3))
* enable passing mongo client to all modules ([f2f423b](https://github.com/discue/mongodb-resource-client/commit/f2f423b390a0842310428273003f00a736e9818e))
* ensure entities are referenced by host object ([572ae84](https://github.com/discue/mongodb-resource-client/commit/572ae8486b792c5de66375d4b3b90f49b4dc5135))
* **one-to many-resource:** check all refs until root ([5ddbb44](https://github.com/discue/mongodb-resource-client/commit/5ddbb44bac0f5db5a108808446bf9f4fb417b117))
* **one-to-many-resource:** allow storage of nested resources ([4afda9d](https://github.com/discue/mongodb-resource-client/commit/4afda9d448366e4536f2e74d04ecc5537f9e2202))
* **one-to-many-resource:** compute document path ([337111e](https://github.com/discue/mongodb-resource-client/commit/337111eed742f095f38caef0ff2c07c5b1ea98d2))
* **one-to-many-resource:** enable lookup of documents along the hierarchy ([bd06faf](https://github.com/discue/mongodb-resource-client/commit/bd06faf57c11fc6521b04d1a372ffd0f31c8d774))
* **one-to-many-storage:** hide _id in output of get all ([121c7a3](https://github.com/discue/mongodb-resource-client/commit/121c7a3b7f89f32c84ec05c27c9e434e69d5431d))
* set given id as id instead of _id ([fbea79e](https://github.com/discue/mongodb-resource-client/commit/fbea79ebfffd71fb75e59521ca730e31562c8f69))
* **simple-resource:** add find method and aggregation helpers ([d1e6eca](https://github.com/discue/mongodb-resource-client/commit/d1e6ecae8cb713262c19163b6b30b85b680ebcc8))
* **simple-resource:** hide _id from get result ([5ffdd4b](https://github.com/discue/mongodb-resource-client/commit/5ffdd4b94e26430651e5307ce763402c5b2c7754))
* **simple-resource:** hide _id in output of get all ([c9e0524](https://github.com/discue/mongodb-resource-client/commit/c9e052438fdef568b480ffef54ab9092a2895074))
* store created_at timestamp with every resource ([8e8bd9f](https://github.com/discue/mongodb-resource-client/commit/8e8bd9f6bf8d30969e5741de3bfaa67923d8dad3))
* update updated_at timestamp with each update ([82f7d21](https://github.com/discue/mongodb-resource-client/commit/82f7d21ad410fe242fcaae2eafe5335327435439))
* verify ids are unique and verify getall contract ([2bdda29](https://github.com/discue/mongodb-resource-client/commit/2bdda297828dbe71d00ed795b998d563791b4f16))


### Bug Fixes

* exports not es6 compatible ([7eb55fd](https://github.com/discue/mongodb-resource-client/commit/7eb55fdb38910c9dbe3a3eefdb4c18a5298d2a7b))
* **simple-resource-storage:** requires resource id to return all docs ([0257066](https://github.com/discue/mongodb-resource-client/commit/0257066869de237ecd152d1aadda5a37f833e2b9))
* **simple-resource:** init timestamp with current date ([bbf12bd](https://github.com/discue/mongodb-resource-client/commit/bbf12bd2da3a66300cf05216c26ba4f8a70b3d57))


### Refactorings

* add options object for get and get all calls ([c06a379](https://github.com/discue/mongodb-resource-client/commit/c06a379973fe12a7ba060ff624431a1e68da6249))
* refactor npm scripts ([d5906fb](https://github.com/discue/mongodb-resource-client/commit/d5906fba1dfd2d17cf0e2bb1acc993252b4f73a6))
* reuse aggregation functions ([be2ab7d](https://github.com/discue/mongodb-resource-client/commit/be2ab7df36c1e8b73a214b5fbf547a42c4235271))


### Chores

* allow passing collection name to helper ([0631d9c](https://github.com/discue/mongodb-resource-client/commit/0631d9c2af9a0cd8229f401f8bb6a8971c422b6b))
* **docs:** update readme ([44b72f6](https://github.com/discue/mongodb-resource-client/commit/44b72f6e764072045f4754da7f2b16b4d7238a1b))
* make release notes script executable ([8c806af](https://github.com/discue/mongodb-resource-client/commit/8c806afdbd8ff4278ffcf88b16842c777e3aed2c))
* **one-to-few-resource:** do not wait ([95db52f](https://github.com/discue/mongodb-resource-client/commit/95db52fb17d94f9656bb7bca5e13f1f6ee2bf8e5))
* **one-to-many-resource:** make sure getall always returns empty list at least ([91c1d26](https://github.com/discue/mongodb-resource-client/commit/91c1d2623adcd0a7e335399efcccdd09af544f6c))
* remove jsdoc that breaks doc generation ([e1d1c0e](https://github.com/discue/mongodb-resource-client/commit/e1d1c0e4127ad8210536c8c9fd650a0c65cb225a))
* remove unused imports ([81c07dd](https://github.com/discue/mongodb-resource-client/commit/81c07dd16399e5331bfe3fdc645219f778dbe626))
* **simple-resource:** do not log resoure ([36b9f10](https://github.com/discue/mongodb-resource-client/commit/36b9f10db9b37bb5cebcfa4c9fc1c9547322b938))
* **simple-resource:** update docs of find method ([331caa1](https://github.com/discue/mongodb-resource-client/commit/331caa1db2ea9af82a8c6251e4290825a35f9d36))

## 0.2.0 (2023-06-04)


### Features

* add storage modules and classes ([aecf227](https://github.com/discue/mongodb-resource-client/commit/aecf2277816e14f296dc7af6f1c540b1830f7de5))
* **one-to-many-resource-storage:** allow storage of ref to host object ([4950d3f](https://github.com/discue/mongodb-resource-client/commit/4950d3fc59b0084475740ac4895e5420493b3042))


### Chores

* add docker compose file for local development ([9fb6b97](https://github.com/discue/mongodb-resource-client/commit/9fb6b97b28c2acadc81b9a3e0e039314a76c8a53))
* add github workflow files ([454a89f](https://github.com/discue/mongodb-resource-client/commit/454a89ffcc90ae7bc4aa9b8cf029e970d3f12828))
* add module entry ([2f39ec6](https://github.com/discue/mongodb-resource-client/commit/2f39ec6e6b5da8715e405b98564957f2e253f0d0))
* add npm package files ([289989c](https://github.com/discue/mongodb-resource-client/commit/289989c03958b78c9a3961584ccb33c2b597c39a))
* add project-related config files ([bec222b](https://github.com/discue/mongodb-resource-client/commit/bec222b6fb4a74fcb84c9888994399bc96b5a19a))
* add readme ([9893950](https://github.com/discue/mongodb-resource-client/commit/9893950fc09d03c8e32369c35c442ed741b838dd))
* add release script ([0cf8475](https://github.com/discue/mongodb-resource-client/commit/0cf8475206af0c7a10847607c6aa1028e0a75fae))
* add script that generates docs ([9713e02](https://github.com/discue/mongodb-resource-client/commit/9713e02f5d65a8e76a2f46284e81cfa994150ed9))
* add test script ([4e57383](https://github.com/discue/mongodb-resource-client/commit/4e573834c08d8a4117d29149e515814cff1bbcb3))
* **deps-dev:** bump eslint from 8.41.0 to 8.42.0 ([9ec3c47](https://github.com/discue/mongodb-resource-client/commit/9ec3c471fc9618569dc5d1a5021fca22833c2de4))
* **deps:** bump actions/stale from 7 to 8 ([217e979](https://github.com/discue/mongodb-resource-client/commit/217e9799479135b7477655d6b4a927b418989387))
* **deps:** bump mongodb from 5.5.0 to 5.6.0 ([bebea99](https://github.com/discue/mongodb-resource-client/commit/bebea990c6380c2a5377eb8fff43db648f5ff42f))
* **deps:** install deps for docs generation ([fb0513d](https://github.com/discue/mongodb-resource-client/commit/fb0513df0746c70e7fc4fbee2c0182f386847f1c))
* do not bind to localhost but 127.0.0.1 ([e8dcac9](https://github.com/discue/mongodb-resource-client/commit/e8dcac9fd9f8b0c00b33a3cc5b8b074b3b562bce))
* **docs:** update readme ([aa5e14d](https://github.com/discue/mongodb-resource-client/commit/aa5e14d28f95c76835251d46bdd1afd7c35002a5))
* make connect timeout configurable ([76c0f81](https://github.com/discue/mongodb-resource-client/commit/76c0f8187c7cc03b36892781d317d5f041273aba))
* pass release script name to bash ([e6d43f6](https://github.com/discue/mongodb-resource-client/commit/e6d43f6b7ac4b928eb539b9fd775f52958b003e2))
* run release script during releases ([76da28b](https://github.com/discue/mongodb-resource-client/commit/76da28b7950fac033e41e98ef7d6b2518fb4211a))
* set connect timeout and dont set ip family ([5d7cdc2](https://github.com/discue/mongodb-resource-client/commit/5d7cdc2b0ff29b38bfd1ab3d15b43858b62f6137))
