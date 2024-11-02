exports = module.exports = CallFailed;

function CallFailed(msg) {
  let errResponse = {};
  errResponse.name = 'CallFailed';
  errResponse.code = 500;
  errResponse.msg = {
    'error': 'Backend_Call_Failed',
    'description': 'Requested api call has failed'
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
