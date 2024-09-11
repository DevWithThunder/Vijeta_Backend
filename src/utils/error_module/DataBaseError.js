exports = module.exports = DataBaseError;

function DataBaseError(InputError) {
  let errResponse = {};
  errResponse.name = 'CallFailed';
  errResponse.code = 500;
  errResponse.msg = {
    'error': 'Backend_Call_Failed',
    'description': 'CRUD failed'
  };

  Error.call(errResponse, InputError);
  Error.captureStackTrace(errResponse, arguments.callee);
  return errResponse;
}