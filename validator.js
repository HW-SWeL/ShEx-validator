var shexSchemaParser = require('./includes/shexParser.js');
var RDF = require('./includes/Erics_RDF.js');


function validate(schema, startingNodes, data, closedShapes) {

    var resolver = RDF.createIRIResolver();

    for (var startingNode in startingNodes) {

        //BEGIN HACKINESS
        startingNode = RDF.IRI(resolver.getAbsoluteIRI(startingNodes[startingNode]), RDF.Position0());
        schema.alwaysInvoke = {};

        var db = RDF.Dataset();

        data.forEach(function(triple) {
            var t = RDF.Triple(
                RDF.BNode(triple.subject, RDF.Position0()),
                RDF.BNode(triple.predicate, RDF.Position0()),
                RDF.BNode(triple.object, RDF.Position0())
            );
            if (this.nextInsertAt == null)
                db.push(t);
            else {
                db.insertAt(this.nextInsertAt, t);
                db.nextInsertAt = null;
            }
        });

        schema.validate(startingNode, schema.startRule, db,
            {
                iriResolver: resolver,
                closedShapes: closedShapes
            }, true);
    }

}

module.exports.validate = validate;
