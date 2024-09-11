const nodemailer = require('nodemailer');
const { environment } = require('../../../environments');

let config = {
  host: environment.RNLIC_SMTP_HOST,
  port: parseInt(environment.RNLIC_SMTP_PORT, 10),
  secure: false,
  connectionTimeout : 45000,
  socketTimeout : 45000
};
if (environment.RNLIC_SMTP_CREDENTIAL_FLAG == 'TRUE') {
  config.auth = {
    user: environment.RNLIC_SMTP_USERNAME,
    pass: environment.RNLIC_SMTP_PASSWORD,
  };
}
const transporter = new nodemailer.createTransport(config);
/*
transporter.verify((err,res)=>{
    if(err) {
        console.log(err);
        process.exit(1);
    }
});
*/
module.exports.Transporter = transporter;
