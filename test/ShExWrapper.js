var ShEx = require("../src/index.js");

function validate(schema, data, callbackName, callback, startingNodes, closedShapes) {
    run(schema, data, callbackName, callback, startingNodes, "validate", closedShapes);
}

function findShapes(schema, data, callbackName, callback, closedShapes) {
    run(schema, data, callbackName, callback, null, "findShapes", closedShapes);
}

function run(schema, data, callbackName, callback, startingNodes, mode, closedShapes) {
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
        startingNodes: startingNodes,
        closedShapes: closedShapes !== undefined?closedShapes:true
    };

    var validator = new ShEx.Validator(schema, data, callbacks, options);

    if(mode === "validate") validator.validate(startingNodes).done();
    else if(mode === "findShapes") validator.findShapes().done();


}

module.exports.validate = validate;
module.exports.findShapes = findShapes;
