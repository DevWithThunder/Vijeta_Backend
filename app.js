const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./src/config/db");
const logger = require("./src/utils/logger");
const morgan = require("morgan");
const { environment } = require("./environments");
const routes = require("./src/routes");
const ErrorModule = require("./src/utils/error_module/errors");
const { Unauthorized } = new ErrorModule();
const { RETURN_STRINGS } = require("./src/config/defaults");
const errorHandler = require("./src/middlewares/errorHandler");
const args = require("minimist")(process.argv);
require("dotenv").config();

const app = express();
connectDB();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger Middleware
app.use(
  morgan(
    (tokens, req, res) => {
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

// CORS Options
const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    if (origin === environment.BASE_PATH) {
      return callback(null, true);
    }
    console.log(Unauthorized(RETURN_STRINGS.UNAUTHORISED_FOR_MISSING_HEADER));
    return callback(
      Unauthorized(RETURN_STRINGS.UNAUTHORISED_FOR_MISSING_HEADER)
    );
  },
};

// CORS Middleware
app.use(cors(corsOptions));

// Error Handler Middleware
app.use(errorHandler);

// Routes
app.use("/", routes);

// Set port
app.set("port", args.p || process.env.PORT || 5000);
const PORT = app.get("port");

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
