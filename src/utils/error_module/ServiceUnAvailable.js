exports = module.exports = ServiceUnAvailable;

function ServiceUnAvailable(msg, displayName, isUploadBill) {
  let errResponse = {};
  errResponse.name = 'ServiceUnAvailable';
  errResponse.code = 503;
  errResponse.msg = {
    'error': 'Service_Unavailable',
    'description': 'Requested Service Unavailable'
  };

  if (msg && msg instanceof String || typeof (msg) === 'string') {
    errResponse.msg.description = msg;
  } else if (msg) {
    errResponse.msg = msg;
  }

  if (displayName) {
    errResponse.msg.displayErrorMsg = displayName;
  }
  if (isUploadBill) {
    errResponse.msg.uploadBill = isUploadBill;
  }


  Error.call(errResponse, msg);
  Error.captureStackTrace(errResponse, arguments.callee);
  return errResponse;
}
