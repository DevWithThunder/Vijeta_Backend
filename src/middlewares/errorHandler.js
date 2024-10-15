const logger = require("../utils/logger");
const { RETURN_STRINGS } = require("../config/defaults");

const errorHandler = (err, req, res, next) => {
  logger.error(err);
  res.header("Content-Type", "application/json; charset=utf-8");
  res.status(err.code || 500).json({
    message: err.message || RETURN_STRINGS.INTERNAL_SERVER_ERROR,
  });
};

module.exports = errorHandler;
