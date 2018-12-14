var ROUTE = require('./route');
var token = require('./token');
var lib = require('../lib/data');
var helpers = require('../lib/helpers');

//Uses the query to specify what user is being gathered. 
// @TODO also takes a token
var get = function (request, callback) {
    if (!request.query.email) {
        callback(400, { 'Error': 'Missing or invalid parameters' });
    }

    lib.read('users', id, function (err, data) {
        if (!err && data) {
            callback(200, helpers.parseToJSON(data));
        } else {
            callback(404, { 'Error': 'Resource not found' });
        }
    });
}

//Allows users to create their profile
//Requires a first name, a last name, an email, an address, and a password
var post = function (request, callback) {
    var req_data = helpers.parseToJSON(request.payload);
    if (!req_data) {
        callback(400, { 'Error': 'Bad data was sent by the client' });
    }

    var fname = req_data.firstName && typeof (req_data.firstName) == 'string' && req_data.firstName.length > 0 ? req_data.firstName : false;
    var lname = req_data.lastName && typeof (req_data.lastName) == 'string' && req_data.lastName.length > 0 ? req_data.lastName : false;
    var email = req_data.email && helpers.is_valid_email(req_data.email) ? req_data.email : false;
    var address = req_data.address && typeof (req_data.address) == 'string' && req_data.address.length > 0 ? req_data.address : false;
    var password = req_data.password && typeof (req_data.password) == 'string' && req_data.password.length > 7 ? req_data.password : false;

    if (!(fname && lname && email && address && password)) {
        callback(400, { 'Error': 'Missing or invalid arguments' });
    }
    else {
        var user_data = {
            'fname': fname,
            'lname': lname,
            'email': email,
            'address': address,
            'hashedPassword': helpers.hash(password)
        }

        lib.read('users', email, function (err, data) {
            if (err) {
                lib.create('users', email, user_data, function (err) {
                    if (!err) {
                        callback(200, { 'Message': 'The user has been created' });
                    } else {
                        callback(500, { 'Error': 'Error creating user' });
                    }
                });
            } else {
                callback(403, { 'Error': 'The user already exists' });
            }
        });
    }
}

var put = function (request, callback) {

}

var del = function (request, callback) {

}

var directory = {
    'token': token
};
var handlers = {
    'get': get,
    'post': post,
    'put': put,
    'delete': del
};

var users = new ROUTE(handlers, directory);
module.exports = users;