var RDF = require('../includes/Erics_RDF.js');

function findShapes(schema, schemaResolver, db, closedShapes, findShapesResult) {
    schema.alwaysInvoke = {};

    schema.startingNode = null;

    var shapes = schema.findTypes(
        db,
        db.uniqueSubjects(),
        []
    );

    return cleanShapes(shapes, db, findShapesResult);

}

function cleanShapes(shapes, db, findShapesResult) {

    return shapes.then(function(shapes) {
        var result = {};

        db.uniqueSubjects().forEach(function(subject) {
            result[subject] = null;
        });

        shapes.matches.forEach(function(match) {
            result[match.triple.s.toString()] = match.triple.o.toString();
        });

        findShapesResult(result);
    });


}

module.exports.findShapes = findShapes
