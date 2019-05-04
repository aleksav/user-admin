
/* eslint-disable no-unused-vars */
import path from 'path'
import merge from 'lodash/merge'

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example')
  })
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 8080,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '',
    appUrl: process.env.APP_URL || 'localhost:3002',
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    corsOrigin: requireProcessEnv('CORS_ORIGIN'),
    serviceEmailUser: requireProcessEnv('SERVICE_EMAIL_USER'),
    serviceEmailPassword: requireProcessEnv('SERVICE_EMAIL_PASSWORD'),
    
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://db/server',
      options: {
        db: {
          safe: true
        }
      }
    },
    
  },
  test: {
    
  },
  development: {
    mongo: {
      options: {
        debug: true
      }
    },
    
  },
  production: {
    ip: process.env.IP || undefined,
    
  }
}

module.exports = merge(config.all, config[config.all.env])
export default module.exports
