exports = module.exports = Unauthorized;

function Unauthorized(msg) {
  let errResponse = {};
  errResponse.name = "Unauthorized";
  errResponse.code = 401;
  errResponse.msg = {
    error: "Unauthorized_Access",
    description: "Please try with correct credentials",
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
