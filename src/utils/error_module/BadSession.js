exports = module.exports = BadSession;

function BadSession(msg) {
  let errResponse = {};
  errResponse.name = 'BadSession';
  errResponse.code = 401;
  errResponse.msg = {
    'error': 'Invalid_Session',
    'description': 'Invalid Session'
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
