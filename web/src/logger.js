import { apiUrl, loggerFlushInterval } from "./config";
import * as beaver from 'beaver-logger';
import packageJson from '../package.json';
import Cookies from 'js-cookie';

const logger = beaver.Logger({

  // Url to send logs to
  url: `${apiUrl}/log`,

  // Prefix to prepend to all events
  prefix: packageJson.name,

  // Log level to display in the browser console
  logLevel: beaver.LOG_LEVEL.WARN,

  // Interval to flush logs to server
  flushInterval: loggerFlushInterval
});

logger.addHeaderBuilder(function() {
  return {
    access_token: `${Cookies.get('access_token')}`
  };
});

export default logger;
