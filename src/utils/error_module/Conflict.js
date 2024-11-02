exports = module.exports = Conflict;

function Conflict(msg) {
  let errResponse = {};
  errResponse.name = 'Conflict';
  errResponse.code = 409;
  errResponse.msg = {
    'error': 'Conflict',
    'description': 'Conflict Request'
  };

  if (msg && msg instanceof String || typeof (msg) === 'string') {
    errResponse.msg.description = msg;
  } else if (msg) {
    errResponse.msg = msg;
  }

  Error.call(errResponse, msg);
  Error.captureStackTrace(errResponse, arguments.callee);
  return errResponse;
}