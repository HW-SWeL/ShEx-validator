var Promise = require('promise');

// var shexSchemaParser = require('../includes/shexParser.js');
// var RDF = require('../includes/Erics_RDF.js');
var shexjs = require('shex');
exports.parseSchema = function parseSchema(base,schemaText) {
    return new Promise(function (resolve, reject) {
        var resolver = RDF.createIRIResolver();
        var schema;
        var schema2;
        try {
            schema = shexjs.Parser.construct(base).parse(schemaText);
            // schema = shexSchemaParser.parse(schemaText, {iriResolver: resolver, bnodeScope:RDF.createBNodeScope()});
            console.log(schema);
            console.log(schema2);
        }
        catch (e) {
            reject(e);
        }

        // var shapes = schema.ruleLabels.map(function (rule) {
        //     return rule.toString();
        // });

        // var shapes = schema.shapes;

        // resolve({schema: schema, resolver: resolver, shapes: shapes});
        resolve({schema: schema, resolver: resolver, shapes: schema.shapes});

    });
};
