var Promise = require('promise');

var dataParser = require("./dataParser.js");
var schemaParser = require("./schemaParser.js");
var validator = require("./validator.js");

function validate(schemaText, dataText, callbacks, options) {

    var schema = schemaParser.parseSchema(schemaText);

    schema.done(callbacks.schemaParsed, callbacks.schemaParseError);

    var data = dataParser.parseData(dataText);

    data.done(callbacks.dataParsed, callbacks.dataParseError);

    Promise.all([schema, data]).done(function (a) {
        validator.validate(
            a[0].schema,                       // Schema
            a[0].resolver,
            options.startingNodes,      // Starting Node
            a[1].db,                       // db
            a[1].resolver,
            options.closedShapes,       // closed shapes
            callbacks.tripleValidated,  // Success callback
            callbacks.validationError  // Error callback
        );
    });
}

module.exports.validate = validate;

if (process) {
    require("./commandLine.js")(process.argv);
}
