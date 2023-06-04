const { MongoMemoryServer } = require('mongodb-memory-server')

let mongod

before(async function () {
    // This will create an new instance of "MongoMemoryServer" and automatically start it
    mongod = await MongoMemoryServer.create({
        instance: {
            ip: '::,0.0.0.0',
            port: 27017
        },
        binary: {
            version: '6.0.0'
        }
    })
})

after(function () {
    return mongod.stop()
})