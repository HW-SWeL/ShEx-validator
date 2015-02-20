var n3 = require('n3');

exports.parseData = function parseData(dataText, options) {
    var parser = n3.Parser();

    var triples = [];

    parser.parse(dataText, function(error, triple, prefixes) {
        if(error) options.error(error);
        else if(triple) triples.push(triple);
        else options.complete(triples);
    });
};
