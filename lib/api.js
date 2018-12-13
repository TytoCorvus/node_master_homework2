/*
*
*   This is the main server for the application. It handles routing requests
*
*/

var http = require('http');
var https = require('https');
var url = require('url');
var string_decoder = require('string_decoder').StringDecoder;

var config = require('./../config');
var route = require('./route_parent');

var api = {};

//api.http_server = http.createServer(api.unified_server);
api.http_server = http.createServer(function (req, res) {
    api.unified_server(req, res)
});

//api.httpsServer = https.createServer();

api.unified_server = function (req, res) {
    var decoder = new string_decoder('utf-8');
    var buffer = '';

    req.on('data', function (data) {
        buffer += decoder.write(data);
    });

    //Once we have gathered all of the information 
    req.on('end', function () {
        buffer += decoder.end();

        //Get the URL and parse the info 
        var parsed_url = url.parse(req.url, true);
        var path = parsed_url.pathname.replace(/^\/+|\/+?/, '');


        var request = {
            'url': parsed_url,
            'method': req.method.toLowerCase(),
            'path': path,
            'pathArray': path.length > 0 ? path.split('/') : [],
            'query': parsed_url.query,
            'headers': req.headers,
            'payload': buffer
        };

        //Sends the information to the route parent to be handled there
        //The function is a callback which sends information as needed
        route.direct(request, function (status_code, response) {
            //status_code needs to be a number
            if (typeof (status_code) != 'number') {
                res.writeHead(500, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({ 'Error': 'There was an internal server error' }));
                return;
            }

            //Managing the different types of responses we could give
            //The intent here is to allow us to be more flexible in what our routes return
            switch (typeof (response)) {
                case 'object':
                    break;
                case 'string':
                    response = {
                        'result': true,
                        'message': response
                    };
                    break;
                case 'boolean':
                    response = {
                        'result': response,
                        'message': response ? 'Operation succeeded' : 'Operation failed'
                    }
                    break;
                case 'number':
                    response = {
                        'result': response,
                        'message': `Operation concluded with code ${response}`
                    }
                    break;
                case 'undefined':
                default:
                    response = {}
                    break;
            }

            //Now we construct and send out our response message
            res.writeHead(status_code, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(response));
        });
    });
};


api.init = function () {
    api.http_server.listen(config.httpPort, function () {
        console.log("The server is now listening on port ", config.httpPort);
    });
};

module.exports = api;