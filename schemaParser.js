var Promise = require('promise');

var shexSchemaParser = require('./includes/shexParser.js');
var RDF = require('./includes/Erics_RDF.js');

exports.parseSchema = function parseSchema(schemaText, resolver) {
    return new Promise(function(resolve, reject) {

        resolve(shexSchemaParser.parse(schemaText, {iriResolver: resolver}));
    });
};
