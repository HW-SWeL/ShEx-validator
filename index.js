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

/*
 callbacks = {
 schemaParseError : function (err)
 }
 */
function validate(schemaText, dataText, callbacks, options) {

    var schema = schemaParser.parseSchema(schemaText);

    var data = dataParser.parseData(dataText);

    Promise.all([schema, data]).done(function (a) {
        validator.validate(a[0], ["<Issue1>"], a[1], false, callbacks.validationCallback);
    });
}

module.exports.validate = validate;

if (process.argv.length == 4) {
    var schema = readFile(process.argv[2])
        .then(function (text) {
            return text.toString();
        });
    var data = readFile(process.argv[3])
        .then(function (text) {
            return text.toString();
        });

    Promise.all([schema, data]).done(function (a) {
        validate(a[0], a[1], {
            validationCallback: function (e) {
                if(e.passed()) {
                    console.log("passed");
                }
                else {
                    console.log(e.toString());
                }
            }
        });
    });

}
