/*
*
*   This file will export the correct configuration based on passed variables
*
*/

var environments = {};

//This variable helps us default to a particular environment
environments.default = 'staging';

environments.staging = {
    'httpPort': 3000,
    'https': {
        'port': 30001,
        'key': '',
        'cert': '',
    },
    'envName': 'staging',
    'hashSecret': 'PizZapIE'
}

environments.production = {
    'httpPort': 4000,
    'https': {
        'port': 40001,
        'key': '',
        'cert': '',
    },
    'envName': 'staging',
    'hashSecret': 'aSPICyPizZapIE'
}

//If the passed environment does not work, we make sure to pass the default
var env = typeof (process.env.NODE_ENV) == 'string' && typeof (environments[process.env.NODE_ENV]) == 'object' ? process.env.NODE_ENV.toLowerCase() : environments.default;
var chosenEnvironment = typeof (environments[env]) == 'object' ? environments[env] : environments[environments.default];

module.exports = chosenEnvironment;