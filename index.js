var Promise = require('promise');

var dataParser = require("./dataParser.js");
var schemaParser = require("./schemaParser.js");
var validator = require("./validator.js");
var shapeFinder = require("./shapeFinder.js");

function Validator(schemaText, dataText, callbacks, options) {
    this.callbacks = callbacks;
    this.options = options;
    this.updateSchema(schemaText);
    this.updateData(dataText);
}

Validator.prototype = {
    updateSchema: function (schemaText) {
        this.schema = schemaParser.parseSchema(schemaText);
        this.schema.done(this.callbacks.schemaParsed, this.callbacks.schemaParseError);
    },
    updateData: function (dataText) {
        this.data = dataParser.parseData(dataText);
        this.data.done(this.callbacks.dataParsed, this.callbacks.dataParseError);
    },
    findShapes: function () {
        var _this = this;
        return Promise.all([this.schema, this.data]).then(function (a) {
            return shapeFinder.findShapes(
                a[0].schema,                       // Schema
                a[0].resolver,
                a[1].db,                       // db
                _this.options.closedShapes,
                _this.callbacks.findShapesResult);
        });
    },
    validate: function(startingNodes) {
        var _this = this;
        return Promise.all([this.schema, this.data]).then(function (a) {
            return validator.validate(
                a[0].schema,                       // Schema
                a[0].resolver,
                startingNodes,      // Starting Node
                a[1].db,                       // db
                a[1].resolver,
                _this.options.closedShapes,
                _this.callbacks.validationResult);
        });
    }
};

module.exports.Validator = Validator;

