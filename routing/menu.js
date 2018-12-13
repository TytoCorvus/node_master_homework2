var ROUTE = require('./route');

var directory = {};

var get = function (request, callback) {
    callback(200, { 'message': 'This is the menu object' });
}

var handlers = {
    'get': get
};

var menu = new ROUTE(handlers, directory);

module.exports = menu;