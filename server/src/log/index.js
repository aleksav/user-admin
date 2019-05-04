import { Router } from "express";
import { token } from "../services/passport";
import * as beaverLogger from "beaver-logger/server";
import logger from "../services/logger";

const router = new Router()

router.post('/',
  token({ required: true }),
  beaverLogger.expressEndpoint({

    // URI to recieve logs at
    uri: '',

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

  })
)

export default router
