exports = module.exports = BadRequest;

function BadRequest(msg) {
  let errResponse = {};
  errResponse.name = "BadRequest";
  errResponse.code = 400;
  errResponse.msg = {
    error: "Invalid_Request",
    description: "Invalid Request",
  };

  if ((msg && msg instanceof String) || typeof msg === "string") {
    errResponse.msg.description = msg;
  } else if (msg) {
    errResponse.msg = msg;
  }

  Error.call(errResponse, msg);
  Error.captureStackTrace(errResponse, arguments.callee);
  return errResponse;
}
