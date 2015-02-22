var Promise = require('promise');

var shexSchemaParser = require('./includes/shexParser.js');
var RDF = require('./includes/Erics_RDF.js');

exports.parseSchema = function parseSchema(schemaText, resolver) {
    return new Promise(function(resolve, reject) {
        var schema;
        try{
            schema = shexSchemaParser.parse(schemaText, {iriResolver: resolver});
        }
        catch (e) {
            reject(e);
        }
        resolve(schema);
    });
};
