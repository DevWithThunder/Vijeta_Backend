const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./src/config/db");
const logger = require("./src/utils/logger");
const morgan = require("morgan");
const { environment } = require("./environments");
const routes = require("./src/routes")
const ErrorModule = require("./src/utils/error_module/errors");
const { Unauthorized } = new ErrorModule();
const { RETURN_STRINGS } = require("./src/config/defaults");
const errorHandler = require("./src/middlewares/errorHandler");
const args = require('minimist')(process.argv);
require('dotenv').config();
const app = express();
connectDB();

app.use(helmet());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  morgan(
    function (tokens, req, res) {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens["response-time"](req, res),
        "ms",
      ].join(" ");
    },
    {
      stream: logger.stream,
    }
  )
);
app.use('/', routes);

var corsOptions = {
  origin: function (origin, callback) {
    if (origin === environment.BASE_PATH) {
      callback(null, true);
    } else {
      callback(Unauthorized(RETURN_STRINGS.UNAUTHORISED_FOR_MISSING_HEADER));
    }
  },
};

app.use(cors(corsOptions));
app.use(errorHandler);

app.set("port", args.p);
const PORT = app.get("port") || process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
