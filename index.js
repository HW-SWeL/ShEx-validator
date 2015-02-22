var Promise = require('promise');

var dataParser = require("./dataParser.js");
var schemaParser = require("./schemaParser.js");
var validator = require("./validator.js");

function validate(schemaText, dataText, callbacks, options) {

    var resolver = RDF.createIRIResolver();

    var schema = schemaParser.parseSchema(schemaText, resolver);

    schema.then(callbacks.schemaParsed, callbacks.schemaParseError);

    var data = dataParser.parseData(dataText, resolver);

    data.then(callbacks.dataParsed, callbacks.dataParseError);

    Promise.all([schema, data]).then(function (a) {
        validator.validate(
            a[0],                       // Schema
            options.startingNodes,      // Starting Node
            a[1],                       // data
            options.closedShapes,       // closed shapes
            callbacks.tripleValidated,  // Success callback
            callbacks.validationError,  // Error callback
            resolver                    // iriResolver
        );
    });
}

module.exports.validate = validate;

if (process) {
    require("./commandLine.js")(process.argv);
}
