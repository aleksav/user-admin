import express from 'express'
import forceSSL from 'express-force-ssl'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import * as beaverLogger from 'beaver-logger/server'
import logger from '../logger'

export default (routes, config) => {
  const app = express()

  /* istanbul ignore next */
  if (config.env === 'production') {
    app.set('forceSSLOptions', {
      enable301Redirects: false,
      trustXFPHeader: true
    })
    app.use(forceSSL)
  }

  app.use(cors({
    origin: config.corsOrigin || 'none',
    credentials: true
  }))
  app.use(compression())
  app.use(morgan('combined', { stream: logger.stream }))

  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())
  app.use(bodyParser.raw({
    type: 'application/octet-stream',
    limit: '10mb'
  }))
  app.use(cookieParser())
  app.use(config.apiRoot, routes)
  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())
  app.use(express.static('./web'))

  app.use(beaverLogger.expressEndpoint({

    // URI to recieve logs at
    uri: '/api/log',

    // Custom logger (optional, by default logs to console)
    logger: {
      log: function (req, level, event, payload) {
        logger.log({
          level: logger.levels[level] ? level : 'info',
          message: { event, payload }
        })
      }
    },

    // Enable cross-origin requests to your logging endpoint
    enableCors: true

  }))

  return app
}
