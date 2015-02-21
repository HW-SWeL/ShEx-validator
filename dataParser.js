var Promise = require('promise');

var RDF = require('./includes/Erics_RDF.js');

exports.parseData = function parseData(dataText) {
    return parseWithN3(dataText);
};

function parseNode(text) {
    if(text.indexOf("^^") > -1) return RDF.RDFLiteral(text, undefined, "<http://www.w3.org/2001/XMLSchema#dateTime>");
    else if(text.substr(0, 1) == "\"") return RDF.RDFLiteral(text);
    else return RDF.IRI(text);
}


function parseWithN3(dataText) {
    var n3 = require('n3');
    var parser = n3.Parser();

    return new Promise(function (resolve, reject) {
        var db = RDF.Dataset();

        parser.parse(dataText, function (error, triple, prefixes) {
            if (error) reject(error);
            else if (triple) {
                triple = RDF.Triple(
                    parseNode(triple.subject),
                    parseNode(triple.predicate),
                    parseNode(triple.object)
                );

                db.push(triple);

            }
            else resolve(db);
        });
    });
}
