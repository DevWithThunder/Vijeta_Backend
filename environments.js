const args = require('minimist')(process.argv);
const config = require('./config');

if (args.e == 'local') {
    const environment = Object.freeze(config[args.e]);
    module.exports = {
        environment
    }
} else {
    const environment = process.env;
    module.exports = {
        environment
    }
}
