var lib = require('./data');
var config = require('../config');
var crypto = require('crypto');

var helpers = {};

helpers.parseToJSON = function (data) {
    try {
        var obj = JSON.parse(data);
        return obj;
    } catch (err) {
        return false;
    }
};

//The id is the unique ID for the user - for this application that happens to be their email
helpers.token_matches_user = function (token, id) {
    lib.read('tokens', token, function (err, data) {
        if (!err, data) {
            return data.id == id ? true : false;
        } else {
            //The token could not be read or does not exist. Return false
            return false;
        }
    });
}

helpers.generate_random_string = function (length) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = '';

    for (var i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
}

//Placed here so it won't need to be written in multiple locations
//Simple regex to check whether strings are valid emails or not
helpers.is_valid_email = function (email) {
    if (typeof (email) != 'string') { return false; }
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(email);
}

//Hashes 
helpers.hash = function (str) {
    return crypto.createHmac('sha256', config.hashSecret).update(str).digest('hex');
}

module.exports = helpers;