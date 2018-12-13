/*
*
*   This script file is the parent of all of the routes.
*
*/
var menu = require('./menu');
var ROUTE = require('./route');

var directory = {
    'menu': menu
};

var get_post = function (request, callback) {
    callback(200, 'The route parent is working');
}

var handlers = {
    'get': get_post,
    'post': get_post
};

var route_parent = new ROUTE(handlers, directory);

module.exports = route_parent;