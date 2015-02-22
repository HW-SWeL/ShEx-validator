var Promise = require('promise');

var readFile = Promise.denodeify(require('fs').readFile);

var dataParser = require("./dataParser.js");
var schemaParser = require("./schemaParser.js");
var validator = require("./validator.js");

var exitCodes = {
    success: 0,
    dataParseError: 1,
    schemaParseError: 2,
    validationError: 3,
    ioError: 4
};

function validate(schemaText, dataText, callbacks, options) {

    var resolver = RDF.createIRIResolver();

    var schema = schemaParser.parseSchema(schemaText, resolver);

    schema.then(callbacks.schemaParsed, callbacks.schemaParseError);

    var data = dataParser.parseData(dataText, resolver);

    data.then(callbacks.dataParsed, callbacks.dataParseError);

    Promise.all([schema, data]).then(function (a) {
        validator.validate(
            a[0],                       // Schema
            ["Issue1"],                 // Starting Node
            a[1],                       // data
            false,                      //
            callbacks.tripleValidated,  // Success callback
            callbacks.validationError,  // Error callback
            resolver                    // iriResolver
        );
    });
}

module.exports.validate = validate;

if (process.argv.length == 4) {

    var out = console.log;
    var error = console.error;

    function toString(t) { return t.toString(); };
    function ioError(e) { error(e); process.exit(exitCodes.ioError); };

    var schema = readFile(process.argv[2]).then(toString, ioError);
    var data = readFile(process.argv[3]).then(toString, ioError);

    Promise.all([schema, data]).done(function (a) {
        validate(a[0], a[1], {
            schemaParsed: function (schema) {
                out("Schema Parsed: " + schema.ruleLabels.length + " rules.");
            },
            schemaParseError: function (errorMessage) {
                error(errorMessage);
                process.exit(exitCodes.schemaParseError);
            },
            dataParsed: function (data) {
                out("Data Parsed: " + data.triples.length + " triples.");
            },
            dataParseError: function (errorMessage) {
                error(errorMessage);
                process.exit(exitCodes.dataParseError);
            },
            tripleValidated: function (validation) {
                out("Validation Passed");
            },
            validationError: function (e) {
                error(e.toString());
                process.exit(exitCodes.validationError);
            }
        });
    });

}
