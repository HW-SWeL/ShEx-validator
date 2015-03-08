var RDF = require('./includes/Erics_RDF.js');

function findShapes(schema, schemaResolver, db, closedShapes, findShapesResult) {
    schema.alwaysInvoke = {};

    schema.startingNode = null;

    var shapes = schema.findTypes(
        db,
        {
            iriResolver: schemaResolver,
            closedShapes: closedShapes
        }
    );

    findShapesResult(cleanShapes(shapes, db));

}

function cleanShapes(shapes, db) {

    var result = {};

    db.uniqueSubjects().forEach(function(subject) {
        result[subject] = null;
    });

    shapes.matches.forEach(function(match) {
        result[match.triple.s.lex] = match.triple.o.toString();
    });

    return result;
}

module.exports.findShapes = findShapes
