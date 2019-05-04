import { EventEmitter } from 'events'
import MongodbMemoryServer from 'mongodb-memory-server'
import mongoose from '../src/services/mongoose'

EventEmitter.defaultMaxListeners = Infinity
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

let mongoServer

beforeAll(async () => {
  mongoServer = new MongodbMemoryServer({
    binary: {
      checkMD5: true
    },
    autoStart: false
  })

  if (!mongoServer.isRunning) {
    await mongoServer.start();
  }

  const mongoUri = await mongoServer.getConnectionString()
  await mongoose.connect(mongoUri, {useNewUrlParser: true}, (err) => {
    if (err) console.error(err)
  })
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

afterEach(async () => {
  const {collections} = mongoose.connection
  const promises = []
  Object.keys(collections).forEach((collection) => {
    promises.push(collections[collection].remove())
  })
  await Promise.all(promises)
})
