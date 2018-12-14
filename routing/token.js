var ROUTE = require('./route');
var lib = require('../lib/data');
var helpers = require('../lib/helpers');

var get = function (request, callback) {
    if (!(request.query.email && request.query.password)) {
        callback(403, { 'Error': 'Missing or invalid query parameters' });
    }
    else {
        lib.read('users', request.qeury.email, function (err, data) {

        });
    }
}

var handlers = {
    'get': get
};

var token = new ROUTE(handlers);
module.exports = token;