var shexSchemaParser = require('./includes/shexParser.js');
var RDF = require('./includes/Erics_RDF.js');


function validate(schema, startingNodes, db, closedShapes, validationCallback, resolver) {
    //BEGIN HACKINESS

    schema.alwaysInvoke = {};


    for (var startingNode in startingNodes) {

        startingNode = RDF.IRI(resolver.getAbsoluteIRI(startingNodes[startingNode]));

        var validation = schema.validate(startingNode, schema.startRule, db,
            {
                iriResolver: resolver,
                closedShapes: closedShapes
            }, true);

        validationCallback(validation);
    }

}

module.exports.validate = validate;
