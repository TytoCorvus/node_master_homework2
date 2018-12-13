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
})();