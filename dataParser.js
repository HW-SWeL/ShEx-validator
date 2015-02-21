var Promise = require('promise');
var n3 = require('n3');

exports.parseData = function parseData(dataText) {
    var parser = n3.Parser();

    var triples = [];
    return new Promise(function(resolve, reject) {
        parser.parse(dataText, function(error, triple, prefixes) {
            if(error) reject(error);
            else if(triple) triples.push(triple);
            else resolve(triples);
        });
    });

};
