# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.1](https://github.com/discue/mongodb-resource-client/compare/mongodb-resource-client-v1.0.0...mongodb-resource-client-v1.0.1) (2026-10-23)


### Features

* add timeseries storage class ([f82c23f](https://github.com/discue/mongodb-resource-client/commit/f82c23fb1089e486a4512768266be7fef23f63fd))
* **aggregations:** add equals all method ([ceee4ee](https://github.com/discue/mongodb-resource-client/commit/ceee4ee2d6795a597fbcaf126c8350917d1570ba))
* **aggregations:** add match wildcard function ([7f836b8](https://github.com/discue/mongodb-resource-client/commit/7f836b8951bfcdc7b4b565ee0e3ffd45c82b9294))
* allow enabling eventing at runtime ([c3e0f13](https://github.com/discue/mongodb-resource-client/commit/c3e0f137a373c244a0eee03a85dc1d57e4bbddd4))
* allow index to be passed as index specification ([f2f7660](https://github.com/discue/mongodb-resource-client/commit/f2f766096862b695fa27631657990167b6821c48))
* create custom indexes too ([7c0901d](https://github.com/discue/mongodb-resource-client/commit/7c0901d7f1798f30665d5b886f406121caed79f9))
* do not fail if index cannot be created ([8341d8f](https://github.com/discue/mongodb-resource-client/commit/8341d8f449b80fea666d3bf38e9f18862ca57947))
* ensure all cursors get closed ([55b0fd7](https://github.com/discue/mongodb-resource-client/commit/55b0fd7ce32cf41e6de8e4c6d84c21165f446e16))
* **history:** do not add prefix to collection name ([5ac0245](https://github.com/discue/mongodb-resource-client/commit/5ac02453b9f376bd3c969142644d66844ee69a2c))
* **history:** make possible to use parent collection also for history ([737ec2b](https://github.com/discue/mongodb-resource-client/commit/737ec2b01373301e17b76a78c91063f859882dbd))
* **lookup:** ensure projection is working for queried children ([4254358](https://github.com/discue/mongodb-resource-client/commit/425435852d4931fb955ee986b66f749ff6e75f5d))
* **one-to-many-resource:** implement find method ([298720b](https://github.com/discue/mongodb-resource-client/commit/298720b6e741c221ece618c3cea55b3041dda425))
* **one-to-many-resource:** tighten resource id requirements ([81f901a](https://github.com/discue/mongodb-resource-client/commit/81f901a0b448ac89aadea77a181d4ec49376afe5))
* **one-to-many-resource:** use lookup for resource path checks ([9ff49cf](https://github.com/discue/mongodb-resource-client/commit/9ff49cfba1e18630949fc3f16231979fb7800a8c))
* remove OT dependencies to support noop library ([5dde0b5](https://github.com/discue/mongodb-resource-client/commit/5dde0b5f076db9ef6ad55d1ab2b6ba5c9697c6dc))
* **simple-resource-storage:** calculate document resource path ([2f27fc7](https://github.com/discue/mongodb-resource-client/commit/2f27fc706384d50b698dba277f90dee226d04a59))
* **simple-resource-storage:** do not hardcode collection names ([c3369c9](https://github.com/discue/mongodb-resource-client/commit/c3369c98e381e60074a67fb3237c001b6b7710d8))
* **simple-resource:** add getAllChildren method ([984e86e](https://github.com/discue/mongodb-resource-client/commit/984e86e9e764aa7bc21eebf2d7d3d05e9cbbe0d1))
* **simple-resource:** add method to count all children of a resource ([9891097](https://github.com/discue/mongodb-resource-client/commit/9891097837ade85d4836dc63f71c2d31c30d5f47))
* **simple-resource:** allow matching of children when querying ([ad9cb57](https://github.com/discue/mongodb-resource-client/commit/ad9cb57778da6f8fed75dd911190255af57f16fb))
* **simple-resource:** enable inserting resource with update fn ([b9beab6](https://github.com/discue/mongodb-resource-client/commit/b9beab68e217db6e3f3b22d40d64e5c81e550340))
* **simple-resource:** for create only check resource exists in target collection ([2d101dc](https://github.com/discue/mongodb-resource-client/commit/2d101dce93fc834e12c9727428889e070a95bbf5))
* use es6 imports and new event listener interface ([3c57fdf](https://github.com/discue/mongodb-resource-client/commit/3c57fdfd0fe70a33899e97648faaf01186048fe4))


### Bug Fixes

* **one-to-many-resource:** fix error when calling close ([c10beea](https://github.com/discue/mongodb-resource-client/commit/c10beeabb58f759125b842f2b2e837a12edce943))
* **one-to-many-resource:** fix response contains unwanted properties ([588f230](https://github.com/discue/mongodb-resource-client/commit/588f2307a77ef357da06a6a11e59f65f9e02e33b))
* **simple-storage:** get all children method returns undefined children of no children found ([6d0d703](https://github.com/discue/mongodb-resource-client/commit/6d0d703ace421db930262697c43b3cf1a61ede20))
* use emittery v2 function shapes ([b6b6a86](https://github.com/discue/mongodb-resource-client/commit/b6b6a865d8728201a3b18ec464c13bdc6d9ab545))


### Miscellaneous Chores

* add eslint rules ([f6bbad3](https://github.com/discue/mongodb-resource-client/commit/f6bbad34b049a8ed0589d5d918322112b174cf46))
* add jsdocs for history module ([7a06f1b](https://github.com/discue/mongodb-resource-client/commit/7a06f1b35842b84f2631c047fbab22da2b410a61))
* add method for indexstats stage ([b47d6c8](https://github.com/discue/mongodb-resource-client/commit/b47d6c829128be1316e3839816e434963c13e039))
* add mongdb playground data ([c84073d](https://github.com/discue/mongodb-resource-client/commit/c84073d68d247d86d62da7f552ac5be8dcd0bc7d))
* add optional deps as dev deps ([1493526](https://github.com/discue/mongodb-resource-client/commit/14935269bc926e4c7436c1ff1b9a1d0e70ed21ce))
* **aggregations:** add date_trunc function ([b20024f](https://github.com/discue/mongodb-resource-client/commit/b20024f5cfe4f1dcd5c3614e12640b0bbfc1644e))
* **aggregations:** add more options to DATE_TRUNC ([f27f446](https://github.com/discue/mongodb-resource-client/commit/f27f446e2143959057f4df5c36ab8d952e6b92f2))
* **aggregrations:** add TO_LONG method ([c052680](https://github.com/discue/mongodb-resource-client/commit/c052680bd7922230d2ec05db1b1c52a8aa653bed))
* **base:** add close method ([3b3f461](https://github.com/discue/mongodb-resource-client/commit/3b3f461cf7310c67c072ad97c9684f95e074bc75))
* **base:** rename function to enable TS types ([4c1e14d](https://github.com/discue/mongodb-resource-client/commit/4c1e14dfd929168bb0dcb0de9450613bb1cc2ff8))
* bind mongo express to port 8888 ([4ad4582](https://github.com/discue/mongodb-resource-client/commit/4ad4582362eb80594cd85290fc61432132a362eb))
* check whether desired mongodb port is used before starting another one ([1eb6a96](https://github.com/discue/mongodb-resource-client/commit/1eb6a96cd26f46ff82d6fd0367884f1dc6efa6be))
* convert to esm ([60450af](https://github.com/discue/mongodb-resource-client/commit/60450afa25224900a4ea30588e74498637ffaa47))
* delete unused compose file ([f6685e0](https://github.com/discue/mongodb-resource-client/commit/f6685e03ac9dc39cdb87c3e02e41b9da98b584f3))
* **deps-dev:** bump @discue/open-telemetry-tracing from 1.1.0 to 1.2.0 ([891c159](https://github.com/discue/mongodb-resource-client/commit/891c15953ead1a4c9dcc45168da462f38e5d9bf3))
* **deps-dev:** bump @discue/open-telemetry-tracing from 1.1.0 to 1.2.0 ([fa93f4a](https://github.com/discue/mongodb-resource-client/commit/fa93f4ab2ce2c0bdf5da3e44fe11739b9773cdbc))
* **deps-dev:** bump @discue/open-telemetry-tracing from 1.2.0 to 1.3.0 ([18bc53a](https://github.com/discue/mongodb-resource-client/commit/18bc53a0e49c8361c2c64686790cb641ce2f5fab))
* **deps-dev:** bump @discue/open-telemetry-tracing from 1.2.0 to 1.3.0 ([4496bcb](https://github.com/discue/mongodb-resource-client/commit/4496bcb9b2d1d85ceb7eff0f7172a01bbe5bce8a))
* **deps-dev:** bump @discue/open-telemetry-tracing from 1.3.0 to 1.4.0 ([523ecd9](https://github.com/discue/mongodb-resource-client/commit/523ecd90ba8d01ff0422ba554b18cf066ebc952a))
* **deps-dev:** bump @discue/open-telemetry-tracing from 1.3.0 to 1.4.0 ([a1191a8](https://github.com/discue/mongodb-resource-client/commit/a1191a82bc41936c41449246ee0f87375cc8fa9c))
* **deps-dev:** bump @stylistic/eslint-plugin from 2.10.1 to 2.11.0 ([b82bb71](https://github.com/discue/mongodb-resource-client/commit/b82bb713538e57f400f2bbf489be9056f40c1dda))
* **deps-dev:** bump @stylistic/eslint-plugin from 2.10.1 to 2.11.0 ([33e8739](https://github.com/discue/mongodb-resource-client/commit/33e87396689ebbfa0df48381f7d0d2f4c6e4deb6))
* **deps-dev:** bump @stylistic/eslint-plugin from 2.11.0 to 4.1.0 ([b35f630](https://github.com/discue/mongodb-resource-client/commit/b35f6306803f046f2982a55b7ce80ab04d64d9cd))
* **deps-dev:** bump @stylistic/eslint-plugin from 2.11.0 to 4.1.0 ([7e00a87](https://github.com/discue/mongodb-resource-client/commit/7e00a87674d01f3ccfe4a6307e4f0674f99f5e99))
* **deps-dev:** bump @stylistic/eslint-plugin from 2.6.2 to 2.8.0 ([8991519](https://github.com/discue/mongodb-resource-client/commit/89915197ec3c09b9c000635600e04e37a60219ee))
* **deps-dev:** bump @stylistic/eslint-plugin from 2.6.2 to 2.8.0 ([3b8c0eb](https://github.com/discue/mongodb-resource-client/commit/3b8c0eb75fa9790c15cd3fab06800370671ebcf9))
* **deps-dev:** bump @stylistic/eslint-plugin from 2.8.0 to 2.10.1 ([dc3d3a5](https://github.com/discue/mongodb-resource-client/commit/dc3d3a5b363933c4b2a83cab1d64f6d3a23364a2))
* **deps-dev:** bump @stylistic/eslint-plugin from 2.8.0 to 2.10.1 ([3079b4f](https://github.com/discue/mongodb-resource-client/commit/3079b4f213e7e36fba0f672f30b796df9f66fdbc))
* **deps-dev:** bump @stylistic/eslint-plugin from 4.1.0 to 4.2.0 ([6fe25c6](https://github.com/discue/mongodb-resource-client/commit/6fe25c65a011742f234ec282a7bbd7c15f979aee))
* **deps-dev:** bump @stylistic/eslint-plugin from 4.1.0 to 4.2.0 ([e74c8c0](https://github.com/discue/mongodb-resource-client/commit/e74c8c05f61fe8a4e1dc8ef41d77d6670002acac))
* **deps-dev:** bump @stylistic/eslint-plugin from 4.2.0 to 4.4.0 ([1adc072](https://github.com/discue/mongodb-resource-client/commit/1adc0729ef0a5fce5a00f6a06b4e7401bd15a5a5))
* **deps-dev:** bump @stylistic/eslint-plugin from 4.2.0 to 4.4.0 ([20d568d](https://github.com/discue/mongodb-resource-client/commit/20d568df4e7b982ef09d2f90f6371b1ad3fcdbb7))
* **deps-dev:** bump @stylistic/eslint-plugin from 4.4.0 to 5.2.2 ([8ef10d4](https://github.com/discue/mongodb-resource-client/commit/8ef10d47bf2688f2759b4742408e262aa9764e3e))
* **deps-dev:** bump @stylistic/eslint-plugin from 4.4.0 to 5.2.2 ([c86a620](https://github.com/discue/mongodb-resource-client/commit/c86a620e1ecb936822ea094397c1d3ef60560497))
* **deps-dev:** bump @stylistic/eslint-plugin from 5.2.2 to 5.3.1 ([1e483b6](https://github.com/discue/mongodb-resource-client/commit/1e483b6367a3c69751345b8445ef600f65dac39e))
* **deps-dev:** bump @stylistic/eslint-plugin from 5.2.2 to 5.3.1 ([3c980db](https://github.com/discue/mongodb-resource-client/commit/3c980db2587ba6e62c23bc60041af35d3ae3dace))
* **deps-dev:** bump @stylistic/eslint-plugin from 5.3.1 to 5.4.0 ([e0ad362](https://github.com/discue/mongodb-resource-client/commit/e0ad36259ec57ae318f8cb7a0ba376a773850d99))
* **deps-dev:** bump @stylistic/eslint-plugin from 5.3.1 to 5.4.0 ([a85c0b9](https://github.com/discue/mongodb-resource-client/commit/a85c0b978520049dcecead7446a1947e91375729))
* **deps-dev:** bump @stylistic/eslint-plugin from 5.4.0 to 5.5.0 ([45e64b7](https://github.com/discue/mongodb-resource-client/commit/45e64b7443111f72a5e32a58d17e3185ef42bc4c))
* **deps-dev:** bump @stylistic/eslint-plugin from 5.4.0 to 5.5.0 ([f0d016c](https://github.com/discue/mongodb-resource-client/commit/f0d016c6cb07dc26e43a108130dad6c3572f5370))
* **deps-dev:** bump @stylistic/eslint-plugin from 5.5.0 to 5.6.1 ([6ba4cd5](https://github.com/discue/mongodb-resource-client/commit/6ba4cd5fb08fc7352cb6491ae3618f69f156a652))
* **deps-dev:** bump @stylistic/eslint-plugin from 5.5.0 to 5.6.1 ([745d7ab](https://github.com/discue/mongodb-resource-client/commit/745d7ab14dd8ad54e3d41b6c548902d94cf61920))
* **deps-dev:** bump @stylistic/eslint-plugin from 5.6.1 to 5.7.1 ([69faf94](https://github.com/discue/mongodb-resource-client/commit/69faf94dde02347082c687df331ee59ecafdec73))
* **deps-dev:** bump @stylistic/eslint-plugin from 5.6.1 to 5.7.1 ([1b0b5ef](https://github.com/discue/mongodb-resource-client/commit/1b0b5ef149b1b6a258fa0006a6f094ffee4fb6e8))
* **deps-dev:** bump @stylistic/eslint-plugin from 5.7.1 to 5.9.0 ([31a7f30](https://github.com/discue/mongodb-resource-client/commit/31a7f30522efffcc174076a3a635e26d50364319))
* **deps-dev:** bump @stylistic/eslint-plugin from 5.7.1 to 5.9.0 ([59b5ede](https://github.com/discue/mongodb-resource-client/commit/59b5edea4a127991bed41cf55959df4dfc930787))
* **deps-dev:** bump @types/chai from 4.3.6 to 4.3.9 ([eba2e70](https://github.com/discue/mongodb-resource-client/commit/eba2e7084410d2070ea6d8bdb4b7845e765aa894))
* **deps-dev:** bump @types/chai from 4.3.6 to 4.3.9 ([699ec7f](https://github.com/discue/mongodb-resource-client/commit/699ec7fef128485aec9ddf660bdee52469ee4ae4))
* **deps-dev:** bump @types/mocha from 10.0.7 to 10.0.8 ([0563b9f](https://github.com/discue/mongodb-resource-client/commit/0563b9f8e5243ad71d520d3efa5e7c0d0b958b4a))
* **deps-dev:** bump @types/mocha from 10.0.7 to 10.0.8 ([4fcee75](https://github.com/discue/mongodb-resource-client/commit/4fcee75e890c45a99ebecae8d24a51bd5f13a597))
* **deps-dev:** bump @types/mocha from 10.0.9 to 10.0.10 ([d2eceaa](https://github.com/discue/mongodb-resource-client/commit/d2eceaaf55d44989d8b5edcf4a5ea7d9d5dbe1b7))
* **deps-dev:** bump @types/mocha from 10.0.9 to 10.0.10 ([f52aa8b](https://github.com/discue/mongodb-resource-client/commit/f52aa8b31d727597563119b497b8db7846496651))
* **deps-dev:** bump @types/node from 20.10.4 to 20.10.6 ([a32833a](https://github.com/discue/mongodb-resource-client/commit/a32833ae5b85118ce3bb7937687095494aed3d68))
* **deps-dev:** bump @types/node from 20.10.4 to 20.10.6 ([2da550c](https://github.com/discue/mongodb-resource-client/commit/2da550c240fd71e8f459d39921045bbc5c230188))
* **deps-dev:** bump @types/node from 20.11.17 to 20.11.24 ([ad02284](https://github.com/discue/mongodb-resource-client/commit/ad022840eccf3e72644a996c5fbdfbdf4a157301))
* **deps-dev:** bump @types/node from 20.11.17 to 20.11.24 ([b86a2e0](https://github.com/discue/mongodb-resource-client/commit/b86a2e06b5b3234525d3e22f4db162fafb6f8687))
* **deps-dev:** bump @types/node from 20.12.12 to 20.13.0 ([d1e3da4](https://github.com/discue/mongodb-resource-client/commit/d1e3da47fd58cfaa5504a5ba9ee34fc9388e2c6b))
* **deps-dev:** bump @types/node from 20.12.2 to 20.12.7 ([49cb015](https://github.com/discue/mongodb-resource-client/commit/49cb015a232c549fc83032d67f202d9439be6f62))
* **deps-dev:** bump @types/node from 20.12.2 to 20.12.7 ([2ac56da](https://github.com/discue/mongodb-resource-client/commit/2ac56dab31cb28d7a8faa92f5740d8fbe9b04cf7))
* **deps-dev:** bump @types/node from 20.14.10 to 22.0.2 ([a14cf3e](https://github.com/discue/mongodb-resource-client/commit/a14cf3eaeb8989b3a02fe27a27f85de847bffd67))
* **deps-dev:** bump @types/node from 20.14.10 to 22.0.2 ([3ada0ca](https://github.com/discue/mongodb-resource-client/commit/3ada0ca4be3665cda1eee2a6b3e9aa44e79a8520))
* **deps-dev:** bump @types/node from 20.14.2 to 20.14.9 ([d3203ea](https://github.com/discue/mongodb-resource-client/commit/d3203ea1e5f7ca2fdb4d399afdbcc481b6d5c72e))
* **deps-dev:** bump @types/node from 20.14.2 to 20.14.9 ([3240df5](https://github.com/discue/mongodb-resource-client/commit/3240df53255b811dd90e6938446302db3565be6d))
* **deps-dev:** bump @types/node from 20.6.2 to 20.8.0 ([b0e7486](https://github.com/discue/mongodb-resource-client/commit/b0e7486cf48b060de77f0dd58f4f419bf7442079))
* **deps-dev:** bump @types/node from 20.6.2 to 20.8.0 ([b7746d3](https://github.com/discue/mongodb-resource-client/commit/b7746d389e59f631986efe0946c4076448a4422e))
* **deps-dev:** bump @types/node from 20.8.0 to 20.8.10 ([2ac3dba](https://github.com/discue/mongodb-resource-client/commit/2ac3dba2b7c95fb3c03cc6bd209382559e072cad))
* **deps-dev:** bump @types/node from 20.8.0 to 20.8.10 ([7a9bec7](https://github.com/discue/mongodb-resource-client/commit/7a9bec75f64c1625d1780a040d4b98f958beb869))
* **deps-dev:** bump @types/node from 22.0.2 to 22.5.1 ([b195f83](https://github.com/discue/mongodb-resource-client/commit/b195f8360eae9b4cad529f37207f34f70bdb8efa))
* **deps-dev:** bump @types/node from 22.0.2 to 22.5.1 ([3f4e63a](https://github.com/discue/mongodb-resource-client/commit/3f4e63aa502539ef054d37bf1a8dfcc7609d7bee))
* **deps-dev:** bump @types/node from 22.10.1 to 22.10.3 ([12c5148](https://github.com/discue/mongodb-resource-client/commit/12c51485d2c98de61f556d5c023c489934500c9f))
* **deps-dev:** bump @types/node from 22.10.1 to 22.10.3 ([def2511](https://github.com/discue/mongodb-resource-client/commit/def25111a3f0715cbf9b42f56e6d6f6ee5cae106))
* **deps-dev:** bump @types/node from 22.10.3 to 22.13.0 ([5cdef62](https://github.com/discue/mongodb-resource-client/commit/5cdef62119c6fdb163a930557f63752aaf8e75ab))
* **deps-dev:** bump @types/node from 22.10.3 to 22.13.0 ([60e5e64](https://github.com/discue/mongodb-resource-client/commit/60e5e647e644b84e51a12b3a04ce7638c81263dd))
* **deps-dev:** bump @types/node from 22.13.0 to 22.13.8 ([2e7bdb7](https://github.com/discue/mongodb-resource-client/commit/2e7bdb7a97220fe7a1154f0ee434441f56e9109a))
* **deps-dev:** bump @types/node from 22.13.0 to 22.13.8 ([0b6a11e](https://github.com/discue/mongodb-resource-client/commit/0b6a11edd9c4aeacb23a8b3b7d42007ea6bc4b7b))
* **deps-dev:** bump @types/node from 22.13.16 to 22.15.3 ([bbdb115](https://github.com/discue/mongodb-resource-client/commit/bbdb115dfcfbafb356b9d6ac66fa886375ad2389))
* **deps-dev:** bump @types/node from 22.13.16 to 22.15.3 ([06a6680](https://github.com/discue/mongodb-resource-client/commit/06a668025e35d723bd5da44b874ab0f08feebfef))
* **deps-dev:** bump @types/node from 22.13.8 to 22.13.16 ([90b9497](https://github.com/discue/mongodb-resource-client/commit/90b9497331c11f572861f942bd0a73c869fcbf61))
* **deps-dev:** bump @types/node from 22.13.8 to 22.13.16 ([dcf6c6e](https://github.com/discue/mongodb-resource-client/commit/dcf6c6e3024a3c78e02374f0a69658df5948b687))
* **deps-dev:** bump @types/node from 22.15.29 to 24.0.8 ([56f24c2](https://github.com/discue/mongodb-resource-client/commit/56f24c2ac3799ce8e6caa7f70ad4b5eeb99d5385))
* **deps-dev:** bump @types/node from 22.15.29 to 24.0.8 ([e033aa6](https://github.com/discue/mongodb-resource-client/commit/e033aa65a863fbcdf6a65b8bd74d6baf9dc1774d))
* **deps-dev:** bump @types/node from 22.15.3 to 22.15.29 ([e614148](https://github.com/discue/mongodb-resource-client/commit/e6141489952d63f580ec35b7ec0eafcc269c3888))
* **deps-dev:** bump @types/node from 22.15.3 to 22.15.29 ([ccbddb6](https://github.com/discue/mongodb-resource-client/commit/ccbddb68ef3a1ee0c75d53f79169fcd08131b1c4))
* **deps-dev:** bump @types/node from 22.5.1 to 22.7.4 ([0533385](https://github.com/discue/mongodb-resource-client/commit/05333857f1f1e72e9d132d6d0162767d965165da))
* **deps-dev:** bump @types/node from 22.5.1 to 22.7.4 ([e95c28b](https://github.com/discue/mongodb-resource-client/commit/e95c28b673fcc7193ba237df72eb7bca815abd89))
* **deps-dev:** bump @types/node from 22.7.4 to 22.8.6 ([0a20d9a](https://github.com/discue/mongodb-resource-client/commit/0a20d9aa08cfc61bbfc7c42daf5a010356a06cf9))
* **deps-dev:** bump @types/node from 22.7.4 to 22.8.6 ([4de10fa](https://github.com/discue/mongodb-resource-client/commit/4de10fa8037573652c5c35e0248d33761c42b7f6))
* **deps-dev:** bump @types/node from 22.8.6 to 22.10.1 ([579e56a](https://github.com/discue/mongodb-resource-client/commit/579e56a30040c12b703ec637f2709c860f7e878a))
* **deps-dev:** bump @types/node from 22.8.6 to 22.10.1 ([0f6dd01](https://github.com/discue/mongodb-resource-client/commit/0f6dd01d3fb74c7f41e1e0eb700f95d731e273ac))
* **deps-dev:** bump @types/node from 24.0.8 to 24.1.0 ([c029c5b](https://github.com/discue/mongodb-resource-client/commit/c029c5b645b3cc45c37823c03f099a5e95a8f69b))
* **deps-dev:** bump @types/node from 24.0.8 to 24.1.0 ([6933f4d](https://github.com/discue/mongodb-resource-client/commit/6933f4dc7e78087f9b6b412dff4b9d1395d69173))
* **deps-dev:** bump @types/node from 24.1.0 to 24.3.0 ([3c01ee1](https://github.com/discue/mongodb-resource-client/commit/3c01ee199e34e97f047918ccbc58b06c90b3fa47))
* **deps-dev:** bump @types/node from 24.1.0 to 24.3.0 ([88e2c25](https://github.com/discue/mongodb-resource-client/commit/88e2c25aecea167f80490d8f787a596f2646f826))
* **deps-dev:** bump @types/node from 24.3.0 to 24.6.1 ([06cd01e](https://github.com/discue/mongodb-resource-client/commit/06cd01eefc927ccb5964c77517f736cae8af4e17))
* **deps-dev:** bump @types/node from 24.3.0 to 24.6.1 ([36a49b3](https://github.com/discue/mongodb-resource-client/commit/36a49b3933ee83d188138184fe107bd1134f5551))
* **deps-dev:** bump @types/node from 24.6.1 to 24.9.2 ([679d8e7](https://github.com/discue/mongodb-resource-client/commit/679d8e767a34366a27cddabaff6e9b4d44264f4d))
* **deps-dev:** bump @types/node from 24.6.1 to 24.9.2 ([442d9fa](https://github.com/discue/mongodb-resource-client/commit/442d9fa380861f1859b58ce212abc8bab4074954))
* **deps-dev:** bump @types/node from 24.9.2 to 24.10.1 ([1fbec2f](https://github.com/discue/mongodb-resource-client/commit/1fbec2f9d422fd512568c99c568e20a56b88a0dd))
* **deps-dev:** bump @types/node from 24.9.2 to 24.10.1 ([dfbd66b](https://github.com/discue/mongodb-resource-client/commit/dfbd66b2440a441747a9d90b574e33b15d5c3507))
* **deps-dev:** bump @types/node from 25.0.2 to 25.0.3 ([43bdd44](https://github.com/discue/mongodb-resource-client/commit/43bdd449c2a5b4391cbb4d111237f478e4dc6e92))
* **deps-dev:** bump @types/node from 25.0.2 to 25.0.3 ([85e7325](https://github.com/discue/mongodb-resource-client/commit/85e73255187ff45ff0f1fa580872845ebbd86d97))
* **deps-dev:** bump @types/node from 25.0.3 to 25.3.0 ([5005a8a](https://github.com/discue/mongodb-resource-client/commit/5005a8a1ac6fa7a5c5a1aeac87d7b250ea9cb56d))
* **deps-dev:** bump @types/node from 25.0.3 to 25.3.0 ([4be6937](https://github.com/discue/mongodb-resource-client/commit/4be693737c8f0895c13402d214887b3dffb10164))
* **deps-dev:** bump @types/node from 25.3.0 to 25.3.3 ([6e5a297](https://github.com/discue/mongodb-resource-client/commit/6e5a297ccff9c2f4b77aa45a29ab03c9767d2dfc))
* **deps-dev:** bump @types/node from 25.3.0 to 25.3.3 ([85e9d48](https://github.com/discue/mongodb-resource-client/commit/85e9d483381ff41bc4215710853802c0140fa26d))
* **deps-dev:** bump @types/node from 25.5.0 to 25.6.0 ([1b4f37c](https://github.com/discue/mongodb-resource-client/commit/1b4f37c36b45864d8371224b1299fdbf661d7a90))
* **deps-dev:** bump @types/node from 25.5.0 to 25.6.0 ([20a3361](https://github.com/discue/mongodb-resource-client/commit/20a33612266a4850c9f472b32f2dc65c1c0ba73e))
* **deps-dev:** bump @types/node from 25.6.0 to 26.0.1 ([ac17f72](https://github.com/discue/mongodb-resource-client/commit/ac17f725f5aa841dd1da95ea6dafd4ec8108fd58))
* **deps-dev:** bump @types/node from 25.6.0 to 26.0.1 ([ff3efee](https://github.com/discue/mongodb-resource-client/commit/ff3efee73637d845da603bbca2f8bcf7de479d2a))
* **deps-dev:** bump @types/node from 26.0.1 to 26.1.2 ([564e863](https://github.com/discue/mongodb-resource-client/commit/564e863770a96b4340bca371d37e6b95d36a2028))
* **deps-dev:** bump @types/node from 26.0.1 to 26.1.2 ([6788e6c](https://github.com/discue/mongodb-resource-client/commit/6788e6ccc5605940c0fa61b355502d5ed51c0c87))
* **deps-dev:** bump @types/node from 26.1.2 to 26.4.0 ([c8b21ff](https://github.com/discue/mongodb-resource-client/commit/c8b21ffc2d79fbea9d7be1e59c1460acde0bf0c7))
* **deps-dev:** bump @types/node from 26.1.2 to 26.4.0 ([a3429c6](https://github.com/discue/mongodb-resource-client/commit/a3429c6eaa74ccd45f75d0b73c49bfecb029d92b))
* **deps-dev:** bump chai from 4.3.10 to 5.1.0 ([9b6b1c7](https://github.com/discue/mongodb-resource-client/commit/9b6b1c75a56bde824c03745b28798fa216e2d08e))
* **deps-dev:** bump chai from 4.3.10 to 5.1.0 ([25a4226](https://github.com/discue/mongodb-resource-client/commit/25a42260b3a6aac4c8645e527dc1cf42629d4cd6))
* **deps-dev:** bump chai from 4.3.8 to 4.3.10 ([aaeadd9](https://github.com/discue/mongodb-resource-client/commit/aaeadd98584c0328aafd93063161a1d8893d4353))
* **deps-dev:** bump chai from 4.3.8 to 4.3.10 ([0b4f7e3](https://github.com/discue/mongodb-resource-client/commit/0b4f7e3fefc14f725cee8b638d46463753bbde34))
* **deps-dev:** bump eslint from 10.1.0 to 10.2.1 ([23986fe](https://github.com/discue/mongodb-resource-client/commit/23986fe32411a7a1f17d53d0583e4b456490bdb7))
* **deps-dev:** bump eslint from 10.1.0 to 10.2.1 ([7f4d4e9](https://github.com/discue/mongodb-resource-client/commit/7f4d4e90ffa59ab6bc675503feb53f15dac0744e))
* **deps-dev:** bump eslint from 10.2.1 to 10.4.1 ([35a2ac2](https://github.com/discue/mongodb-resource-client/commit/35a2ac25b284d5e594c7748f4e35167017d09a62))
* **deps-dev:** bump eslint from 10.2.1 to 10.4.1 ([1528f5b](https://github.com/discue/mongodb-resource-client/commit/1528f5b194231394a2341a581f67d3754750f658))
* **deps-dev:** bump eslint from 10.4.1 to 10.11.0 ([dbcfde8](https://github.com/discue/mongodb-resource-client/commit/dbcfde8371f6be8dd2b0edace9c6e350c1ceef66))
* **deps-dev:** bump eslint from 10.4.1 to 10.11.0 ([185d362](https://github.com/discue/mongodb-resource-client/commit/185d3622f3db7ce9cd2a086b93ef1d0ae43aa8ec))
* **deps-dev:** bump eslint from 8.49.0 to 8.50.0 ([8281b1d](https://github.com/discue/mongodb-resource-client/commit/8281b1d01deb0ac5765b07289d4a0a76e453b954))
* **deps-dev:** bump eslint from 8.49.0 to 8.50.0 ([964188c](https://github.com/discue/mongodb-resource-client/commit/964188c402d3a64cdb9f93cb821499a520879d51))
* **deps-dev:** bump eslint from 8.50.0 to 8.52.0 ([823f795](https://github.com/discue/mongodb-resource-client/commit/823f795b166b1e0e3493a44787a78473a94282c2))
* **deps-dev:** bump eslint from 8.50.0 to 8.52.0 ([1a44981](https://github.com/discue/mongodb-resource-client/commit/1a449813e72adf10de1e62c43510b6751d4df5f4))
* **deps-dev:** bump eslint from 8.56.0 to 8.57.0 ([ec2512b](https://github.com/discue/mongodb-resource-client/commit/ec2512bb26adc660c8baa907b8d183deb6cc03ef))
* **deps-dev:** bump eslint from 8.56.0 to 8.57.0 ([6cec40c](https://github.com/discue/mongodb-resource-client/commit/6cec40ceadba415a35fbb5ab701ce67640d17903))
* **deps-dev:** bump eslint from 9.0.0 to 9.1.1 ([32094ce](https://github.com/discue/mongodb-resource-client/commit/32094ceb82567a5bf5a59f0bf52d82b9c0ab5ebe))
* **deps-dev:** bump eslint from 9.0.0 to 9.1.1 ([23b5b06](https://github.com/discue/mongodb-resource-client/commit/23b5b067252d40ae889e6a0143d51f714dc69b90))
* **deps-dev:** bump eslint from 9.13.0 to 9.16.0 ([5e8f1d1](https://github.com/discue/mongodb-resource-client/commit/5e8f1d1f8b147a4e156951ae08da4e77949c3b49))
* **deps-dev:** bump eslint from 9.13.0 to 9.16.0 ([8760b86](https://github.com/discue/mongodb-resource-client/commit/8760b8661e7ed1f591baee7a3420c7633df64007))
* **deps-dev:** bump eslint from 9.16.0 to 9.17.0 ([7f0b56a](https://github.com/discue/mongodb-resource-client/commit/7f0b56aab9d338830a04461ede906a5a3c5dc6ee))
* **deps-dev:** bump eslint from 9.16.0 to 9.17.0 ([ce86957](https://github.com/discue/mongodb-resource-client/commit/ce86957921a4152bcf2d495c7db6fb7036bbcaf0))
* **deps-dev:** bump eslint from 9.17.0 to 9.19.0 ([745846a](https://github.com/discue/mongodb-resource-client/commit/745846a27eb039f195b711687f069a3eac70d419))
* **deps-dev:** bump eslint from 9.17.0 to 9.19.0 ([5993668](https://github.com/discue/mongodb-resource-client/commit/59936687c9357663457fec50464e662f3ae398e7))
* **deps-dev:** bump eslint from 9.19.0 to 9.23.0 ([ab4eb58](https://github.com/discue/mongodb-resource-client/commit/ab4eb5816cbb0c8f8ba6c094012d11ab64ed15ee))
* **deps-dev:** bump eslint from 9.19.0 to 9.23.0 ([87d4ae2](https://github.com/discue/mongodb-resource-client/commit/87d4ae2a6a7fe19b303a22d2ccb5ab2c88021e50))
* **deps-dev:** bump eslint from 9.2.0 to 9.4.0 ([a1d2f37](https://github.com/discue/mongodb-resource-client/commit/a1d2f37d1d0f67dc449bf3791c958a0a408b8387))
* **deps-dev:** bump eslint from 9.23.0 to 9.25.1 ([4ab14d8](https://github.com/discue/mongodb-resource-client/commit/4ab14d8d755d53beace1cac5bbdcae482d3714b1))
* **deps-dev:** bump eslint from 9.23.0 to 9.25.1 ([6a59b4e](https://github.com/discue/mongodb-resource-client/commit/6a59b4eb954e4b64f6952883aa3c42c4639ed081))
* **deps-dev:** bump eslint from 9.25.1 to 9.28.0 ([ae72e97](https://github.com/discue/mongodb-resource-client/commit/ae72e9764fe95b07354c46c84b55727f09fb4cb4))
* **deps-dev:** bump eslint from 9.25.1 to 9.28.0 ([825f3fe](https://github.com/discue/mongodb-resource-client/commit/825f3fe09c9facf1f11aeb4bbbab89fa5d291be0))
* **deps-dev:** bump eslint from 9.28.0 to 9.30.0 ([8e6ba84](https://github.com/discue/mongodb-resource-client/commit/8e6ba84c7fca223c4fa00a92160469810c2a0177))
* **deps-dev:** bump eslint from 9.28.0 to 9.30.0 ([7e424e0](https://github.com/discue/mongodb-resource-client/commit/7e424e03a1335c87227022d8b0d52b40d58ed4fb))
* **deps-dev:** bump eslint from 9.30.1 to 9.32.0 ([1e24bd4](https://github.com/discue/mongodb-resource-client/commit/1e24bd4dab277e884625211e9bc6b6e4b19deb70))
* **deps-dev:** bump eslint from 9.30.1 to 9.32.0 ([49d2c97](https://github.com/discue/mongodb-resource-client/commit/49d2c9741745ab6fe7769f2c83acfe737484ad7a))
* **deps-dev:** bump eslint from 9.32.0 to 9.34.0 ([88587d3](https://github.com/discue/mongodb-resource-client/commit/88587d313d5b985d912dda13ea62ec1738393ffb))
* **deps-dev:** bump eslint from 9.32.0 to 9.34.0 ([286c0a8](https://github.com/discue/mongodb-resource-client/commit/286c0a8d7b695bb0b8f545c404a00e9c7ab9ce2d))
* **deps-dev:** bump eslint from 9.34.0 to 9.39.0 ([3fb6b12](https://github.com/discue/mongodb-resource-client/commit/3fb6b12e595a45d0ce908f8494ba6b7d78a690b5))
* **deps-dev:** bump eslint from 9.34.0 to 9.39.0 ([a727608](https://github.com/discue/mongodb-resource-client/commit/a727608db834cf36bdf9d302cbb0d9eca4bcefca))
* **deps-dev:** bump eslint from 9.39.0 to 9.39.2 ([0cfc7a3](https://github.com/discue/mongodb-resource-client/commit/0cfc7a33c213d5132621184d72a788ed10f0600c))
* **deps-dev:** bump eslint from 9.39.0 to 9.39.2 ([496f1df](https://github.com/discue/mongodb-resource-client/commit/496f1dfd83a09cacb44d3c86b56f35ad5a6e3157))
* **deps-dev:** bump eslint from 9.5.0 to 9.6.0 ([3333f21](https://github.com/discue/mongodb-resource-client/commit/3333f21b3b5984091ba6f91f9e0c7d5dd615a9cd))
* **deps-dev:** bump eslint from 9.5.0 to 9.6.0 ([16e886c](https://github.com/discue/mongodb-resource-client/commit/16e886c3f9592c79ebaf4cf5a573621fa3777465))
* **deps-dev:** bump eslint from 9.6.0 to 9.8.0 ([fad8540](https://github.com/discue/mongodb-resource-client/commit/fad854048f057b14d943d4cd5010c406fc76e6f0))
* **deps-dev:** bump eslint from 9.6.0 to 9.8.0 ([7ce0d82](https://github.com/discue/mongodb-resource-client/commit/7ce0d8284b8f2f24290f3636bcbf7925123cae1b))
* **deps-dev:** bump eslint from 9.8.0 to 9.9.1 ([26fc58e](https://github.com/discue/mongodb-resource-client/commit/26fc58eb7fce0c3ef60506f687ea348c6bc28220))
* **deps-dev:** bump eslint from 9.8.0 to 9.9.1 ([3fc7101](https://github.com/discue/mongodb-resource-client/commit/3fc71018d71d9cef5f405a80164a624c39bd8496))
* **deps-dev:** bump eslint from 9.9.1 to 9.13.0 ([2f91dcc](https://github.com/discue/mongodb-resource-client/commit/2f91dccc0c32df4ae0684bbcb94ed493d6358dcf))
* **deps-dev:** bump eslint from 9.9.1 to 9.13.0 ([61255c2](https://github.com/discue/mongodb-resource-client/commit/61255c21bc52f24a094945a66c0ee89d7364f30d))
* **deps-dev:** bump eslint-plugin-jsdoc from 50.0.1 to 50.2.2 ([b01f7df](https://github.com/discue/mongodb-resource-client/commit/b01f7df1e0d2c357e6ee931337f48eee0b57d6cf))
* **deps-dev:** bump eslint-plugin-jsdoc from 50.0.1 to 50.2.2 ([94915f4](https://github.com/discue/mongodb-resource-client/commit/94915f40400c6299407de03d96c94da944824e23))
* **deps-dev:** bump eslint-plugin-jsdoc from 50.2.2 to 50.6.3 ([56b2865](https://github.com/discue/mongodb-resource-client/commit/56b286509b6265997c8b0e865a84e81960779781))
* **deps-dev:** bump eslint-plugin-jsdoc from 50.2.2 to 50.6.3 ([16419c2](https://github.com/discue/mongodb-resource-client/commit/16419c2fe7029a1a6d8ab3c4e632079715733c22))
* **deps-dev:** bump eslint-plugin-jsdoc from 50.6.11 to 50.7.0 ([369d0b7](https://github.com/discue/mongodb-resource-client/commit/369d0b7659c00c78c701bb9b75c7b0206446c09e))
* **deps-dev:** bump eslint-plugin-jsdoc from 50.6.11 to 50.7.0 ([d99e030](https://github.com/discue/mongodb-resource-client/commit/d99e030af14b5184e647831eb6b42e75e61b9382))
* **deps-dev:** bump eslint-plugin-jsdoc from 50.6.3 to 50.6.9 ([4d1f493](https://github.com/discue/mongodb-resource-client/commit/4d1f49331a488432a84fb3ca10124e8be15068c5))
* **deps-dev:** bump eslint-plugin-jsdoc from 50.6.3 to 50.6.9 ([304e14c](https://github.com/discue/mongodb-resource-client/commit/304e14c3593b89e76ae887e7ccfd2f0bbdc50120))
* **deps-dev:** bump eslint-plugin-jsdoc from 50.6.9 to 50.6.11 ([ddbd022](https://github.com/discue/mongodb-resource-client/commit/ddbd022ea1c42163bfc31d3a25c5547e8ad288f9))
* **deps-dev:** bump eslint-plugin-jsdoc from 50.6.9 to 50.6.11 ([96cd0e7](https://github.com/discue/mongodb-resource-client/commit/96cd0e77c3bddec33b49a162c56b6df7924ccc0b))
* **deps-dev:** bump eslint-plugin-jsdoc from 50.7.0 to 51.3.1 ([d517934](https://github.com/discue/mongodb-resource-client/commit/d5179341578bea77fbb22c5bf256c3c753c4949d))
* **deps-dev:** bump eslint-plugin-jsdoc from 50.7.0 to 51.3.1 ([b982e64](https://github.com/discue/mongodb-resource-client/commit/b982e64e8b0cf6d50e542d542c1f04544a8113af))
* **deps-dev:** bump eslint-plugin-jsdoc from 51.3.1 to 52.0.2 ([274b8f8](https://github.com/discue/mongodb-resource-client/commit/274b8f80a72ee003c725378922383c461103122f))
* **deps-dev:** bump eslint-plugin-jsdoc from 51.3.1 to 52.0.2 ([b13bc02](https://github.com/discue/mongodb-resource-client/commit/b13bc021d438112c18bdb704ef5937c8f38d862b))
* **deps-dev:** bump eslint-plugin-jsdoc from 52.0.2 to 54.1.1 ([041a732](https://github.com/discue/mongodb-resource-client/commit/041a7325f4a10992ce2e4d3d6ff0d0bcd285f9c2))
* **deps-dev:** bump eslint-plugin-jsdoc from 52.0.2 to 54.1.1 ([f5a21d3](https://github.com/discue/mongodb-resource-client/commit/f5a21d364c0cc026565e668c3e74b343e5b72162))
* **deps-dev:** bump eslint-plugin-jsdoc from 54.1.1 to 60.6.0 ([8206436](https://github.com/discue/mongodb-resource-client/commit/82064363faa002dcfdd6051bc738781304cfabbf))
* **deps-dev:** bump eslint-plugin-jsdoc from 54.1.1 to 60.6.0 ([6f9573b](https://github.com/discue/mongodb-resource-client/commit/6f9573badfec938c8498345aedf382193b54686b))
* **deps-dev:** bump eslint-plugin-jsdoc from 60.7.0 to 61.1.11 ([d0eecbe](https://github.com/discue/mongodb-resource-client/commit/d0eecbe81544feafbdac7bb3afb56d18fce1a84f))
* **deps-dev:** bump eslint-plugin-jsdoc from 60.7.0 to 61.1.11 ([968e1f7](https://github.com/discue/mongodb-resource-client/commit/968e1f7bcc6dc8edb573cbb4cbc2818ec9d6d64f))
* **deps-dev:** bump eslint-plugin-jsdoc from 61.1.11 to 61.4.1 ([0aea28d](https://github.com/discue/mongodb-resource-client/commit/0aea28d48b36ee8de01058838a77b490a3ba5fe2))
* **deps-dev:** bump eslint-plugin-jsdoc from 61.1.11 to 61.4.1 ([477ef08](https://github.com/discue/mongodb-resource-client/commit/477ef08a3e87f546010ed632fcdffa2d75d5fdd6))
* **deps-dev:** bump eslint-plugin-jsdoc from 61.4.1 to 61.5.0 ([ddcc29d](https://github.com/discue/mongodb-resource-client/commit/ddcc29d74aaf8dd4698ef7587da9a6957bb16bc4))
* **deps-dev:** bump eslint-plugin-jsdoc from 61.4.1 to 61.5.0 ([1b0a479](https://github.com/discue/mongodb-resource-client/commit/1b0a479660b883605a9f775694b7d849f2fef501))
* **deps-dev:** bump eslint-plugin-jsdoc from 61.5.0 to 62.7.0 ([b0edefe](https://github.com/discue/mongodb-resource-client/commit/b0edefe2c61c8a51003b8c19c8c1d9b75f809fc5))
* **deps-dev:** bump eslint-plugin-jsdoc from 61.5.0 to 62.7.0 ([b0eefbc](https://github.com/discue/mongodb-resource-client/commit/b0eefbc05dc4b45518f058bc5ac098d6e8414b6d))
* **deps-dev:** bump eslint-plugin-jsdoc from 62.7.0 to 62.7.1 ([dfc74b9](https://github.com/discue/mongodb-resource-client/commit/dfc74b9e6cb173bae86015be870aeba4f18858e5))
* **deps-dev:** bump eslint-plugin-jsdoc from 62.7.0 to 62.7.1 ([97dce49](https://github.com/discue/mongodb-resource-client/commit/97dce49028e3fe3bf23e17e949ee2a455c738bba))
* **deps-dev:** bump eslint-plugin-jsdoc from 62.8.1 to 62.9.0 ([a8fe80c](https://github.com/discue/mongodb-resource-client/commit/a8fe80c0a059021457772c5e8f2b570c94e816b1))
* **deps-dev:** bump eslint-plugin-jsdoc from 62.8.1 to 62.9.0 ([8c10b7e](https://github.com/discue/mongodb-resource-client/commit/8c10b7e5e05b8dd03e71a61cb34e2e82c3a801be))
* **deps-dev:** bump eslint-plugin-jsdoc from 62.9.0 to 63.0.1 ([09a3cd5](https://github.com/discue/mongodb-resource-client/commit/09a3cd5ed24ff19777f24d9aa03f429156a83cc3))
* **deps-dev:** bump eslint-plugin-jsdoc from 62.9.0 to 63.0.1 ([2014cd0](https://github.com/discue/mongodb-resource-client/commit/2014cd00fd0cfd09f5281d56ce5b059986b1c1d5))
* **deps-dev:** bump eslint-plugin-jsdoc from 63.0.1 to 63.0.10 ([ed1b95b](https://github.com/discue/mongodb-resource-client/commit/ed1b95b1aa7e906d9a4a4429b1bdd2a19058d939))
* **deps-dev:** bump eslint-plugin-jsdoc from 63.0.1 to 63.0.10 ([2f3e1b7](https://github.com/discue/mongodb-resource-client/commit/2f3e1b72c59afa302b1163d28bd96ba3cd1aa10f))
* **deps-dev:** bump eslint-plugin-jsdoc from 63.0.10 to 63.3.2 ([529ac71](https://github.com/discue/mongodb-resource-client/commit/529ac713989413df05a5c5e49a27387e1c428d17))
* **deps-dev:** bump eslint-plugin-jsdoc from 63.0.10 to 63.3.2 ([7a0aadf](https://github.com/discue/mongodb-resource-client/commit/7a0aadf43a57a0d80dc8a923d5143a0e2ce86d02))
* **deps-dev:** bump eslint-plugin-jsdoc from 63.3.2 to 64.2.1 ([b12044a](https://github.com/discue/mongodb-resource-client/commit/b12044a407c92071015a98c7f5b7b1ceb151bb35))
* **deps-dev:** bump eslint-plugin-jsdoc from 63.3.2 to 64.2.1 ([b820f6b](https://github.com/discue/mongodb-resource-client/commit/b820f6ba5bea82aca141121126eeee77604e0fe3))
* **deps-dev:** bump globals from 17.4.0 to 17.5.0 ([5d4bd24](https://github.com/discue/mongodb-resource-client/commit/5d4bd248a5f0dfcd94fe1aef36f8939acb6e13e2))
* **deps-dev:** bump globals from 17.4.0 to 17.5.0 ([73db408](https://github.com/discue/mongodb-resource-client/commit/73db4086cdcc8c9ba89bdfe01c20465d4e60bfef))
* **deps-dev:** bump globals from 17.5.0 to 17.6.0 ([62e9654](https://github.com/discue/mongodb-resource-client/commit/62e965484dc0c4e09969d26f4254dafa5e68d734))
* **deps-dev:** bump globals from 17.5.0 to 17.6.0 ([ecd8189](https://github.com/discue/mongodb-resource-client/commit/ecd81891e3c96219ca11f96aab8defc675c1a2a8))
* **deps-dev:** bump globals from 17.6.0 to 17.7.0 ([7b7b8c7](https://github.com/discue/mongodb-resource-client/commit/7b7b8c70da91015b26b499e12f12b014c9c0e2bf))
* **deps-dev:** bump globals from 17.6.0 to 17.7.0 ([afd7205](https://github.com/discue/mongodb-resource-client/commit/afd7205ef9a3ca9745f9ba735211e8eca67a01e6))
* **deps-dev:** bump globals from 17.7.0 to 17.8.0 ([0ce3833](https://github.com/discue/mongodb-resource-client/commit/0ce383337901a8fcf8a37c55e7cfd43bf449dc1c))
* **deps-dev:** bump globals from 17.7.0 to 17.8.0 ([ca96ec5](https://github.com/discue/mongodb-resource-client/commit/ca96ec5bfbdb55f20b2e4dc87218882588b0ea86))
* **deps-dev:** bump globals from 17.8.0 to 17.11.0 ([bc4f918](https://github.com/discue/mongodb-resource-client/commit/bc4f918cce5f19e7ac26366a126505bf677c0214))
* **deps-dev:** bump globals from 17.8.0 to 17.11.0 ([435470c](https://github.com/discue/mongodb-resource-client/commit/435470ccb47030f91d744ae10ccfb5c163d45ace))
* **deps-dev:** bump mocha and @types/mocha ([b828a8c](https://github.com/discue/mongodb-resource-client/commit/b828a8c72c9b0a2ac3cab3e756a21572c4895a3d))
* **deps-dev:** bump mocha and @types/mocha ([baf651c](https://github.com/discue/mongodb-resource-client/commit/baf651cc1c44e3d01fa776a3db1377401a8bb3da))
* **deps-dev:** bump mocha and @types/mocha ([3e0221f](https://github.com/discue/mongodb-resource-client/commit/3e0221f8192c5098262cef73f739e501804f0609))
* **deps-dev:** bump mocha and @types/mocha ([da49371](https://github.com/discue/mongodb-resource-client/commit/da493718499b388e485a2d59fd6cda011f2d8fa5))
* **deps-dev:** bump mocha from 10.6.0 to 10.7.0 ([41a9c88](https://github.com/discue/mongodb-resource-client/commit/41a9c882c134dfb09501be9c23097fba8ac36252))
* **deps-dev:** bump mocha from 10.6.0 to 10.7.0 ([4fb1345](https://github.com/discue/mongodb-resource-client/commit/4fb134573dde73f04ff9e354a179f3e3df543c71))
* **deps-dev:** bump mocha from 10.7.0 to 10.7.3 ([57c95d5](https://github.com/discue/mongodb-resource-client/commit/57c95d5c37c46285973efb4fa60dbff163334aad))
* **deps-dev:** bump mocha from 10.7.0 to 10.7.3 ([805fb0b](https://github.com/discue/mongodb-resource-client/commit/805fb0bc1f1c75d76e9b0025b406a14fd7052928))
* **deps-dev:** bump mocha from 10.8.2 to 11.0.1 ([373a14b](https://github.com/discue/mongodb-resource-client/commit/373a14b88cda46e71aba9b2cdca7d58a408a61c6))
* **deps-dev:** bump mocha from 10.8.2 to 11.0.1 ([d05f9b0](https://github.com/discue/mongodb-resource-client/commit/d05f9b08bc45acfb807c5ce1d4f6e6e8fe64bd24))
* **deps-dev:** bump mocha from 11.0.1 to 11.1.0 ([ad37b92](https://github.com/discue/mongodb-resource-client/commit/ad37b920ed505d95d985a804ffedc4e0c34f37c0))
* **deps-dev:** bump mocha from 11.0.1 to 11.1.0 ([f754a09](https://github.com/discue/mongodb-resource-client/commit/f754a09e23a1846013826741a6679205a5efc820))
* **deps-dev:** bump mocha from 11.1.0 to 11.5.0 ([8442b24](https://github.com/discue/mongodb-resource-client/commit/8442b24cfa56ab1616f72068e4d13f0f6066af49))
* **deps-dev:** bump mocha from 11.1.0 to 11.5.0 ([34390a6](https://github.com/discue/mongodb-resource-client/commit/34390a6e8ab9d5a7c49ab967e15597f2ea4c79f6))
* **deps-dev:** bump mocha from 11.5.0 to 11.7.1 ([e71b876](https://github.com/discue/mongodb-resource-client/commit/e71b87687451867913a448da8d59be2d37017e91))
* **deps-dev:** bump mocha from 11.5.0 to 11.7.1 ([b759c33](https://github.com/discue/mongodb-resource-client/commit/b759c3309395567b9fc6fe15acd9c3f934afe5e0))
* **deps-dev:** bump mocha from 11.7.1 to 11.7.4 ([eea7c72](https://github.com/discue/mongodb-resource-client/commit/eea7c7258780e16b63be3bec1b9ee0f10a6bf4fe))
* **deps-dev:** bump mocha from 11.7.1 to 11.7.4 ([ffaa517](https://github.com/discue/mongodb-resource-client/commit/ffaa5173628c55c4aec22fffe87a0cb25815b906))
* **deps-dev:** bump mocha from 11.7.4 to 11.7.5 ([bd46d55](https://github.com/discue/mongodb-resource-client/commit/bd46d55884f6d0b2b36743cd888d9b9f0ee87658))
* **deps-dev:** bump mocha from 11.7.4 to 11.7.5 ([20262bb](https://github.com/discue/mongodb-resource-client/commit/20262bbb29e5d59f472a53c66fd8389056336267))
* **deps-dev:** bump mocha from 11.7.5 to 11.7.6 ([2c82eb1](https://github.com/discue/mongodb-resource-client/commit/2c82eb12d3eabcb240185dbdeb955dbec34645cd))
* **deps-dev:** bump mocha from 11.7.5 to 11.7.6 ([362787b](https://github.com/discue/mongodb-resource-client/commit/362787b358405cf83ea6ab6aba91ea59562a8ae0))
* **deps-dev:** bump mocha from 11.7.6 to 11.8.0 ([c2ef9a3](https://github.com/discue/mongodb-resource-client/commit/c2ef9a3afefcb8764bba216103df09eb0ed6bd67))
* **deps-dev:** bump mocha from 11.7.6 to 11.8.0 ([6019c7d](https://github.com/discue/mongodb-resource-client/commit/6019c7d4cf11a762e4a5ef80ae2c6f3c34fd18d2))
* **deps-dev:** bump mocha from 11.8.0 to 12.0.2 ([282bc7f](https://github.com/discue/mongodb-resource-client/commit/282bc7fcc845aebdf5d8edb7a175258164136117))
* **deps-dev:** bump mocha from 11.8.0 to 12.0.2 ([63698b0](https://github.com/discue/mongodb-resource-client/commit/63698b03d364ae846b2f3c822a2887a35becea21))
* **deps-dev:** bump mongodb from 6.10.0 to 6.11.0 ([4dde0f0](https://github.com/discue/mongodb-resource-client/commit/4dde0f0a4196b7db74b893b7ab535853b9ae3749))
* **deps-dev:** bump mongodb from 6.10.0 to 6.11.0 ([a3d996f](https://github.com/discue/mongodb-resource-client/commit/a3d996fa62ecda7ce04e17b3aa3bb2df0761fe71))
* **deps-dev:** bump mongodb from 6.11.0 to 6.12.0 ([827901a](https://github.com/discue/mongodb-resource-client/commit/827901a4957f575768cc38061eca6d2008bdeb2a))
* **deps-dev:** bump mongodb from 6.11.0 to 6.12.0 ([62c5c50](https://github.com/discue/mongodb-resource-client/commit/62c5c50e4dfb395236a093d5969559e3b443e7f8))
* **deps-dev:** bump mongodb from 6.12.0 to 6.13.0 ([29e91f6](https://github.com/discue/mongodb-resource-client/commit/29e91f60689c003e016b7e5bba48c2cd019e4937))
* **deps-dev:** bump mongodb from 6.12.0 to 6.13.0 ([c0f7209](https://github.com/discue/mongodb-resource-client/commit/c0f72095c7189c85e2ae7f1290a7ba28fa1658b6))
* **deps-dev:** bump mongodb from 6.13.0 to 6.16.0 ([cfa7037](https://github.com/discue/mongodb-resource-client/commit/cfa7037d6ddd8652e4e614f5a4beea79cecabf37))
* **deps-dev:** bump mongodb from 6.13.0 to 6.16.0 ([fd2ab34](https://github.com/discue/mongodb-resource-client/commit/fd2ab345187d0f6d861978ddbc03aeb5620c4ff9))
* **deps-dev:** bump mongodb from 6.16.0 to 6.19.0 ([ba06f24](https://github.com/discue/mongodb-resource-client/commit/ba06f247c14de01832183eae45c24c24191f0da0))
* **deps-dev:** bump mongodb from 6.16.0 to 6.19.0 ([3501570](https://github.com/discue/mongodb-resource-client/commit/3501570140f6b7079e42f99d02992985c15f708a))
* **deps-dev:** bump mongodb from 6.19.0 to 6.20.0 ([2633677](https://github.com/discue/mongodb-resource-client/commit/2633677e3b3705dc9e83e97525c40a0ae02ab4b5))
* **deps-dev:** bump mongodb from 6.19.0 to 6.20.0 ([1a71f7b](https://github.com/discue/mongodb-resource-client/commit/1a71f7b95b96c5550221a053148e929750626cc4))
* **deps-dev:** bump mongodb from 6.20.0 to 7.0.0 ([506787b](https://github.com/discue/mongodb-resource-client/commit/506787bba0400e371dab527c9d524f531da73c81))
* **deps-dev:** bump mongodb from 6.20.0 to 7.0.0 ([aae3e1f](https://github.com/discue/mongodb-resource-client/commit/aae3e1fb42c7b44ea8571927e9eb1387c035dafe))
* **deps-dev:** bump mongodb from 6.6.2 to 6.7.0 ([fa0728c](https://github.com/discue/mongodb-resource-client/commit/fa0728c46481ccdfd0e59e03b8e2e9e82778a031))
* **deps-dev:** bump mongodb from 6.7.0 to 6.8.0 ([097f467](https://github.com/discue/mongodb-resource-client/commit/097f467293cd8011a16b408f5fab429503c49eac))
* **deps-dev:** bump mongodb from 6.7.0 to 6.8.0 ([75fbcef](https://github.com/discue/mongodb-resource-client/commit/75fbceff8b90892a2fc35650e7b4d8c705593a5d))
* **deps-dev:** bump mongodb from 6.8.0 to 6.9.0 ([502d82e](https://github.com/discue/mongodb-resource-client/commit/502d82e05b70647f5f53e2366af372d7b5985bdf))
* **deps-dev:** bump mongodb from 6.8.0 to 6.9.0 ([141b53b](https://github.com/discue/mongodb-resource-client/commit/141b53b0a31a2b89423d5b2739fab448018aae9a))
* **deps-dev:** bump mongodb from 6.9.0 to 6.10.0 ([f3e7a51](https://github.com/discue/mongodb-resource-client/commit/f3e7a51203917e1f9b11e0fb886ddbd22370d486))
* **deps-dev:** bump mongodb from 6.9.0 to 6.10.0 ([e59211c](https://github.com/discue/mongodb-resource-client/commit/e59211ce8e003be1985ba643e9b5bfa0b67d763e))
* **deps-dev:** bump mongodb from 7.0.0 to 7.1.0 ([19d5dca](https://github.com/discue/mongodb-resource-client/commit/19d5dca3a54f160bfcbd9819da621bae7f27fd94))
* **deps-dev:** bump mongodb from 7.0.0 to 7.1.0 ([3c6e63d](https://github.com/discue/mongodb-resource-client/commit/3c6e63db0603b63611b157f47029b4efe694bdfb))
* **deps-dev:** bump mongodb from 7.1.1 to 7.2.0 ([aa44f3d](https://github.com/discue/mongodb-resource-client/commit/aa44f3d4206c0a62651ec382b3f18d4b1325b764))
* **deps-dev:** bump mongodb from 7.1.1 to 7.2.0 ([8354b96](https://github.com/discue/mongodb-resource-client/commit/8354b96de4d440af66b96990cc6470b95dfbca3e))
* **deps-dev:** bump mongodb from 7.2.0 to 7.4.0 ([1f11f04](https://github.com/discue/mongodb-resource-client/commit/1f11f04891510db286f1952dcbf7e580df08d84a))
* **deps-dev:** bump mongodb from 7.2.0 to 7.4.0 ([d82a22f](https://github.com/discue/mongodb-resource-client/commit/d82a22f0306178b72a778102de815f9fb80d7135))
* **deps-dev:** bump mongodb from 7.4.0 to 7.5.0 ([749b094](https://github.com/discue/mongodb-resource-client/commit/749b0947224c4f34fa06a0acfafb041b9aa6f5ba))
* **deps-dev:** bump mongodb from 7.4.0 to 7.5.0 ([9cc65ea](https://github.com/discue/mongodb-resource-client/commit/9cc65ea6487ab1fed441c45b456203352410d0ae))
* **deps-dev:** bump mongodb from 7.5.0 to 7.6.0 ([ea3566f](https://github.com/discue/mongodb-resource-client/commit/ea3566f97bfae7ec987da7a819d351db13e0f04a))
* **deps-dev:** bump mongodb from 7.5.0 to 7.6.0 ([bccb0cd](https://github.com/discue/mongodb-resource-client/commit/bccb0cddfd04da0e49aa96ddc61b25d5384c7eb0))
* **deps-dev:** bump mongodb-memory-server from 8.15.1 to 9.0.1 ([d72971a](https://github.com/discue/mongodb-resource-client/commit/d72971a5066dc907900687142c84f3e2c9477351))
* **deps-dev:** bump mongodb-memory-server from 8.15.1 to 9.0.1 ([47995df](https://github.com/discue/mongodb-resource-client/commit/47995df613321499dae2b4162bb8f6df652c8f71))
* **deps-dev:** bump mongodb-memory-server from 9.1.8 to 9.2.0 ([f62a213](https://github.com/discue/mongodb-resource-client/commit/f62a21356a45899fd5e6c88d89b77ae4e32e3640))
* **deps-dev:** bump mongodb-memory-server from 9.1.8 to 9.2.0 ([4f62030](https://github.com/discue/mongodb-resource-client/commit/4f62030da238852c0e7adeebdcbe3e45a0581584))
* **deps-dev:** bump mongodb-memory-server from 9.2.0 to 9.3.0 ([e4d0249](https://github.com/discue/mongodb-resource-client/commit/e4d0249bfa3757629550349486f20e8387dfc16e))
* **deps-dev:** bump mongodb-memory-server from 9.2.0 to 9.3.0 ([143cd7a](https://github.com/discue/mongodb-resource-client/commit/143cd7a35b58ca6939bb5a6f2295344d1969b73a))
* **deps-dev:** bump nodemon from 3.1.0 to 3.1.2 ([3c34271](https://github.com/discue/mongodb-resource-client/commit/3c34271ae802447428ba6f83427a4c04e0f30589))
* **deps-dev:** bump typescript from 5.4.3 to 5.4.5 ([4258adc](https://github.com/discue/mongodb-resource-client/commit/4258adc51b6fc3652d87f3b35e1a2078b5d3bf06))
* **deps-dev:** bump typescript from 5.4.3 to 5.4.5 ([d5bcb22](https://github.com/discue/mongodb-resource-client/commit/d5bcb221a68fa37b484723db4121641224d6dc25))
* **deps-dev:** bump typescript from 5.4.5 to 5.5.2 ([52c6183](https://github.com/discue/mongodb-resource-client/commit/52c618389b9776caabc19463eb85735c41068f2a))
* **deps-dev:** bump typescript from 5.4.5 to 5.5.2 ([fa8d289](https://github.com/discue/mongodb-resource-client/commit/fa8d2891dafe2800b643e2ad08344961335cfcb5))
* **deps-dev:** bump typescript from 5.4.5 to 5.5.2 ([9af00e2](https://github.com/discue/mongodb-resource-client/commit/9af00e2e327dfc6d9905fd47378c544d64402133))
* **deps-dev:** bump typescript from 5.5.3 to 5.5.4 ([ffad852](https://github.com/discue/mongodb-resource-client/commit/ffad852f2fc015a9e8f8a5ac4645f638f36f247b))
* **deps-dev:** bump typescript from 5.5.3 to 5.5.4 ([c8eff71](https://github.com/discue/mongodb-resource-client/commit/c8eff712636f96064043d6be1d41e55f547cca1f))
* **deps-dev:** bump typescript from 5.5.4 to 5.6.2 ([5c1c7af](https://github.com/discue/mongodb-resource-client/commit/5c1c7af510c150dab86349c41f489cd3e56c1e16))
* **deps-dev:** bump typescript from 5.5.4 to 5.6.2 ([0cc85fe](https://github.com/discue/mongodb-resource-client/commit/0cc85fed72b8f249ec0706432629a9fcaa6a442a))
* **deps-dev:** bump typescript from 5.6.2 to 5.7.2 ([231275e](https://github.com/discue/mongodb-resource-client/commit/231275ef04060f515de2e2ca1eb07d244f7992b7))
* **deps-dev:** bump typescript from 5.6.2 to 5.7.2 ([1187a3c](https://github.com/discue/mongodb-resource-client/commit/1187a3c466de65dd2a4cbde4815688fec8ba4cca))
* **deps-dev:** bump typescript from 5.7.2 to 5.7.3 ([2f4625a](https://github.com/discue/mongodb-resource-client/commit/2f4625af77f2b6662b38a113db9ef8790eed86b3))
* **deps-dev:** bump typescript from 5.7.2 to 5.7.3 ([407af78](https://github.com/discue/mongodb-resource-client/commit/407af78de41e596010a453949e05ec719dd8d0bf))
* **deps-dev:** bump typescript from 5.7.3 to 5.8.2 ([450c192](https://github.com/discue/mongodb-resource-client/commit/450c19289279224bdc5a58f90e9000973167c142))
* **deps-dev:** bump typescript from 5.7.3 to 5.8.2 ([775b01a](https://github.com/discue/mongodb-resource-client/commit/775b01a31ecd3946640ac610701bc8388c61112d))
* **deps-dev:** bump typescript from 5.8.2 to 5.8.3 ([d8c955c](https://github.com/discue/mongodb-resource-client/commit/d8c955c0a4745e2229db42246d6d6ac98b32c299))
* **deps-dev:** bump typescript from 5.8.2 to 5.8.3 ([fee605f](https://github.com/discue/mongodb-resource-client/commit/fee605f5bcba50aa70896ed6e3415fd4beaf3f8c))
* **deps-dev:** bump typescript from 5.8.3 to 5.9.2 ([50c95a6](https://github.com/discue/mongodb-resource-client/commit/50c95a64c70d2dd3cc3b910dd5afccf134cc4cfa))
* **deps-dev:** bump typescript from 5.8.3 to 5.9.2 ([1cd6b37](https://github.com/discue/mongodb-resource-client/commit/1cd6b37bb1ae59661bcd25fb43edfeeeaccfd363))
* **deps-dev:** bump typescript from 5.9.2 to 5.9.3 ([0e19b02](https://github.com/discue/mongodb-resource-client/commit/0e19b02b4669cebba17c9f40b9635b7980393ecf))
* **deps-dev:** bump typescript from 5.9.2 to 5.9.3 ([eb05316](https://github.com/discue/mongodb-resource-client/commit/eb05316a9a6a38020317553db8f7c5b4edd19a3d))
* **deps-dev:** bump typescript from 6.0.2 to 7.0.2 ([b3fbadc](https://github.com/discue/mongodb-resource-client/commit/b3fbadc9c10e69c10c6bb343dcb2afce97562f7e))
* **deps-dev:** bump typescript from 6.0.2 to 7.0.2 ([392cfaf](https://github.com/discue/mongodb-resource-client/commit/392cfafc6d4008c9b1aa78fc0088fdb67ade8f40))
* **deps-dev:** update dependencies ([6cce2c3](https://github.com/discue/mongodb-resource-client/commit/6cce2c3d530aa547977579255a9e8fa643802b1e))
* **deps-dev:** use chai 4 ([316ace4](https://github.com/discue/mongodb-resource-client/commit/316ace4ded4e5dfb840c2c2ecff4fafd13a84181))
* **deps:** add mocha types ([fd19d88](https://github.com/discue/mongodb-resource-client/commit/fd19d8878a130a5cee7beba0c6be83425ea8cfee))
* **deps:** bump @discue/open-telemetry-tracing from 0.3.0 to 0.4.0 ([e379b4c](https://github.com/discue/mongodb-resource-client/commit/e379b4cbee68d2520e7c12048024d85ee8364c2c))
* **deps:** bump @discue/open-telemetry-tracing from 0.3.0 to 0.4.0 ([6b17c70](https://github.com/discue/mongodb-resource-client/commit/6b17c70231bd99befdb03340d20360ee597ef4fd))
* **deps:** bump actions/checkout from 3 to 4 ([1f69c46](https://github.com/discue/mongodb-resource-client/commit/1f69c46e44ff2715550ebf2681279f01d5ede195))
* **deps:** bump actions/checkout from 3 to 4 ([01835e3](https://github.com/discue/mongodb-resource-client/commit/01835e393e374d62765742ec4ca0a18000b7b402))
* **deps:** bump actions/checkout from 4 to 5 ([2b3df70](https://github.com/discue/mongodb-resource-client/commit/2b3df70cf710d4fe3b4962bc89af444b624ab59a))
* **deps:** bump actions/checkout from 4 to 5 ([7f0bca1](https://github.com/discue/mongodb-resource-client/commit/7f0bca144b50f94de18b2bc15e679008e9eaf634))
* **deps:** bump actions/checkout from 5 to 7 ([5d9d45f](https://github.com/discue/mongodb-resource-client/commit/5d9d45f3e5925d14e4ef4da0f9763b8ebb4234a5))
* **deps:** bump actions/checkout from 5 to 7 ([7d14529](https://github.com/discue/mongodb-resource-client/commit/7d14529deaea272529f38406787cb2611bc9ebd8))
* **deps:** bump actions/setup-node from 3 to 4 ([3461121](https://github.com/discue/mongodb-resource-client/commit/346112169e55b1198957f932f2a205234ba6398f))
* **deps:** bump actions/setup-node from 3 to 4 ([20ef031](https://github.com/discue/mongodb-resource-client/commit/20ef031c32b1b99d55df59c2e0436982117f03f3))
* **deps:** bump actions/setup-node from 4 to 5 ([87a1868](https://github.com/discue/mongodb-resource-client/commit/87a1868da4d3ba4c9e2dd8526ac74ad19e5cecf3))
* **deps:** bump actions/setup-node from 4 to 5 ([0a2a0e4](https://github.com/discue/mongodb-resource-client/commit/0a2a0e40d075f1d4e4aefef3ebb544b8f2880a98))
* **deps:** bump actions/setup-node from 5 to 6 ([299a676](https://github.com/discue/mongodb-resource-client/commit/299a67615f101ee0ee3f4baf81a156cf838a6a7b))
* **deps:** bump actions/setup-node from 5 to 6 ([1617986](https://github.com/discue/mongodb-resource-client/commit/1617986a4e299106bbe485c89eb63192de00876f))
* **deps:** bump actions/setup-node from 6 to 7 ([d2de8b7](https://github.com/discue/mongodb-resource-client/commit/d2de8b7ab03331f233d608fd8d381fc83b3632a1))
* **deps:** bump actions/setup-node from 6 to 7 ([04279de](https://github.com/discue/mongodb-resource-client/commit/04279de6f2aeca5b0e7acd5ab776edd05256a39d))
* **deps:** bump actions/stale from 10 to 11 ([36c2da0](https://github.com/discue/mongodb-resource-client/commit/36c2da00010d3ee601df33885344fbd12248e9db))
* **deps:** bump actions/stale from 10 to 11 ([c00405f](https://github.com/discue/mongodb-resource-client/commit/c00405f2e04d94f7f850121c2beb6996b5c8b4b1))
* **deps:** bump actions/stale from 8 to 9 ([906d885](https://github.com/discue/mongodb-resource-client/commit/906d885293f4a871249fed3319245e8c7523c89e))
* **deps:** bump actions/stale from 8 to 9 ([f09aaa6](https://github.com/discue/mongodb-resource-client/commit/f09aaa6eadc4fa7d5283afcb3d375d51faa64544))
* **deps:** bump actions/stale from 9 to 10 ([3299d80](https://github.com/discue/mongodb-resource-client/commit/3299d8022fd35b0c280aed809e8a66464edb5bd9))
* **deps:** bump actions/stale from 9 to 10 ([c6d86bb](https://github.com/discue/mongodb-resource-client/commit/c6d86bbd795ec605675f076a1be4a3ac5829c362))
* **deps:** bump emittery from 1.0.3 to 1.1.0 ([0aaa457](https://github.com/discue/mongodb-resource-client/commit/0aaa4578eba4b0bfadd8ed605ffca0d7b1ddf2b2))
* **deps:** bump emittery from 1.0.3 to 1.1.0 ([7f500d4](https://github.com/discue/mongodb-resource-client/commit/7f500d49320c918b848e26b2aed9121b6fd1d019))
* **deps:** bump emittery from 1.1.0 to 1.2.0 ([6f9eb20](https://github.com/discue/mongodb-resource-client/commit/6f9eb200f3f9690a4e306e8e38f63d8cd32a64ea))
* **deps:** bump emittery from 1.1.0 to 1.2.0 ([b2eb8c0](https://github.com/discue/mongodb-resource-client/commit/b2eb8c0159d40be3c285e2f8d0dcbd69bd9f05c2))
* **deps:** bump emittery from 2.0.0 to 2.1.0 ([df4f7d7](https://github.com/discue/mongodb-resource-client/commit/df4f7d72fad2ad73a269bb4f152e9fc2d95c8df9))
* **deps:** bump emittery from 2.0.0 to 2.1.0 ([c9f6664](https://github.com/discue/mongodb-resource-client/commit/c9f6664b3d46dda06da425f9204b56704d8f66ff))
* **deps:** bump mongodb from 6.1.0 to 6.2.0 ([f9eed93](https://github.com/discue/mongodb-resource-client/commit/f9eed9396fec19cda9f50de3f0263845e045a59d))
* **deps:** bump mongodb from 6.1.0 to 6.2.0 ([d0d86f6](https://github.com/discue/mongodb-resource-client/commit/d0d86f6ec91341cfe57b75d0ecf21246cbb755b6))
* **deps:** install emitter supporting to await listeners ([4c18422](https://github.com/discue/mongodb-resource-client/commit/4c18422282b1bc7d5cdd07613dad31afc9721530))
* **deps:** run npm audit ([37726b8](https://github.com/discue/mongodb-resource-client/commit/37726b8afd2d0ec1d526609263e9354a7cf4f34b))
* **deps:** update dependencies ([64c3599](https://github.com/discue/mongodb-resource-client/commit/64c3599310a371da73fb146e95cf4a736c3b20f9))
* **deps:** update dependencies ([00b83b8](https://github.com/discue/mongodb-resource-client/commit/00b83b8ef2ce8103318f3988a802d835fe612165))
* **deps:** update dependencies ([745f4b4](https://github.com/discue/mongodb-resource-client/commit/745f4b47f0b72ce5d877836b9b45bc0630a6d6ec))
* **deps:** update dependencies ([f13dfad](https://github.com/discue/mongodb-resource-client/commit/f13dfad7cbfcc35324cd2844b75d735ea075fac9))
* **deps:** update dependencies ([2d45742](https://github.com/discue/mongodb-resource-client/commit/2d457426b49642b9bfe9113d115104ce3185dbfa))
* **deps:** update dependencies ([749b1b5](https://github.com/discue/mongodb-resource-client/commit/749b1b5368914689944e32d8da2c4983509677e8))
* **deps:** update dependencies ([47200e8](https://github.com/discue/mongodb-resource-client/commit/47200e87152946712e69ad619e60727a12bb11c0))
* **deps:** update dependencies ([fd58454](https://github.com/discue/mongodb-resource-client/commit/fd584541f008c10236e8a6d2a1ec3bcd1c5904a4))
* **deps:** update dependencies ([ea2ea8b](https://github.com/discue/mongodb-resource-client/commit/ea2ea8b07a84eb42f9b062957bb09cfdd2d41aba))
* **deps:** update dependencies ([1ecf677](https://github.com/discue/mongodb-resource-client/commit/1ecf6770faaa25f5c2f9b3f82078b2058418de88))
* **deps:** update open telemetry tracing ([64aa2d9](https://github.com/discue/mongodb-resource-client/commit/64aa2d94be8f8dc301059c2c2133e60f0171f028))
* **deps:** update open-telemetry-tracing ([ca0057c](https://github.com/discue/mongodb-resource-client/commit/ca0057c4668be2a0a5fb023ba6519f17c1ab3e84))
* **deps:** update telemetry tracing ([24482a3](https://github.com/discue/mongodb-resource-client/commit/24482a3b2d58a53cebfe228b20363efec79fed25))
* do not log errors ([7789b36](https://github.com/discue/mongodb-resource-client/commit/7789b360049bd7441a77d3a6bb0eabc05fc49cfa))
* **docs:** add jsdoch for safe cursor methods ([0e7b039](https://github.com/discue/mongodb-resource-client/commit/0e7b0399d0e6c512c9405e9b43be1e5d04b6b2ab))
* **docs:** ensure correct jsdoc ([41063cd](https://github.com/discue/mongodb-resource-client/commit/41063cd52a475b635b6de03b43c8685c6cd01246))
* **docs:** make sure all types are detected correctly ([4c457e8](https://github.com/discue/mongodb-resource-client/commit/4c457e8beb61908a014567f75ad965fcefd528d4))
* **docs:** mark mongodb client as private ([df928d0](https://github.com/discue/mongodb-resource-client/commit/df928d0941dd56035ff13e6306e9cb7f7b2f4af5))
* **docs:** mark private methods as private ([45d32d4](https://github.com/discue/mongodb-resource-client/commit/45d32d4c76138fcf5d878d8c9de17b20f7605506))
* **docs:** update js doc ([b3c82f5](https://github.com/discue/mongodb-resource-client/commit/b3c82f5857355ea1ec4f772d5c36c7e15b23f2ae))
* **docs:** update readme ([254b159](https://github.com/discue/mongodb-resource-client/commit/254b1596286cfed86cae7e9e5cc45188d81a5a74))
* **docs:** update readme ([b2b3831](https://github.com/discue/mongodb-resource-client/commit/b2b3831708da946c671be0f820e9bc7c886623a9))
* **docs:** update readme ([9d52a76](https://github.com/discue/mongodb-resource-client/commit/9d52a768c711e99f528b446aaa75e381f772d02e))
* **docs:** update readme ([967d401](https://github.com/discue/mongodb-resource-client/commit/967d40113b8f9721d0a0048d1aceec667fd8a5cb))
* **docs:** update readme ([bb56ee7](https://github.com/discue/mongodb-resource-client/commit/bb56ee7c645a8472abd676272f56125adc84c323))
* **docs:** update readme ([ff3a51b](https://github.com/discue/mongodb-resource-client/commit/ff3a51b259b5cce1733cf478bd32dadaae87bfe6))
* **docs:** update readme ([5a41c79](https://github.com/discue/mongodb-resource-client/commit/5a41c797b244993805f66fabeed0116a777c27ba))
* **docs:** update readme ([705cfd8](https://github.com/discue/mongodb-resource-client/commit/705cfd8fd2247708073dfccf6d389fde12a5f062))
* **docs:** update readme ([9002471](https://github.com/discue/mongodb-resource-client/commit/9002471c81ef73d00590deda538174061d1c8c3e))
* **docs:** update readme ([3b3d8a8](https://github.com/discue/mongodb-resource-client/commit/3b3d8a893ac4cb5ecb7626f3ca08cdf6c03a0a58))
* **docs:** update readme ([2a35937](https://github.com/discue/mongodb-resource-client/commit/2a3593775ed32813d4dc3d86d19c3ab2be07e245))
* **docs:** update readme ([d2e7e7c](https://github.com/discue/mongodb-resource-client/commit/d2e7e7c68b05309d5081c6b61408e65662b48709))
* **docs:** update readme ([d2d62fa](https://github.com/discue/mongodb-resource-client/commit/d2d62facf7e54fc97234a97268c59fb748913500))
* **docs:** update readme ([828e647](https://github.com/discue/mongodb-resource-client/commit/828e647e944def582cc3b89512e5e7507fce2632))
* **docs:** update readme ([87e55c5](https://github.com/discue/mongodb-resource-client/commit/87e55c59ef7ebf2d60ba5d114602dfebca52d156))
* **docs:** use correct notation to specify options object for DATE_TRUNC ([389194b](https://github.com/discue/mongodb-resource-client/commit/389194bc777d9db1018a09625e33dcce956b1aa4))
* emit close event before closing client ([8c347e4](https://github.com/discue/mongodb-resource-client/commit/8c347e42c10120e39dcd7e2a57c2b4af9a1b6c86))
* enforce strict mode in all files ([6cf0064](https://github.com/discue/mongodb-resource-client/commit/6cf00647994e13b0c3e11245f978b34a53e0d953))
* fail on error, do not generate md for missing files ([7fa4b8e](https://github.com/discue/mongodb-resource-client/commit/7fa4b8e213d0a4936cbedeedc7f5aa669c81309d))
* fix typo in readme ([9966b37](https://github.com/discue/mongodb-resource-client/commit/9966b37f35db6b8dceab07a2adff02e1894ec7aa))
* **history:** close storage when host closes ([6724de0](https://github.com/discue/mongodb-resource-client/commit/6724de0119c9022cc80700739660e42a3558bbf2))
* ignore future chai versions ([e45cd3e](https://github.com/discue/mongodb-resource-client/commit/e45cd3e224e7ebf780975af41485231dc00df872))
* **lint:** enforce single quotes ([b6cad1b](https://github.com/discue/mongodb-resource-client/commit/b6cad1be0de597ed1a22a281519fc0fd4377129e))
* **lock:** update jsdoc to enable better docs ([355ee4d](https://github.com/discue/mongodb-resource-client/commit/355ee4d69cfc98e446417bc7979a4caf392a6cb8))
* mark mongoclient as required ([ce847c5](https://github.com/discue/mongodb-resource-client/commit/ce847c5ab46c3c3385b6db2a81f03f202256e2c5))
* **one-to-many-resource:** remove logging ([da2f0e5](https://github.com/discue/mongodb-resource-client/commit/da2f0e57e318a66b6cee01dd59a07d807fe66c9e))
* **one-to-many-resource:** require minimum resource ids length ([a2f607b](https://github.com/discue/mongodb-resource-client/commit/a2f607b471beb059d22aaf033e6b1e714eda00e1))
* **one-to-many-resource:** update condition in getAll ([0a6ae07](https://github.com/discue/mongodb-resource-client/commit/0a6ae07ac74a98413b1b27e7fafbd083fdb9a03e))
* **one-to-many-resource:** update method jsdoc name ([e2ad6c3](https://github.com/discue/mongodb-resource-client/commit/e2ad6c39b518adea2fabec65a64ee5c41d9a684c))
* **package:** update type declaration ([6702a2e](https://github.com/discue/mongodb-resource-client/commit/6702a2e9972dadf6252a8d2b85b86dd8b9610726))
* **pipeline:** remove duplicate projection ([7ea29b9](https://github.com/discue/mongodb-resource-client/commit/7ea29b92fe6ff6e5e12c87d0d2ccd9aa0a82dece))
* **release:** 0.21.0 ([3441653](https://github.com/discue/mongodb-resource-client/commit/3441653c8a365382c1a5416ab3ab8bfdbd9640e7))
* **release:** 0.21.1 ([509c6b5](https://github.com/discue/mongodb-resource-client/commit/509c6b516e9a6685e3da4fe69dea8de86db83df1))
* **release:** 0.22.0 ([98e4bed](https://github.com/discue/mongodb-resource-client/commit/98e4bedd14710da475481b0347d1d6d2a1ee9b9a))
* **release:** 0.23.0 ([db50d14](https://github.com/discue/mongodb-resource-client/commit/db50d140868234073b95076a9794435c0b49a9d4))
* **release:** 0.24.0 ([fd7eaaf](https://github.com/discue/mongodb-resource-client/commit/fd7eaafaf00468788cb213c0fabf4f90892524dc))
* **release:** 0.25.0 ([feeff14](https://github.com/discue/mongodb-resource-client/commit/feeff14a116ac5c29800a1b67b895268350d9432))
* **release:** 0.26.0 ([becb48b](https://github.com/discue/mongodb-resource-client/commit/becb48bc7bc2620d947709ccd2d76de55169fc56))
* **release:** 0.27.0 ([d4172e2](https://github.com/discue/mongodb-resource-client/commit/d4172e28cdfe705b8714471784a30c857bb688b5))
* **release:** 0.28.0 ([ed6d26c](https://github.com/discue/mongodb-resource-client/commit/ed6d26c24345dff8a16ff96a36cef0c872a0c4de))
* **release:** 0.29.0 ([9db2de8](https://github.com/discue/mongodb-resource-client/commit/9db2de8dedcafa84aff90b291a139a85014205d4))
* **release:** 0.30.0 ([333dece](https://github.com/discue/mongodb-resource-client/commit/333deceab2e2c04f1fa5e7f7881d9e342baf04d9))
* **release:** 0.31.0 ([5bef714](https://github.com/discue/mongodb-resource-client/commit/5bef71404a41ba60510962bd374641e79ed22f0d))
* **release:** 0.32.0 ([158c8ae](https://github.com/discue/mongodb-resource-client/commit/158c8ae9f80153551d5f66e0fb333ce9a0e2214c))
* **release:** 0.33.0 ([a220c87](https://github.com/discue/mongodb-resource-client/commit/a220c8734919f8de5a9a3d6fac2bb2450c5da9c8))
* **release:** 0.34.0 ([902cec9](https://github.com/discue/mongodb-resource-client/commit/902cec9c6132e329244fd6c6515305871efdaf1e))
* **release:** 0.35.0 ([11385e3](https://github.com/discue/mongodb-resource-client/commit/11385e3ee2a02ed8c67926648e664b1dc7cda046))
* **release:** 0.36.0 ([568d4ef](https://github.com/discue/mongodb-resource-client/commit/568d4ef0aa0816f0519e62a08ac4bbb06f9795a0))
* **release:** 0.37.0 ([63682fd](https://github.com/discue/mongodb-resource-client/commit/63682fde5a34d24acaadcd8e44f2a8e643b4f311))
* **release:** 0.38.0 ([b5ebdf0](https://github.com/discue/mongodb-resource-client/commit/b5ebdf0ecb80bbdb88dbf8155019d386dd995c05))
* **release:** 0.38.1 ([08bf398](https://github.com/discue/mongodb-resource-client/commit/08bf398ca137cf151a65419fed2d8aac2bfb2350))
* **release:** 0.39.0 ([2192348](https://github.com/discue/mongodb-resource-client/commit/2192348b847bae0bd39ec9d56c838100586f332f))
* **release:** 0.40.0 ([da5f572](https://github.com/discue/mongodb-resource-client/commit/da5f572f09423b538dd9396065552abbdac9e82d))
* **release:** 1.0.0 ([abb9950](https://github.com/discue/mongodb-resource-client/commit/abb99502d9662bee292d697fa65c7fe48324eaee))
* remove docs of deleted component ([3e83e58](https://github.com/discue/mongodb-resource-client/commit/3e83e5840353d4ca01c2fa3f984feae380c92456))
* remove url param from all docs and ctors ([9d52ce4](https://github.com/discue/mongodb-resource-client/commit/9d52ce40cc4c4e7cc6afb74f08a12d4574416cba))
* require all mongodb queries to use index ([8ea132e](https://github.com/discue/mongodb-resource-client/commit/8ea132e78e02ff863e4b8fd43298ffbc0c0e86ce))
* reset dependencies only once during testing ([ea5c1b9](https://github.com/discue/mongodb-resource-client/commit/ea5c1b93fba7eff42d56ff4e688fc05d5fa0aa23))
* **simple-resource:** fix typo ([6dfbbae](https://github.com/discue/mongodb-resource-client/commit/6dfbbae7fad864140f18078220d204363dc1db51))
* **simple-resource:** remove log statement ([5aad971](https://github.com/discue/mongodb-resource-client/commit/5aad9710a179b3825d2ae1b6bd2c47fa1801163c))
* **simple-resource:** store also event emitter ([7e97f48](https://github.com/discue/mongodb-resource-client/commit/7e97f48f0565eea49b572afad3b3a9aaa7367892))
* **simple-resource:** update span name ([0e895df](https://github.com/discue/mongodb-resource-client/commit/0e895dfa1bda60bbce62c029b2a384bbb9f665ca))
* **simple-resource:** use simple index spec ([88a8d0a](https://github.com/discue/mongodb-resource-client/commit/88a8d0a00d54711f74a1056b49910489237fbefa))
* standardize release-please and stale workflows ([fa0057e](https://github.com/discue/mongodb-resource-client/commit/fa0057ef0c8c4bb6c85a43aa10a93bd18d213ede))
* standardize release-please and stale workflows ([576f433](https://github.com/discue/mongodb-resource-client/commit/576f4333d163b247e64d52a8ebcead3074cf1a23))
* test against latest mongodb version ([69f4cec](https://github.com/discue/mongodb-resource-client/commit/69f4cec2170594ba6aed45db4d4389388e77e99b))
* **timeseries:** catch error when creating collection ([e86b3df](https://github.com/discue/mongodb-resource-client/commit/e86b3dfa2327a2992dd669fbef3f52ae370774b8))
* **types:** declare private methods) ([797a70a](https://github.com/discue/mongodb-resource-client/commit/797a70ae241a1899790c63fa117e86108187a1ee))
* update docs ([d51af4b](https://github.com/discue/mongodb-resource-client/commit/d51af4bdeffbd6aa2e038cd4cffd69a1b1da04d9))
* update mongodb hostname for express gui ([10caef5](https://github.com/discue/mongodb-resource-client/commit/10caef53a3be41562f7a36cbf359c542361f95a4))
* update readme ([c1949c1](https://github.com/discue/mongodb-resource-client/commit/c1949c1056310e59fb531a0d10e9fdf43e8dc5d7))
* update readme ([3548f69](https://github.com/discue/mongodb-resource-client/commit/3548f696bfb8f05169dc802af879fb152fa0eae1))
* use docker compose without hyphen to run compose commands ([1781bb4](https://github.com/discue/mongodb-resource-client/commit/1781bb490ad2e130ab7a49fb0f4f353f96e597ca))
* use new eslint version and config ([1a6fb3d](https://github.com/discue/mongodb-resource-client/commit/1a6fb3d4ebbeee5c10da955eda5c01c1e77e825d))

## [1.0.0](https://github.com/discue/mongodb-resource-client/compare/v0.40.0...v1.0.0) (2024-08-13)


### Features

* use es6 imports and new event listener interface ([3c57fdf](https://github.com/discue/mongodb-resource-client/commit/3c57fdfd0fe70a33899e97648faaf01186048fe4))


### Refactorings

* add newline before each top-level describe ([3e81549](https://github.com/discue/mongodb-resource-client/commit/3e8154957ade3401e11dbbb7e133cf959902c411))
* do not destructure chai.expect twice ([b85d32e](https://github.com/discue/mongodb-resource-client/commit/b85d32e931f81fd0b00b71d266e509e6f1604454))
* move tracing related method to base class ([e4a311a](https://github.com/discue/mongodb-resource-client/commit/e4a311a16495d702e288bc1439f1b0ee67e0b7eb))
* remove all use strict statements ([e5a0fce](https://github.com/discue/mongodb-resource-client/commit/e5a0fcea84c7e09f27b72026d4024c1f112da74b))
* remove duplicate method ([b1a0095](https://github.com/discue/mongodb-resource-client/commit/b1a0095e188f5ce10cda4180a4a0ea601737d151))
* send close event from base class ([598b24b](https://github.com/discue/mongodb-resource-client/commit/598b24bc4ee51b39cef8f80d966ae1674a0eecf8))


### Chores

* add eslint rules ([f6bbad3](https://github.com/discue/mongodb-resource-client/commit/f6bbad34b049a8ed0589d5d918322112b174cf46))
* add jsdocs for history module ([7a06f1b](https://github.com/discue/mongodb-resource-client/commit/7a06f1b35842b84f2631c047fbab22da2b410a61))
* convert to esm ([60450af](https://github.com/discue/mongodb-resource-client/commit/60450afa25224900a4ea30588e74498637ffaa47))
* **deps-dev:** bump @types/node from 20.14.10 to 22.0.2 ([3ada0ca](https://github.com/discue/mongodb-resource-client/commit/3ada0ca4be3665cda1eee2a6b3e9aa44e79a8520))
* **deps-dev:** bump eslint from 9.6.0 to 9.8.0 ([7ce0d82](https://github.com/discue/mongodb-resource-client/commit/7ce0d8284b8f2f24290f3636bcbf7925123cae1b))
* **deps-dev:** bump mocha from 10.6.0 to 10.7.0 ([4fb1345](https://github.com/discue/mongodb-resource-client/commit/4fb134573dde73f04ff9e354a179f3e3df543c71))
* **deps-dev:** bump typescript from 5.4.5 to 5.5.2 ([52c6183](https://github.com/discue/mongodb-resource-client/commit/52c618389b9776caabc19463eb85735c41068f2a))
* **deps-dev:** bump typescript from 5.5.3 to 5.5.4 ([c8eff71](https://github.com/discue/mongodb-resource-client/commit/c8eff712636f96064043d6be1d41e55f547cca1f))
* **deps:** install emitter supporting to await listeners ([4c18422](https://github.com/discue/mongodb-resource-client/commit/4c18422282b1bc7d5cdd07613dad31afc9721530))
* **deps:** update open telemetry tracing ([64aa2d9](https://github.com/discue/mongodb-resource-client/commit/64aa2d94be8f8dc301059c2c2133e60f0171f028))
* **docs:** add jsdoch for safe cursor methods ([0e7b039](https://github.com/discue/mongodb-resource-client/commit/0e7b0399d0e6c512c9405e9b43be1e5d04b6b2ab))
* **docs:** mark private methods as private ([45d32d4](https://github.com/discue/mongodb-resource-client/commit/45d32d4c76138fcf5d878d8c9de17b20f7605506))
* **docs:** update readme ([254b159](https://github.com/discue/mongodb-resource-client/commit/254b1596286cfed86cae7e9e5cc45188d81a5a74))
* **docs:** use correct notation to specify options object for DATE_TRUNC ([389194b](https://github.com/discue/mongodb-resource-client/commit/389194bc777d9db1018a09625e33dcce956b1aa4))
* fail on error, do not generate md for missing files ([7fa4b8e](https://github.com/discue/mongodb-resource-client/commit/7fa4b8e213d0a4936cbedeedc7f5aa669c81309d))
* **lock:** update jsdoc to enable better docs ([355ee4d](https://github.com/discue/mongodb-resource-client/commit/355ee4d69cfc98e446417bc7979a4caf392a6cb8))
* remove docs of deleted component ([3e83e58](https://github.com/discue/mongodb-resource-client/commit/3e83e5840353d4ca01c2fa3f984feae380c92456))
* update mongodb hostname for express gui ([10caef5](https://github.com/discue/mongodb-resource-client/commit/10caef53a3be41562f7a36cbf359c542361f95a4))
* use docker compose without hyphen to run compose commands ([1781bb4](https://github.com/discue/mongodb-resource-client/commit/1781bb490ad2e130ab7a49fb0f4f353f96e597ca))

## [0.40.0](https://github.com/discue/mongodb-resource-client/compare/v0.39.0...v0.40.0) (2024-07-07)


### Chores

* **aggregations:** add date_trunc function ([b20024f](https://github.com/discue/mongodb-resource-client/commit/b20024f5cfe4f1dcd5c3614e12640b0bbfc1644e))
* **aggregations:** add more options to DATE_TRUNC ([f27f446](https://github.com/discue/mongodb-resource-client/commit/f27f446e2143959057f4df5c36ab8d952e6b92f2))
* **aggregrations:** add TO_LONG method ([c052680](https://github.com/discue/mongodb-resource-client/commit/c052680bd7922230d2ec05db1b1c52a8aa653bed))
* **deps-dev:** bump @types/node from 20.14.2 to 20.14.9 ([3240df5](https://github.com/discue/mongodb-resource-client/commit/3240df53255b811dd90e6938446302db3565be6d))
* **deps-dev:** bump eslint from 9.5.0 to 9.6.0 ([16e886c](https://github.com/discue/mongodb-resource-client/commit/16e886c3f9592c79ebaf4cf5a573621fa3777465))
* **deps-dev:** bump mocha and @types/mocha ([da49371](https://github.com/discue/mongodb-resource-client/commit/da493718499b388e485a2d59fd6cda011f2d8fa5))
* **deps-dev:** bump mongodb from 6.7.0 to 6.8.0 ([75fbcef](https://github.com/discue/mongodb-resource-client/commit/75fbceff8b90892a2fc35650e7b4d8c705593a5d))
* **deps-dev:** bump typescript from 5.4.5 to 5.5.2 ([9af00e2](https://github.com/discue/mongodb-resource-client/commit/9af00e2e327dfc6d9905fd47378c544d64402133))
* **deps:** update dependencies ([00b83b8](https://github.com/discue/mongodb-resource-client/commit/00b83b8ef2ce8103318f3988a802d835fe612165))
* **docs:** update readme ([b2b3831](https://github.com/discue/mongodb-resource-client/commit/b2b3831708da946c671be0f820e9bc7c886623a9))

## [0.39.0](https://github.com/discue/mongodb-resource-client/compare/v0.38.0...v0.39.0) (2024-06-15)


### Features

* **simple-resource:** add method to count all children of a resource ([9891097](https://github.com/discue/mongodb-resource-client/commit/9891097837ade85d4836dc63f71c2d31c30d5f47))


### Bug Fixes

* **simple-storage:** get all children method returns undefined children of no children found ([6d0d703](https://github.com/discue/mongodb-resource-client/commit/6d0d703ace421db930262697c43b3cf1a61ede20))


### Chores

* **deps-dev:** bump @types/node from 20.12.12 to 20.13.0 ([d1e3da4](https://github.com/discue/mongodb-resource-client/commit/d1e3da47fd58cfaa5504a5ba9ee34fc9388e2c6b))
* **deps-dev:** bump eslint from 9.2.0 to 9.4.0 ([a1d2f37](https://github.com/discue/mongodb-resource-client/commit/a1d2f37d1d0f67dc449bf3791c958a0a408b8387))
* **deps-dev:** bump mongodb from 6.6.2 to 6.7.0 ([fa0728c](https://github.com/discue/mongodb-resource-client/commit/fa0728c46481ccdfd0e59e03b8e2e9e82778a031))
* **deps-dev:** bump mongodb-memory-server from 9.2.0 to 9.3.0 ([143cd7a](https://github.com/discue/mongodb-resource-client/commit/143cd7a35b58ca6939bb5a6f2295344d1969b73a))
* **deps-dev:** bump nodemon from 3.1.0 to 3.1.2 ([3c34271](https://github.com/discue/mongodb-resource-client/commit/3c34271ae802447428ba6f83427a4c04e0f30589))
* **deps:** update dependencies ([745f4b4](https://github.com/discue/mongodb-resource-client/commit/745f4b47f0b72ce5d877836b9b45bc0630a6d6ec))
* **docs:** update readme ([9d52a76](https://github.com/discue/mongodb-resource-client/commit/9d52a768c711e99f528b446aaa75e381f772d02e))
* **release:** 0.38.1 ([08bf398](https://github.com/discue/mongodb-resource-client/commit/08bf398ca137cf151a65419fed2d8aac2bfb2350))

### [0.38.1](https://github.com/discue/mongodb-resource-client/compare/v0.38.0...v0.38.1) (2024-06-15)


### Bug Fixes

* **simple-storage:** get all children method returns undefined children of no children found ([8e8dbf0](https://github.com/discue/mongodb-resource-client/commit/8e8dbf09ffbd62ab75af2c2c2d38cd130b7f5440))


### Chores

* **deps-dev:** bump @types/node from 20.12.12 to 20.13.0 ([1e9baeb](https://github.com/discue/mongodb-resource-client/commit/1e9baeb39b9e75b2eea18ef3ee775d20d88f1b4b))
* **deps-dev:** bump eslint from 9.2.0 to 9.4.0 ([a1d2f37](https://github.com/discue/mongodb-resource-client/commit/a1d2f37d1d0f67dc449bf3791c958a0a408b8387))
* **deps-dev:** bump mongodb from 6.6.2 to 6.7.0 ([c90a5ae](https://github.com/discue/mongodb-resource-client/commit/c90a5ae2c3192bed84cdec609a76902fdf4b1be0))
* **deps-dev:** bump mongodb-memory-server from 9.2.0 to 9.3.0 ([143cd7a](https://github.com/discue/mongodb-resource-client/commit/143cd7a35b58ca6939bb5a6f2295344d1969b73a))
* **deps-dev:** bump nodemon from 3.1.0 to 3.1.2 ([fb155e2](https://github.com/discue/mongodb-resource-client/commit/fb155e23d949599d03bd532aa99c9acdecb2babe))
* **deps:** update dependencies ([796e107](https://github.com/discue/mongodb-resource-client/commit/796e107d55416099fb822922c04e002ff71fbe86))

## [0.38.0](https://github.com/discue/mongodb-resource-client/compare/v0.37.0...v0.38.0) (2024-05-18)

## [0.37.0](https://github.com/discue/mongodb-resource-client/compare/v0.36.0...v0.37.0) (2024-05-18)


### Bug Fixes

* **one-to-many-resource:** fix error when calling close ([c10beea](https://github.com/discue/mongodb-resource-client/commit/c10beeabb58f759125b842f2b2e837a12edce943))


### Chores

* bind mongo express to port 8888 ([4ad4582](https://github.com/discue/mongodb-resource-client/commit/4ad4582362eb80594cd85290fc61432132a362eb))
* check whether desired mongodb port is used before starting another one ([1eb6a96](https://github.com/discue/mongodb-resource-client/commit/1eb6a96cd26f46ff82d6fd0367884f1dc6efa6be))
* delete unused compose file ([f6685e0](https://github.com/discue/mongodb-resource-client/commit/f6685e03ac9dc39cdb87c3e02e41b9da98b584f3))
* **docs:** mark mongodb client as private ([df928d0](https://github.com/discue/mongodb-resource-client/commit/df928d0941dd56035ff13e6306e9cb7f7b2f4af5))
* require all mongodb queries to use index ([8ea132e](https://github.com/discue/mongodb-resource-client/commit/8ea132e78e02ff863e4b8fd43298ffbc0c0e86ce))

## [0.36.0](https://github.com/discue/mongodb-resource-client/compare/v0.35.0...v0.36.0) (2024-05-17)


### Chores

* **base:** rename function to enable TS types ([4c1e14d](https://github.com/discue/mongodb-resource-client/commit/4c1e14dfd929168bb0dcb0de9450613bb1cc2ff8))
* **docs:** ensure correct jsdoc ([41063cd](https://github.com/discue/mongodb-resource-client/commit/41063cd52a475b635b6de03b43c8685c6cd01246))
* **timeseries:** catch error when creating collection ([e86b3df](https://github.com/discue/mongodb-resource-client/commit/e86b3dfa2327a2992dd669fbef3f52ae370774b8))

## [0.35.0](https://github.com/discue/mongodb-resource-client/compare/v0.34.0...v0.35.0) (2024-05-17)


### Features

* add timeseries storage class ([f82c23f](https://github.com/discue/mongodb-resource-client/commit/f82c23fb1089e486a4512768266be7fef23f63fd))
* **simple-resource:** enable inserting resource with update fn ([b9beab6](https://github.com/discue/mongodb-resource-client/commit/b9beab68e217db6e3f3b22d40d64e5c81e550340))


### Refactorings

* move shared logic to base class ([b87071b](https://github.com/discue/mongodb-resource-client/commit/b87071b0909c1afd53f37999d84a52dcecc1f403))


### Chores

* **base:** add close method ([3b3f461](https://github.com/discue/mongodb-resource-client/commit/3b3f461cf7310c67c072ad97c9684f95e074bc75))
* **deps:** update dependencies ([f13dfad](https://github.com/discue/mongodb-resource-client/commit/f13dfad7cbfcc35324cd2844b75d735ea075fac9))
* **docs:** update js doc ([b3c82f5](https://github.com/discue/mongodb-resource-client/commit/b3c82f5857355ea1ec4f772d5c36c7e15b23f2ae))
* **docs:** update readme ([967d401](https://github.com/discue/mongodb-resource-client/commit/967d40113b8f9721d0a0048d1aceec667fd8a5cb))
* fix typo in readme ([9966b37](https://github.com/discue/mongodb-resource-client/commit/9966b37f35db6b8dceab07a2adff02e1894ec7aa))
* mark mongoclient as required ([ce847c5](https://github.com/discue/mongodb-resource-client/commit/ce847c5ab46c3c3385b6db2a81f03f202256e2c5))
* test against latest mongodb version ([69f4cec](https://github.com/discue/mongodb-resource-client/commit/69f4cec2170594ba6aed45db4d4389388e77e99b))
* update docs ([d51af4b](https://github.com/discue/mongodb-resource-client/commit/d51af4bdeffbd6aa2e038cd4cffd69a1b1da04d9))

## [0.34.0](https://github.com/discue/mongodb-resource-client/compare/v0.33.0...v0.34.0) (2024-05-01)


### Features

* allow index to be passed as index specification ([f2f7660](https://github.com/discue/mongodb-resource-client/commit/f2f766096862b695fa27631657990167b6821c48))


### Chores

* add method for indexstats stage ([b47d6c8](https://github.com/discue/mongodb-resource-client/commit/b47d6c829128be1316e3839816e434963c13e039))
* **deps-dev:** bump @types/node from 20.12.2 to 20.12.7 ([2ac56da](https://github.com/discue/mongodb-resource-client/commit/2ac56dab31cb28d7a8faa92f5740d8fbe9b04cf7))
* **deps-dev:** bump eslint from 9.0.0 to 9.1.1 ([23b5b06](https://github.com/discue/mongodb-resource-client/commit/23b5b067252d40ae889e6a0143d51f714dc69b90))
* **deps-dev:** bump mongodb-memory-server from 9.1.8 to 9.2.0 ([4f62030](https://github.com/discue/mongodb-resource-client/commit/4f62030da238852c0e7adeebdcbe3e45a0581584))
* **deps-dev:** bump typescript from 5.4.3 to 5.4.5 ([d5bcb22](https://github.com/discue/mongodb-resource-client/commit/d5bcb221a68fa37b484723db4121641224d6dc25))
* **deps:** update telemetry tracing ([24482a3](https://github.com/discue/mongodb-resource-client/commit/24482a3b2d58a53cebfe228b20363efec79fed25))
* **docs:** make sure all types are detected correctly ([4c457e8](https://github.com/discue/mongodb-resource-client/commit/4c457e8beb61908a014567f75ad965fcefd528d4))
* **docs:** update readme ([bb56ee7](https://github.com/discue/mongodb-resource-client/commit/bb56ee7c645a8472abd676272f56125adc84c323))
* **docs:** update readme ([ff3a51b](https://github.com/discue/mongodb-resource-client/commit/ff3a51b259b5cce1733cf478bd32dadaae87bfe6))

## [0.33.0](https://github.com/discue/mongodb-resource-client/compare/v0.32.0...v0.33.0) (2024-04-20)


### Features

* create custom indexes too ([7c0901d](https://github.com/discue/mongodb-resource-client/commit/7c0901d7f1798f30665d5b886f406121caed79f9))


### Chores

* **docs:** update readme ([5a41c79](https://github.com/discue/mongodb-resource-client/commit/5a41c797b244993805f66fabeed0116a777c27ba))
* remove url param from all docs and ctors ([9d52ce4](https://github.com/discue/mongodb-resource-client/commit/9d52ce40cc4c4e7cc6afb74f08a12d4574416cba))
* **simple-resource:** use simple index spec ([88a8d0a](https://github.com/discue/mongodb-resource-client/commit/88a8d0a00d54711f74a1056b49910489237fbefa))
* use new eslint version and config ([1a6fb3d](https://github.com/discue/mongodb-resource-client/commit/1a6fb3d4ebbeee5c10da955eda5c01c1e77e825d))

## [0.32.0](https://github.com/discue/mongodb-resource-client/compare/v0.31.0...v0.32.0) (2024-04-07)


### Refactorings

* accept only instance of MongoClient in constructors ([2cd799c](https://github.com/discue/mongodb-resource-client/commit/2cd799c1875f8964924d68dcd4bce928d20707c5))


### Chores

* **docs:** update readme ([705cfd8](https://github.com/discue/mongodb-resource-client/commit/705cfd8fd2247708073dfccf6d389fde12a5f062))
* enforce strict mode in all files ([6cf0064](https://github.com/discue/mongodb-resource-client/commit/6cf00647994e13b0c3e11245f978b34a53e0d953))

## [0.31.0](https://github.com/discue/mongodb-resource-client/compare/v0.30.0...v0.31.0) (2024-04-01)


### Features

* **aggregations:** add equals all method ([ceee4ee](https://github.com/discue/mongodb-resource-client/commit/ceee4ee2d6795a597fbcaf126c8350917d1570ba))
* **aggregations:** add match wildcard function ([7f836b8](https://github.com/discue/mongodb-resource-client/commit/7f836b8951bfcdc7b4b565ee0e3ffd45c82b9294))
* **lookup:** ensure projection is working for queried children ([4254358](https://github.com/discue/mongodb-resource-client/commit/425435852d4931fb955ee986b66f749ff6e75f5d))
* **one-to-many-resource:** implement find method ([298720b](https://github.com/discue/mongodb-resource-client/commit/298720b6e741c221ece618c3cea55b3041dda425))
* **one-to-many-resource:** tighten resource id requirements ([81f901a](https://github.com/discue/mongodb-resource-client/commit/81f901a0b448ac89aadea77a181d4ec49376afe5))
* **simple-resource:** allow matching of children when querying ([ad9cb57](https://github.com/discue/mongodb-resource-client/commit/ad9cb57778da6f8fed75dd911190255af57f16fb))


### Refactorings

* add private methods for span creation ([c70cfd2](https://github.com/discue/mongodb-resource-client/commit/c70cfd2e4b61afc9ba924b3f18fe1c068bdd96d0))
* **one-to-many-resource:** do not nest aggregation lookups ([f87c6ea](https://github.com/discue/mongodb-resource-client/commit/f87c6eac3d37c01fe33cfe887da5048d40c1d44c))


### Chores

* **deps-dev:** bump chai from 4.3.10 to 5.1.0 ([25a4226](https://github.com/discue/mongodb-resource-client/commit/25a42260b3a6aac4c8645e527dc1cf42629d4cd6))
* **deps-dev:** update dependencies ([6cce2c3](https://github.com/discue/mongodb-resource-client/commit/6cce2c3d530aa547977579255a9e8fa643802b1e))
* **deps-dev:** use chai 4 ([316ace4](https://github.com/discue/mongodb-resource-client/commit/316ace4ded4e5dfb840c2c2ecff4fafd13a84181))
* **deps:** update open-telemetry-tracing ([ca0057c](https://github.com/discue/mongodb-resource-client/commit/ca0057c4668be2a0a5fb023ba6519f17c1ab3e84))
* **docs:** update readme ([9002471](https://github.com/discue/mongodb-resource-client/commit/9002471c81ef73d00590deda538174061d1c8c3e))
* ignore future chai versions ([e45cd3e](https://github.com/discue/mongodb-resource-client/commit/e45cd3e224e7ebf780975af41485231dc00df872))
* **lint:** enforce single quotes ([b6cad1b](https://github.com/discue/mongodb-resource-client/commit/b6cad1be0de597ed1a22a281519fc0fd4377129e))
* **one-to-many-resource:** remove logging ([da2f0e5](https://github.com/discue/mongodb-resource-client/commit/da2f0e57e318a66b6cee01dd59a07d807fe66c9e))
* **one-to-many-resource:** update method jsdoc name ([e2ad6c3](https://github.com/discue/mongodb-resource-client/commit/e2ad6c39b518adea2fabec65a64ee5c41d9a684c))
* **pipeline:** remove duplicate projection ([7ea29b9](https://github.com/discue/mongodb-resource-client/commit/7ea29b92fe6ff6e5e12c87d0d2ccd9aa0a82dece))
* reset dependencies only once during testing ([ea5c1b9](https://github.com/discue/mongodb-resource-client/commit/ea5c1b93fba7eff42d56ff4e688fc05d5fa0aa23))

## [0.30.0](https://github.com/discue/mongodb-resource-client/compare/v0.29.0...v0.30.0) (2024-03-03)


### Features

* ensure all cursors get closed ([55b0fd7](https://github.com/discue/mongodb-resource-client/commit/55b0fd7ce32cf41e6de8e4c6d84c21165f446e16))


### Chores

* **deps:** update dependencies ([2d45742](https://github.com/discue/mongodb-resource-client/commit/2d457426b49642b9bfe9113d115104ce3185dbfa))

## [0.29.0](https://github.com/discue/mongodb-resource-client/compare/v0.28.0...v0.29.0) (2024-03-02)


### Features

* do not fail if index cannot be created ([8341d8f](https://github.com/discue/mongodb-resource-client/commit/8341d8f449b80fea666d3bf38e9f18862ca57947))


### Chores

* **deps-dev:** bump @types/node from 20.11.17 to 20.11.24 ([b86a2e0](https://github.com/discue/mongodb-resource-client/commit/b86a2e06b5b3234525d3e22f4db162fafb6f8687))
* **deps-dev:** bump eslint from 8.56.0 to 8.57.0 ([6cec40c](https://github.com/discue/mongodb-resource-client/commit/6cec40ceadba415a35fbb5ab701ce67640d17903))
* **deps:** update dependencies ([749b1b5](https://github.com/discue/mongodb-resource-client/commit/749b1b5368914689944e32d8da2c4983509677e8))

## [0.28.0](https://github.com/discue/mongodb-resource-client/compare/v0.27.0...v0.28.0) (2024-02-25)


### Features

* **simple-resource-storage:** do not hardcode collection names ([c3369c9](https://github.com/discue/mongodb-resource-client/commit/c3369c98e381e60074a67fb3237c001b6b7710d8))


### Chores

* do not log errors ([7789b36](https://github.com/discue/mongodb-resource-client/commit/7789b360049bd7441a77d3a6bb0eabc05fc49cfa))
* **docs:** update readme ([3b3d8a8](https://github.com/discue/mongodb-resource-client/commit/3b3d8a893ac4cb5ecb7626f3ca08cdf6c03a0a58))

## [0.27.0](https://github.com/discue/mongodb-resource-client/compare/v0.26.0...v0.27.0) (2024-02-25)


### Features

* **simple-resource-storage:** calculate document resource path ([2f27fc7](https://github.com/discue/mongodb-resource-client/commit/2f27fc706384d50b698dba277f90dee226d04a59))


### Refactorings

* **lookup-pipeline:** use aggregrations helper fns ([ca959c8](https://github.com/discue/mongodb-resource-client/commit/ca959c8f61d5f615a69b9daee23737412388bc3d))


### Chores

* add mongdb playground data ([c84073d](https://github.com/discue/mongodb-resource-client/commit/c84073d68d247d86d62da7f552ac5be8dcd0bc7d))
* **deps:** update dependencies ([47200e8](https://github.com/discue/mongodb-resource-client/commit/47200e87152946712e69ad619e60727a12bb11c0))
* **docs:** update readme ([2a35937](https://github.com/discue/mongodb-resource-client/commit/2a3593775ed32813d4dc3d86d19c3ab2be07e245))
* **package:** update type declaration ([6702a2e](https://github.com/discue/mongodb-resource-client/commit/6702a2e9972dadf6252a8d2b85b86dd8b9610726))
* **simple-resource:** update span name ([0e895df](https://github.com/discue/mongodb-resource-client/commit/0e895dfa1bda60bbce62c029b2a384bbb9f665ca))

## [0.26.0](https://github.com/discue/mongodb-resource-client/compare/v0.25.0...v0.26.0) (2024-02-11)


### Features

* **simple-resource:** add getAllChildren method ([984e86e](https://github.com/discue/mongodb-resource-client/commit/984e86e9e764aa7bc21eebf2d7d3d05e9cbbe0d1))


### Chores

* **deps-dev:** bump @types/node from 20.10.4 to 20.10.6 ([2da550c](https://github.com/discue/mongodb-resource-client/commit/2da550c240fd71e8f459d39921045bbc5c230188))
* **deps:** bump actions/stale from 8 to 9 ([f09aaa6](https://github.com/discue/mongodb-resource-client/commit/f09aaa6eadc4fa7d5283afcb3d375d51faa64544))
* **deps:** run npm audit ([37726b8](https://github.com/discue/mongodb-resource-client/commit/37726b8afd2d0ec1d526609263e9354a7cf4f34b))
* **deps:** update dependencies ([fd58454](https://github.com/discue/mongodb-resource-client/commit/fd584541f008c10236e8a6d2a1ec3bcd1c5904a4))
* **docs:** update readme ([d2e7e7c](https://github.com/discue/mongodb-resource-client/commit/d2e7e7c68b05309d5081c6b61408e65662b48709))
* **simple-resource:** fix typo ([6dfbbae](https://github.com/discue/mongodb-resource-client/commit/6dfbbae7fad864140f18078220d204363dc1db51))

## [0.25.0](https://github.com/discue/mongodb-resource-client/compare/v0.24.0...v0.25.0) (2023-12-26)


### Chores

* emit close event before closing client ([8c347e4](https://github.com/discue/mongodb-resource-client/commit/8c347e42c10120e39dcd7e2a57c2b4af9a1b6c86))
* **history:** close storage when host closes ([6724de0](https://github.com/discue/mongodb-resource-client/commit/6724de0119c9022cc80700739660e42a3558bbf2))
* **simple-resource:** store also event emitter ([7e97f48](https://github.com/discue/mongodb-resource-client/commit/7e97f48f0565eea49b572afad3b3a9aaa7367892))

## [0.24.0](https://github.com/discue/mongodb-resource-client/compare/v0.23.0...v0.24.0) (2023-12-26)


### Features

* **history:** make possible to use parent collection also for history ([737ec2b](https://github.com/discue/mongodb-resource-client/commit/737ec2b01373301e17b76a78c91063f859882dbd))
* remove OT dependencies to support noop library ([5dde0b5](https://github.com/discue/mongodb-resource-client/commit/5dde0b5f076db9ef6ad55d1ab2b6ba5c9697c6dc))


### Chores

* **docs:** update readme ([d2d62fa](https://github.com/discue/mongodb-resource-client/commit/d2d62facf7e54fc97234a97268c59fb748913500))
* update readme ([3548f69](https://github.com/discue/mongodb-resource-client/commit/3548f696bfb8f05169dc802af879fb152fa0eae1))

## [0.23.0](https://github.com/discue/mongodb-resource-client/compare/v0.22.0...v0.23.0) (2023-12-17)


### Features

* **history:** do not add prefix to collection name ([5ac0245](https://github.com/discue/mongodb-resource-client/commit/5ac02453b9f376bd3c969142644d66844ee69a2c))

## [0.22.0](https://github.com/discue/mongodb-resource-client/compare/v0.21.1...v0.22.0) (2023-12-17)


### Features

* allow enabling eventing at runtime ([c3e0f13](https://github.com/discue/mongodb-resource-client/commit/c3e0f137a373c244a0eee03a85dc1d57e4bbddd4))


### Chores

* add optional deps as dev deps ([1493526](https://github.com/discue/mongodb-resource-client/commit/14935269bc926e4c7436c1ff1b9a1d0e70ed21ce))
* **deps-dev:** bump @types/chai from 4.3.6 to 4.3.9 ([699ec7f](https://github.com/discue/mongodb-resource-client/commit/699ec7fef128485aec9ddf660bdee52469ee4ae4))
* **deps-dev:** bump @types/node from 20.8.0 to 20.8.10 ([7a9bec7](https://github.com/discue/mongodb-resource-client/commit/7a9bec75f64c1625d1780a040d4b98f958beb869))
* **deps-dev:** bump eslint from 8.50.0 to 8.52.0 ([1a44981](https://github.com/discue/mongodb-resource-client/commit/1a449813e72adf10de1e62c43510b6751d4df5f4))
* **deps-dev:** bump mongodb-memory-server from 8.15.1 to 9.0.1 ([47995df](https://github.com/discue/mongodb-resource-client/commit/47995df613321499dae2b4162bb8f6df652c8f71))
* **deps:** bump actions/setup-node from 3 to 4 ([20ef031](https://github.com/discue/mongodb-resource-client/commit/20ef031c32b1b99d55df59c2e0436982117f03f3))
* **deps:** bump mongodb from 6.1.0 to 6.2.0 ([d0d86f6](https://github.com/discue/mongodb-resource-client/commit/d0d86f6ec91341cfe57b75d0ecf21246cbb755b6))
* **deps:** update dependencies ([ea2ea8b](https://github.com/discue/mongodb-resource-client/commit/ea2ea8b07a84eb42f9b062957bb09cfdd2d41aba))
* **deps:** update dependencies ([1ecf677](https://github.com/discue/mongodb-resource-client/commit/1ecf6770faaa25f5c2f9b3f82078b2058418de88))
* **docs:** update readme ([828e647](https://github.com/discue/mongodb-resource-client/commit/828e647e944def582cc3b89512e5e7507fce2632))
* **one-to-many-resource:** require minimum resource ids length ([a2f607b](https://github.com/discue/mongodb-resource-client/commit/a2f607b471beb059d22aaf033e6b1e714eda00e1))
* **one-to-many-resource:** update condition in getAll ([0a6ae07](https://github.com/discue/mongodb-resource-client/commit/0a6ae07ac74a98413b1b27e7fafbd083fdb9a03e))
* **types:** declare private methods) ([797a70a](https://github.com/discue/mongodb-resource-client/commit/797a70ae241a1899790c63fa117e86108187a1ee))

### [0.21.1](https://github.com/discue/mongodb-resource-client/compare/v0.21.0...v0.21.1) (2023-10-03)


### Bug Fixes

* **one-to-many-resource:** fix response contains unwanted properties ([588f230](https://github.com/discue/mongodb-resource-client/commit/588f2307a77ef357da06a6a11e59f65f9e02e33b))

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
