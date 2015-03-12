var ShEx = require("../index.js");

function validate(schema, data, callbackName, callback, startingNodes) {
    run(schema, data, callbackName, callback, startingNodes, "validate");
}

function findShapes(schema, data, callbackName, callback) {
    run(schema, data, callbackName, callback, null, "findShapes");
}

function run(schema, data, callbackName, callback, startingNodes, mode) {
    var callbacks = {
        schemaParsed: function (schema) {

        },
        schemaParseError: function (errorMessage) {
        },
        dataParsed: function (data) {
        },
        dataParseError: function (errorMessage) {
        },
        validationResult: function (validation) {
        },
        findShapesResult: function (typesResult) {
        }
    };

    callbacks[callbackName] = callback;

    var options = {
        startingNodes: startingNodes
    };

    var validator = new ShEx.Validator(schema, data, callbacks, options);

    if(mode === "validate") validator.validate(startingNodes).done();
    else if(mode === "findShapes") validator.findShapes().done();


}

module.exports.validate = validate;
module.exports.findShapes = findShapes;
