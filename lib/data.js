var fs = require('fs');
var path = require('path');
var helpers = require('./helpers.js');

var lib = {};
lib.base_dir = path.join(__dirname, '../.data/');

//Creates a brand new file
lib.create = function (directory, filename, data, callback) {
    //Trim slashes off of the beginning and end of dir
    directory = directory.replace(/^\/+|\/+?/, '');

    //Create the file for writing
    fs.open(lib.base_dir + directory + '/' + filename + '.json', 'wx', function (err, fd) {
        if (!err && fd) {
            //The file was opened without errors and now we write our data
            fs.writeFile(fd, JSON.stringify(data), function (err) {
                if (!err) {
                    //The file was written without issue and now we close the file
                    fs.close(fd, function (err) {
                        if (!err) {
                            callback(false);
                        } else {
                            callback({ 'Error': 'error closing file' });
                        }
                    });
                }
                else {
                    callback({ 'Error': 'error writing to the file' });
                }
            });
        }
        else {
            callback({ 'Error': 'The file already exists' });
        }
    });
};

// Read in all of the data from the file in question
lib.read = function (directory, filename, callback) {
    fs.readFile(lib.base_dir + directory + '/' + filename + '.json', function (err, data) {
        if (!err && data) {
            var dataObj = helpers.parseToJSON(data);
            if (dataObj) {
                callback(false, dataObj);
            }
            else {
                callback({ 'Error': 'Error parsing the file to JSON' });
            }

        } else {
            callback({ 'Error': 'Error reading the file - It is open elsewhere or does not exist' });
        }
    });
};

//Overwrite the contents of a file with new information
lib.update = function (directory, filename, data, callback) {
    fs.open(lib.base_dir + directory + '/' + filename + '.json', 'r+', function (err, fd) {
        if (!err && fd) {
            var str_data = typeof (data) == 'object' ? JSON.stringify(data) : data;
            fs.truncate(fd, function (err) {
                if (!err) {
                    fs.writeFile(fd, str_data, function (err) {
                        if (!err) {
                            fs.close(fd, function (err) {
                                if (!err) {
                                    callback(false);
                                } else {
                                    callback({ 'Error': 'Error closing the file' });
                                }
                            })
                        } else {
                            callback({ 'Error': 'Error writing to the file' });
                        }
                    });
                }
                else {
                    callback({ 'Error': 'Error truncating the file' });
                }
            });
        }
        else {
            callback({ 'Error': 'Error opening the file' });
        }
    });
};

//Wrire the information to the end of the file
lib.append = function (directory, filename, data, callback) {
    fs.open(lib.base_dir + directory + '/' + filename + '.json', 'a', function (err, fd) {
        if (!err && fd) {
            var str_data = typeof (data) == 'object' ? JSON.stringify(data) : data;
            fs.appendFile(fd, '\n' + str_data, function (err) {
                if (!err) {
                    fs.close(fd, function (err) {
                        if (!err) {
                            callback(false);
                        } else {
                            callback({ 'Error': 'Error closing the file' });
                        }
                    })
                } else {
                    callback({ 'Error': 'Error appending to the file' });
                }
            });
        }
        else {
            callback({ 'Error': 'Error opening the file' });
        }
    });
};

//Remove a file from the system completely
lib.delete = function (directory, filename, callback) {
    fs.unlink(lib.base_dir + directory + '/' + filename + '.json', function (err) {
        if (!err) {
            callback(false);
        }
        else {
            callback({ 'Error': 'could not delete the file' });
        }
    });

};

module.exports = lib;