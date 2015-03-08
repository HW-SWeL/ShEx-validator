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

    for (var startingNodeName in startingNodes) {

        if(!startingNodes[startingNodeName]) break;

        startingNode = dataParser.parseNode(startingNodeName, dbResolver.Prefixes);

        var validation = schema.validate(
            startingNode,
            startingNodes[startingNodeName],
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
        passed: errors.length === 0
    };
}

module.exports.validate = validate;
