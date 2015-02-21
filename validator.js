var shexSchemaParser = require('./includes/shexParser.js');
var RDF = require('./includes/Erics_RDF.js');


function validate(schema, startingNodes, db, closedShapes, validationCallback) {

    var resolver = RDF.createIRIResolver();

    for (var startingNode in startingNodes) {

        //BEGIN HACKINESS
        startingNode = RDF.IRI(resolver.getAbsoluteIRI(startingNodes[startingNode]), RDF.Position0());
        schema.alwaysInvoke = {};

        var results;

        var validation = schema.validate(startingNode, schema.startRule, db,
            {
                iriResolver: resolver,
                closedShapes: closedShapes
            }, true);

        validationCallback(validation);
    }

}

module.exports.validate = validate;
