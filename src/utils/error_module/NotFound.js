exports = module.exports = NotFound;

function NotFound(msg) {
  let errResponse ={};
  errResponse.name = 'NotFound';
  errResponse.code = 404;
  errResponse.msg = {
    'error': 'Not_Found_Entity',
    'description': 'No data found'
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
