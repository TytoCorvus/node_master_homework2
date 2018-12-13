var ROUTE = require('./route');
var lib = require('../lib/data');

var directory = {};

var get = function (request, callback) {
    lib.read('misc', 'menu', function (err, data) {
        if (!err && data) {
            callback(200, data);
        } else {
            callback(404, { 'Error': 'Could not find the menu' });
        }
    });
}

var handlers = {
    'get': get
};

var menu = new ROUTE(handlers, directory);

module.exports = menu;