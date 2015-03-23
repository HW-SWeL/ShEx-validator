var Promise = require("promise");
var readFile = Promise.denodeify(require('fs').readFile);


module.exports = function(schemaFile, dataFile) {
    var toString = function (t) {
        return t.toString();
    };

    var schema = readFile("test/data/" + schemaFile + ".shex").then(toString);
    var data = readFile("test/data/" + (dataFile?dataFile:schemaFile) + ".ttl").then(toString);

    return Promise.all([schema, data]).then(function(r) {
        return {schema: r[0], data: r[1]};
    });
};

