const { MongoMemoryReplSet } = require('mongodb-memory-server')

let mongod

before(async function () {
    // This will create an new instance of "MongoMemoryServer" and automatically start it
    mongod = await MongoMemoryReplSet.create({
        instanceOpts: [{
            ip: '::,0.0.0.0',
            port: 27017
        }],
        instance: {
            ip: '::,0.0.0.0',
            port: 27017
        },
        replSet: {
            count: 1
        },
        binary: {
            version: '6.0.0'
        }
    })
})

after(function () {
    return mongod.stop()
})