const logger = require("../utils/logger");
const { RETURN_STRINGS } = require("../config/defaults");

const errorHandler = (err, req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  let error = {
    name: "Internal Server Error",
    code: 500,
    msg: {
      error: "Internal Server error",
      description: "Internal Server error. Server not found.",
    },
  };
  logger.error(err?.msg?.description || error?.msg?.description);
  res.status(err.code || 500).json(err || error);
};

module.exports = errorHandler;
