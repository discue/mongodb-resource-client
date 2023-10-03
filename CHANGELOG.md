# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.21.0](https://github.com/discue/mongodb-resource-client/compare/v0.20.0...v0.21.0) (2023-10-03)


### Features

* **one-to-many-resource:** use lookup for resource path checks ([9ff49cf](https://github.com/discue/mongodb-resource-client/commit/9ff49cfba1e18630949fc3f16231979fb7800a8c))
* **simple-resource:** for create only check resource exists in target collection ([2d101dc](https://github.com/discue/mongodb-resource-client/commit/2d101dce93fc834e12c9727428889e070a95bbf5))


### Refactorings

* **one-to-many-resource:** add more logic to mongodb lookup queries ([8f56d54](https://github.com/discue/mongodb-resource-client/commit/8f56d5452a582afd43181c6a3657728f824957da))


### Chores

* add env var for sharing mongoclient ([11c8789](https://github.com/discue/mongodb-resource-client/commit/11c8789ce9ea9c44a642a7bf80873fbcc5ce284b))
* **deps-dev:** bump @types/node from 20.6.2 to 20.8.0 ([b7746d3](https://github.com/discue/mongodb-resource-client/commit/b7746d389e59f631986efe0946c4076448a4422e))
* **deps-dev:** bump chai from 4.3.8 to 4.3.10 ([0b4f7e3](https://github.com/discue/mongodb-resource-client/commit/0b4f7e3fefc14f725cee8b638d46463753bbde34))
* **deps-dev:** bump eslint from 8.49.0 to 8.50.0 ([964188c](https://github.com/discue/mongodb-resource-client/commit/964188c402d3a64cdb9f93cb821499a520879d51))
* **deps:** add mocha types ([fd19d88](https://github.com/discue/mongodb-resource-client/commit/fd19d8878a130a5cee7beba0c6be83425ea8cfee))
* **deps:** bump @discue/open-telemetry-tracing from 0.3.0 to 0.4.0 ([6b17c70](https://github.com/discue/mongodb-resource-client/commit/6b17c70231bd99befdb03340d20360ee597ef4fd))
* **deps:** bump actions/checkout from 3 to 4 ([01835e3](https://github.com/discue/mongodb-resource-client/commit/01835e393e374d62765742ec4ca0a18000b7b402))
* **docs:** update readme ([87e55c5](https://github.com/discue/mongodb-resource-client/commit/87e55c59ef7ebf2d60ba5d114602dfebca52d156))
* **simple-resource:** remove log statement ([5aad971](https://github.com/discue/mongodb-resource-client/commit/5aad9710a179b3825d2ae1b6bd2c47fa1801163c))

## [0.20.0](https://github.com/discue/mongodb-resource-client/compare/v0.19.0...v0.20.0) (2023-09-24)


### Features

* **one-to-many-resource:** improve perf by only checking immediate parent's ref ([3cff31e](https://github.com/discue/mongodb-resource-client/commit/3cff31ea3fa6cd735eb851d575ea1685f3d6dede))
* **simple-resource:** join array if its array with length > 1 ([fe133b3](https://github.com/discue/mongodb-resource-client/commit/fe133b3c82fdb1499f4c5aff6f58197a03644303))


### Bug Fixes

* **simple-resource:** error if collection name passed ([58ff833](https://github.com/discue/mongodb-resource-client/commit/58ff8337ff643039e6618c6b7cafdd510df0f2fe))


### Refactorings

* **one-to-few-resource:** do not use callbacks for resource events ([01d7ab6](https://github.com/discue/mongodb-resource-client/commit/01d7ab60cbecb05845de6671e3cc2be3ac2b7646))


### Chores

* add new aggregations ([d61d175](https://github.com/discue/mongodb-resource-client/commit/d61d175099387d069a54fbcf3f6dec678df53da1))
* add types ref to package.json ([2c1de16](https://github.com/discue/mongodb-resource-client/commit/2c1de16c9ebbc9dddc485e2aa57af246a3bde84e))
* **ci:** decrease test timeout ([c6c6c68](https://github.com/discue/mongodb-resource-client/commit/c6c6c68bebbd02ee37c40a9e20c2bb17a268f0b4))
* **docs:** update readme ([d91fcc8](https://github.com/discue/mongodb-resource-client/commit/d91fcc866d052c3aafc11a12794cc89a3b2abfc8))
* remove benchmark test from index ([7a825ff](https://github.com/discue/mongodb-resource-client/commit/7a825ffb97046cc8b21106aaffba720c078696f2))
* **simple-resource:** emit delete event after deletion ([0f04b22](https://github.com/discue/mongodb-resource-client/commit/0f04b2229d55f15ea82bb574008c4e9bf260277c))

## [0.19.0](https://github.com/discue/mongodb-resource-client/compare/v0.18.0...v0.19.0) (2023-09-20)


### Chores

* update and unify span names ([60a03cc](https://github.com/discue/mongodb-resource-client/commit/60a03cced1d7403c6c4089dfb918e3dfed25e935))

## [0.18.0](https://github.com/discue/mongodb-resource-client/compare/v0.17.0...v0.18.0) (2023-09-19)


### Features

* add package prefix to all span names ([a342827](https://github.com/discue/mongodb-resource-client/commit/a3428273057b68b34fd488663c6af2ac3f6a6d10))


### Chores

* update tracing dependency to prevent build failures ([5b6618b](https://github.com/discue/mongodb-resource-client/commit/5b6618b20ae044fe4a64d5e29be33803c74d9fa8))

## [0.17.0](https://github.com/discue/mongodb-resource-client/compare/v0.16.0...v0.17.0) (2023-09-19)


### Features

* add tracing support with open telemetry ([8c72cb0](https://github.com/discue/mongodb-resource-client/commit/8c72cb0c480e2498000c069ea3b6f7c70426ec7c))


### Chores

* **docs:** update readme ([c68dea3](https://github.com/discue/mongodb-resource-client/commit/c68dea37806606b71a5b381b8747830905c57402))
* update dependencies ([d428df5](https://github.com/discue/mongodb-resource-client/commit/d428df5fc561b9509ee74cec0a7b60be49c5afa4))

## [0.16.0](https://github.com/discue/mongodb-resource-client/compare/v0.15.0...v0.16.0) (2023-09-18)


### Features

* **simple-resource:** if no client was given close custom one on SIGTERM ([009db39](https://github.com/discue/mongodb-resource-client/commit/009db39916659ad99579aece88fcf53cf6e12e2b))


### Bug Fixes

* **locks:** ttl index must use a date field ([7795c63](https://github.com/discue/mongodb-resource-client/commit/7795c637c79c8019c50f8d5a36023065258225b1))


### Chores

* **locks:** add underscore to collection name ([0d153e6](https://github.com/discue/mongodb-resource-client/commit/0d153e6a72d9d8694cc34b56fa40952b1f4b4fc0))

## [0.15.0](https://github.com/discue/mongodb-resource-client/compare/v0.14.0...v0.15.0) (2023-09-12)


### Features

* **simple-resource:** let mongo client handle connectivity ([16252dc](https://github.com/discue/mongodb-resource-client/commit/16252dce7f489bb99be10c2dc01f9a155e91f82f))

## [0.14.0](https://github.com/discue/mongodb-resource-client/compare/v0.13.0...v0.14.0) (2023-09-12)


### Features

* make sure all cursors are closed after reading ([d94cd2f](https://github.com/discue/mongodb-resource-client/commit/d94cd2fb1519e497098fc386e2c1bdd6e9e677a1))


### Chores

* **deps:** install chai types ([ea399cd](https://github.com/discue/mongodb-resource-client/commit/ea399cd2481400059bd48662c7f394cd96335e56))
* fix type in comment ([498712c](https://github.com/discue/mongodb-resource-client/commit/498712c4b50a645d25877fbd315d61d84f07fda0))
* **one-to-few-resource:** limit get results to 1 always ([62bd803](https://github.com/discue/mongodb-resource-client/commit/62bd803c6c5d1ed4f8ffaa45a4edf18a9af5862a))

## [0.13.0](https://github.com/discue/mongodb-resource-client/compare/v0.12.1...v0.13.0) (2023-09-01)


### Features

* use mongodb driver v6 ([fcef2ab](https://github.com/discue/mongodb-resource-client/commit/fcef2ab2fda2d77a822ee3a0d68c91ebcf136e85))


### Chores

* **deps-dev:** bump @types/node from 20.4.10 to 20.5.7 ([4a16098](https://github.com/discue/mongodb-resource-client/commit/4a160986ffdda3248ff3af439d22581c80e64576))
* **deps-dev:** bump chai from 4.3.7 to 4.3.8 ([68849ee](https://github.com/discue/mongodb-resource-client/commit/68849ee7512e7c6be9efeda5ef84d1fa43f1c4c9))
* **deps-dev:** bump eslint from 8.46.0 to 8.48.0 ([eb9f721](https://github.com/discue/mongodb-resource-client/commit/eb9f7214a2b69f81c3209f01e4bc2fb45371897c))
* **deps-dev:** bump mongodb-memory-server from 8.13.0 to 8.15.1 ([b1cb31d](https://github.com/discue/mongodb-resource-client/commit/b1cb31d379bbeb46530cf405fedbdabb84c7ffb4))
* **deps-dev:** bump typescript from 5.1.6 to 5.2.2 ([01a3edc](https://github.com/discue/mongodb-resource-client/commit/01a3edcf510796d03769821c1f6716bf5ddf4ac5))

### [0.12.1](https://github.com/discue/mongodb-resource-client/compare/v0.12.0...v0.12.1) (2023-08-21)


### Bug Fixes

* typo in db name env variable ([c59fda2](https://github.com/discue/mongodb-resource-client/commit/c59fda2980bcfaa63e37e4524927a164684ed3f2))

## [0.12.0](https://github.com/discue/mongodb-resource-client/compare/v0.11.0...v0.12.0) (2023-08-16)


### Features

* **locks:** return callback's return value ([ef4cde9](https://github.com/discue/mongodb-resource-client/commit/ef4cde9f8bb0bbf557d3ad04af9656fe66759436))

## [0.11.0](https://github.com/discue/mongodb-resource-client/compare/v0.10.0...v0.11.0) (2023-08-15)


### Features

* **locks:** add lock module to allow locking of documents ([40ac672](https://github.com/discue/mongodb-resource-client/commit/40ac672e768e9673f770371e68db1110cf4fef3d))


### Refactorings

* instantiate modules only in describe function ([0beaee8](https://github.com/discue/mongodb-resource-client/commit/0beaee8534453edb70669bf70ab0172fcd8f72f9))


### Chores

* **deps:** declare node types as dev dep ([67f2610](https://github.com/discue/mongodb-resource-client/commit/67f2610f19c3993d2523958d797f76e0a53aa628))
* do not log to console ([a0a73d2](https://github.com/discue/mongodb-resource-client/commit/a0a73d2a44c31f800931db133ae82bcffd26ccf0))
* **docs:** update readme ([de95093](https://github.com/discue/mongodb-resource-client/commit/de950933ace4efefe7651d1ad0bc95716fdb0171))
* **pkg:** update types definition ([52e1ee3](https://github.com/discue/mongodb-resource-client/commit/52e1ee358e100e3632ac11bcb254e5eeabdfabf7))
* update env var for database name ([8a80153](https://github.com/discue/mongodb-resource-client/commit/8a8015376ea95219e303a5fe6b65ae4b0a8274b3))

## [0.10.0](https://github.com/discue/mongodb-resource-client/compare/v0.9.0...v0.10.0) (2023-08-12)


### Features

* allow setting db name via env var ([e5047ca](https://github.com/discue/mongodb-resource-client/commit/e5047ca35310834d61b7c8497c45295d52653499))

## [0.9.0](https://github.com/discue/mongodb-resource-client/compare/v0.8.0...v0.9.0) (2023-08-12)


### Chores

* **docs:** update readme ([344a17c](https://github.com/discue/mongodb-resource-client/commit/344a17c6f571a49e8fa814f0d705e61f37585ee6))
* generate types during release ([df1360d](https://github.com/discue/mongodb-resource-client/commit/df1360dff7a3e4bef0c5be25cb035f735276a6a9))
* ignore typescript types ([07555b8](https://github.com/discue/mongodb-resource-client/commit/07555b8fa6e0b84d9446bde71ca884d52e33e8eb))
* remove syntax errors in github when rendering markdown ([203a508](https://github.com/discue/mongodb-resource-client/commit/203a50886f3291188b6de67deb7bff0cde159a54))

## [0.8.0](https://github.com/discue/mongodb-resource-client/compare/v0.7.0...v0.8.0) (2023-07-28)


### Features

* implement history and auditing extension ([05be481](https://github.com/discue/mongodb-resource-client/commit/05be4816412b96fdde2c495fcdeff9ac7c755bb2))


### Chores

* also generate docs for history extension ([fc363f4](https://github.com/discue/mongodb-resource-client/commit/fc363f42a76806160f641db54e0ab70b2796b601))
* **deps-dev:** bump eslint from 8.42.0 to 8.44.0 ([37cc991](https://github.com/discue/mongodb-resource-client/commit/37cc9910daae55c577f1d2e911c5b4da50a67de3))
* **deps-dev:** bump mongodb-memory-server from 8.12.2 to 8.13.0 ([9d2a7f0](https://github.com/discue/mongodb-resource-client/commit/9d2a7f0759985c15af7f5e4f62b18fe7e049f037))
* **deps:** update dependencies ([9e2ef11](https://github.com/discue/mongodb-resource-client/commit/9e2ef1113b8ae8ca92c046916c9c9757ef9b4289))
* **docs:** fix typo ([e86a7b1](https://github.com/discue/mongodb-resource-client/commit/e86a7b1f8f9c97a455cdf2646b749473add1ba2f))
* **docs:** set only one headline in event emitter docs ([804d03b](https://github.com/discue/mongodb-resource-client/commit/804d03b84511e9e5f08fd9b9fc4227557ab1e34b))
* **docs:** update readme ([1653c4b](https://github.com/discue/mongodb-resource-client/commit/1653c4bc0d07dc039f089be806c96e739ac8b82e))
* **docs:** update readme ([d0f8dde](https://github.com/discue/mongodb-resource-client/commit/d0f8ddefb2ebce1bb5858e09eda2b504c213f91c))
* **simple-resource:** update js doc ([6a3b221](https://github.com/discue/mongodb-resource-client/commit/6a3b22172eedfba79f083d6bdd6f1ded8c4b6767))
* update docs ([df34b9b](https://github.com/discue/mongodb-resource-client/commit/df34b9b619faf7cc411825df9f65a7b6faacc664))
* update jsdoc examples ([d111cc0](https://github.com/discue/mongodb-resource-client/commit/d111cc042f50270631e39626cfa291e16f66081d))

## [0.7.0](https://github.com/discue/mongodb-resource-client/compare/v0.6.0...v0.7.0) (2023-06-18)


### Features

* in events pass state of before and after operation ([fc29347](https://github.com/discue/mongodb-resource-client/commit/fc2934793e746c65f28d3ecf5fabeae9daf58e71))
* make transactions optional ([93266ce](https://github.com/discue/mongodb-resource-client/commit/93266ce2110cf806f4f81e62495f7604668f5439))
* **one-to-few-ref-storage:** support transactions in create and delete ([c19558b](https://github.com/discue/mongodb-resource-client/commit/c19558b814d28d1d8422dd9cec6e683aafc70984))
* **one-to-many-resource:** reorder order of deletions ([aeeaa33](https://github.com/discue/mongodb-resource-client/commit/aeeaa33e7b59c6327441266e5793ac66a07d3d07))
* **one-to-many-storage:** support create and delete with transactions ([3a54ca7](https://github.com/discue/mongodb-resource-client/commit/3a54ca74b89a6d5bce0a5e5295dc942f9eac2e96))
* **simple-resource:** abort transaction on error ([d477b5c](https://github.com/discue/mongodb-resource-client/commit/d477b5cb3ab72cd6445e7924607de3aa9cf4b01f))
* **simple-resource:** wrap update and delete in transactions ([e106aa2](https://github.com/discue/mongodb-resource-client/commit/e106aa2e18156ba7d1347dcb90e63841e8c6cdbc))


### Bug Fixes

* **simple-resource:** before aborting transaction check it is active ([6d6275a](https://github.com/discue/mongodb-resource-client/commit/6d6275ab89473101f90bb5955eca397d504becf6))


### Refactorings

* move create implementation one level up ([eaa3142](https://github.com/discue/mongodb-resource-client/commit/eaa3142a7b99d736571d665a06ba3e37edcab8e6))


### Chores

* do net send context in events ([b11f587](https://github.com/discue/mongodb-resource-client/commit/b11f587d09dbdb2183b25dd9f30a745c89a82f6e))
* **docs:** also create docs for event emitter ([0b845c3](https://github.com/discue/mongodb-resource-client/commit/0b845c3cfd41e88affb1ba8336886784bfd58d12))
* **docs:** generate all readmes again ([0ba4914](https://github.com/discue/mongodb-resource-client/commit/0ba4914e59587ab5b7ba0705bc09785f74e81cf7))
* **docs:** link to event emitter docs ([18507b9](https://github.com/discue/mongodb-resource-client/commit/18507b9820bc051430cc35e528b0985ac029ab29))
* **docs:** set headline in event emitter docs ([182d932](https://github.com/discue/mongodb-resource-client/commit/182d93211610a56e5d13f44a981cd9f12f05e645))
* **docs:** update readme ([c05b009](https://github.com/discue/mongodb-resource-client/commit/c05b00932fad7a48a1f02f9e4fdcbd273440efe0))
* **docs:** update readme ([644ea72](https://github.com/discue/mongodb-resource-client/commit/644ea72ccd2431c7e1b8a00287f0a378b39efac3))
* **one-to-many-resource:** allow for easier testing by not calling super class directly ([10c370d](https://github.com/discue/mongodb-resource-client/commit/10c370d7e7ecba7eda1030afadb2e393c99c928a))
* **simple-resource:** optionally use session also in create function ([7b0d730](https://github.com/discue/mongodb-resource-client/commit/7b0d7305fbc20711bbf3d7ee018d345cc618f66d))
* update readme ([5ecc466](https://github.com/discue/mongodb-resource-client/commit/5ecc4666dd486509568a3ccc9bb018d911ce6fff))
* use db from connection string by default ([b588062](https://github.com/discue/mongodb-resource-client/commit/b588062402d07e599ffe712781496718d3216560))

## [0.6.0](https://github.com/discue/mongodb-resource-client/compare/v0.5.0...v0.6.0) (2023-06-13)


### Features

* pass full resource id path and full resource to event handlers ([e47deef](https://github.com/discue/mongodb-resource-client/commit/e47deef92b25036886a94c33609d3e443a104f5d))


### Chores

* remove console.logs ([e6f2d73](https://github.com/discue/mongodb-resource-client/commit/e6f2d7340b175c113dcae49856d22f179f6081d8))

## [0.5.0](https://github.com/discue/mongodb-resource-client/compare/v0.4.0...v0.5.0) (2023-06-12)


### Features

* expose usage event prefix as instance property ([8c42d9b](https://github.com/discue/mongodb-resource-client/commit/8c42d9b41ea24a3ed5aa1790c02c1bf2a37fb1be))
* **one-to-many-resource:** also create update events ([23c03ef](https://github.com/discue/mongodb-resource-client/commit/23c03ef6b86a91365e72ac0db658861f039402db))

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
