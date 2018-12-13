/*
*   The route class that I have created here is supposed to simplify routing
*   It takes two objects - 
*   The first is a set of handlers for this path and their accompanying request methods
*   The second is a directory of other routes that this path will forward to if it isn't the end of the path
*/

class ROUTE {

    constructor(handlers, directory) {
        this.handlers = handlers
        this.directory = directory && typeof (directory) == 'object' ? directory : false;
    }

    direct(request, callback) {
        if (!request.remainingPath) {
            request.remainingPath = request.pathArray;
        }

        //If the remaining path has a length of zero, this is the intended destination. We handle from here.
        if (request.remainingPath.length == 0) {
            if (typeof (this.handlers[request.method]) == 'function') {
                this.handlers[request.method](request, callback);
            }
            else {
                callback(400, { 'Error': 'The method chosen is not accepted for this path' });
            }

        } else if (this.directory && this.directory[request.remainingPath[0]]
            && this.directory[request.remainingPath[0]] instanceof ROUTE) {

            //Get rid of the first element of the path array
            var next = request.remainingPath.shift();
            this.directory[next].direct(request, callback);
        } else {
            //The path does not exist - handle it accordingly
            callback(404, { 'Error': 'The path specified does not exist' });
        }
    }
}

module.exports = ROUTE;