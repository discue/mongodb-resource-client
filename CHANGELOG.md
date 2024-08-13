# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
