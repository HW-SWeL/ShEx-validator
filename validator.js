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

    var matches = valRes.matches.map(function (ruleMatch) {
        var match = RDF.Triple(ruleMatch.rule.label, ruleMatch.rule.nameClass.term, ruleMatch.rule.valueClass.type);
        return {
            rule : match,
            triple : ruleMatch.triple
        }
    });

    return {
        errors: errors,
        matches: matches,
        startingNode: startingNode,
        passed: valRes.passed()
    };
}

module.exports.validate = validate;
