const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.printf(
      ({ timestamp, level, message }) => `${timestamp} -- ${level}: ${message}`
    )
  ),
  transports: [
    new transports.Console(),
  ],
});

logger.stream = {
  write: function (message) {
    logger.info(message.trim());
  },
};

module.exports = logger;
