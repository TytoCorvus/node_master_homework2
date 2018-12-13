var helpers = {};

helpers.parseToJSON = function (data) {
    try {
        var obj = JSON.parse(data);
        return obj;
    } catch (err) {
        return false;
    }
};

module.exports = helpers;