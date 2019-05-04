import { createLogger, format, transports, config } from 'winston'
const { combine, timestamp, prettyPrint, colorize, printf } = format;

const logger = new createLogger({
  level: 'debug',
  format: combine(
    format.splat(),
    format.simple(),
    colorize(),
    timestamp(),
    prettyPrint(),
    printf(info => {
      return `${info.timestamp} [${info.level}] : ${JSON.stringify(info.message)}`;
    })
  ),
  transports: [
    new transports.Console()
  ],
  exitOnError: false
})

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  },
};

logger.levels = config.syslog.levels

export default logger;
