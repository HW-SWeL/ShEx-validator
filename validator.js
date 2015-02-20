var shexSchemaParser = require('./includes/ShExSchemaParser.js');
var RDF = require('./includes/Erics_RDF.js');


exports.parseSchema = function parseSchema(schemaText, resolver) {
    if(!resolver) resolver = RDF.createIRIResolver();
    return shexSchemaParser.parse(schemaText, resolver);
}


function validate(schemaText, startingNodes, graph, closedShapes) {

    var resolver = RDF.createIRIResolver();

    var schema = parseSchema(schemaText, resolver);

    for (var startingNode in startingNodes) {
        schema.validate(startingNode, schema.startRule, graph,
            {
                iriResolver: resolver,
                closedShapes: closedShapes
            }, true);
    }

}
