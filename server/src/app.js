
import http from 'http'
import config, { env, mongo, port, ip } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import routes from './routes'
import logger from './services/logger'
import { user_model } from './entities/user/model'
import MongoMemoryServer from 'mongodb-memory-server';

console.log(`Embedded Mongo: ${config.embeddedMongo}`)
if(config.embeddedMongo == 'true'){
  console.log("Using embedded mongodb...")
  const mongod = new MongoMemoryServer(
    {
      instance: {
        port: 27017, // by default choose any free port
        dbName: "user-admin-db"// by default generate random dbName
      }
    }
  );
  mongod.getConnectionString()
  .then(uri => console.log(`Embedded mongodb started on:${uri}`))
  .then(x => {
    
    mongosetup()
  })
  
  
}else{
  console.log("Looking up mongodb...")
  mongosetup()
}
const app = express(routes, config)
const server = http.createServer(app)



setImmediate(() => {
  server.listen(port, ip, () => {
    logger.info('user-admin Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export default app

function mongosetup(){
  console.log(`Connecting to mongo ${mongo.uri}`)
  mongoose.connect(mongo.uri)
  mongoose.Promise = Promise
  
  user_model.countDocuments()
  .then(userCnt => {
    if(userCnt == 0){
      console.log('No users in the database, creating admin...')
      return user_model.create({username: "admin", name:"Admin Admin", password: "admin", email: "admin@user-admin.com", roles:["admin"]})
    }else{
      console.log(`Found ${userCnt} users in the database...`)
    }
  })
}