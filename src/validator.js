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

        var instSh = RDF.IRI("http://open-services.net/ns/core#instanceShape");

        var validation = schema.validate(
            startingNode,
            startingResources[startingResource],
            db,
            RDF.ValidatorStuff(schemaResolver, closedShapes, true).push(startingNode, instSh),
            true
        );

        return cleanupValidation(validation, dbResolver, startingNode, validationResult);


    }
}

function cleanupValidation(valRes, resolver, startingResource, cb) {

    return valRes.then(function(valRes) {
        var errors = valRes.errors.map(errorFormatter);

        cb({
            errors: errors,
            matches: valRes.matches,
            startingResource: startingResource,
            passed: errors.length === 0
        });
    });

}

module.exports.validate = validate;
