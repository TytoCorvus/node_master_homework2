var routes = {};

//Gets passed all of the request data and a callback
//callback takes a number (status code) and the content of the response as a string
routes.handle = function (request, callback) {
    callback(200, "The route has received the info");
}

module.exports = routes;