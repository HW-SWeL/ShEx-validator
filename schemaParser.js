var Promise = require('promise');

var shexSchemaParser = require('./includes/ShExSchemaParser.js');
var RDF = require('./includes/Erics_RDF.js');

exports.parseSchema = function parseSchema(schemaText, resolver) {
    return new Promise(function(resolve, reject) {
        if (!resolver) resolver = RDF.createIRIResolver();
        resolve(shexSchemaParser.parse(schemaText, resolver));
    });

};
