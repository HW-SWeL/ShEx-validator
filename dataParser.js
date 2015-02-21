var Promise = require('promise');

var RDF = require('./includes/Erics_RDF.js');

exports.parseData = function parseData(dataText) {
    return parseWithN3(dataText);
};


function parseWithN3(dataText) {
    var n3 = require('n3');
    var parser = n3.Parser();

    return new Promise(function (resolve, reject) {
        var db = RDF.Dataset();

        parser.parse(dataText, function (error, triple, prefixes) {
            if (error) reject(error);
            else if (triple) {
                triple = RDF.Triple(
                    RDF.BNode(triple.subject, RDF.Position0()),
                    RDF.BNode(triple.predicate, RDF.Position0()),
                    RDF.BNode(triple.object, RDF.Position0())
                );

                db.push(triple);

            }
            else resolve(db);
        });
    });
}
