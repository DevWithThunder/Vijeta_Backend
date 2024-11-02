exports = module.exports = DataBaseError;

function DataBaseError(InputError) {
  let errResponse = {};
  errResponse.name = "CallFailed";
  errResponse.code = 500;
  errResponse.msg = {
    error: "Backend_Call_Failed",
    description: "CRUD failed",
  };

  if (
    (InputError && InputError instanceof String) ||
    typeof InputError === "string"
  ) {
    errResponse.msg.description = InputError;
  } else if (InputError) {
    errResponse.msg = InputError;
  }

  Error.call(errResponse, InputError);
  Error.captureStackTrace(errResponse, arguments.callee);
  return errResponse;
}
