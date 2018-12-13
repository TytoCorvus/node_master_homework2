/*
*
*   This script file is the parent of all of the routes.
*
*/
var ROUTE = require('./route');

var directory = {};

var get_post = function (request, callback) {
    callback(200, 'The route parent is working');
}

var handlers = {
    'get': get_post,
    'post': get_post
};

var route_parent = new ROUTE(directory, handlers);

module.exports = route_parent;