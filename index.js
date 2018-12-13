/*  
*   Author: Bryce Collins
*   
*   This application provides an API for a fictional pizza shop, which among other things supports multiple users,
*   logging in and out, getting the menu, filling a shopping cart, creating an order and paying with stripe,
*   and sending email notifications with mailgun
*/

var api = require('./lib/api');
var workers = require('./lib/workers');
var data = require('./lib/data');

(function () {
    //Initialize the workers
    workers.init();

    //Initialize the server
    api.init();

    /*
    data.create('menu', 'item1', { 'menuItem': 'This is the first menu item!' }, function (err) {
        if (err) {
            console.log("error creating file");
        }
        else {
            console.log("no error creating file");
        }
    });
    

    data.read('menu', 'item1', function (err, data) {
        if (!err && data) {
            console.log("Read from file: ", data);
        }
        else {
            console.log("Error: ", err);
        }
    });
    

    data.update('menu', 'item1', { 'message': 'This content is now just a message!' }, function (err) {
        if (!err && data) {
            console.log("Rewrite successful");
        }
        else {
            console.log("Error: ", err);
        }
    });
    */
    data.append('menu', 'item1', { 'message': 'Message too' }, function (err) {
        if (!err) {
            console.log("Append successful");
        }
        else {
            console.log("Error: ", err);
        }
    });
})();