var RDF = require('./includes/Erics_RDF.js');
var dataParser = require("./dataParser.js");
var errorFormatter = require("./validationErrorFormatter.js");


function validate(schema,
                  schemaResolver,
                  startingNodes,
                  db,
                  dbResolver,
                  closedShapes,
                  validationResult) {


    schema.alwaysInvoke = {};

    for (var startingNode in startingNodes) {

        startingNode = dataParser.parseNode(startingNodes[startingNode], dbResolver.Prefixes);

        var validation = schema.validate(
            startingNode,
            schema.startRule,
            db,
            {
                iriResolver: schemaResolver,
                closedShapes: closedShapes
            },
            true
        );

        var cleanedResults = cleanupValidation(validation, dbResolver, startingNode);

        validationResult(cleanedResults);

    }
}

function cleanupValidation(valRes, resolver, startingNode) {
    var errors = valRes.errors.map(errorFormatter);

    return {
        errors: errors,
        matches: valRes.matches,
        startingNode: startingNode,
        passed: valRes.passed()
    };
}

module.exports.validate = validate;
