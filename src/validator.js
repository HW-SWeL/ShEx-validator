var RDF = require('../includes/Erics_RDF.js');
var dataParser = require("./dataParser.js");
var errorFormatter = require("./validationErrorFormatter.js");


function validate(schema,
                  schemaResolver,
                  startingResources,
                  db,
                  dbResolver,
                  closedShapes,
                  validationResult) {


    schema.alwaysInvoke = {};

    for (var startingResource in startingResources) {

        if(!startingResources[startingResource]) break;

        var startingNode = dataParser.parseNode(startingResource, dbResolver.Prefixes);

        var validation = schema.validate(
            startingNode,
            startingResources[startingResource],
            db,
            {
                iriResolver: schemaResolver,
                closedShapes: closedShapes
            },
            true
        );

        return cleanupValidation(validation, dbResolver, startingNode, validationResult);


    }
}

function cleanupValidation(valRes, resolver, startingResource, cb) {

    return valRes.then(function(valRes) {
        var errors = valRes.errors.map(errorFormatter.bind(null,startingResource));

        cb( {
            errors: errors,
            matches: valRes.matches,
            startingResource: startingResource,
            passed: errors.length === 0
        });
    });

}

module.exports.validate = validate;
