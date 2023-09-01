const { MongoMemoryReplSet } = require('mongodb-memory-server')

let mongod

before(async function () {
    // This will create an new instance of "MongoMemoryServer" and automatically start it
    mongod = await MongoMemoryReplSet.create({
        instanceOpts: [{
            port: 27021
        }],
        replSet: {
            ip: '::,0.0.0.0',
            count: 1
        },
        binary: {
            version: '6.0.0'
        }
    })

    console.log('repl uri', mongod.getUri())
})

after(function () {
    return mongod.stop()
})