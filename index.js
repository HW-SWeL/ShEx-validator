var Promise = require('promise');

var parseArgs = require('minimist');
var readFile = Promise.denodeify(require('fs').readFile);

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

var exitCodes = {
    success: 0,
    dataParseError: 1,
    schemaParseError: 2,
    validationError: 3,
    ioError: 4,
    incorrectArguments: 5
};

if (process) {

    argv = parseArgs(process.argv.slice(2), {
        defaults: {
            closedShape : false
        },
        alias: {
            h: "help",
            v: "version"
        }
    });

    var out = console.log;
    var error = console.error;

    var toString  = function(t) { return t.toString(); };
    var ioError = function(e) { error(e); process.exit(exitCodes.ioError); };

    if(argv.help || argv._.length < 4) {
        readFile(__dirname+'/README.md').done(function(f) {
            var readme = f.toString();

            var usageStartTag = "<!--- BEGIN USAGE -->";
            var usageStart = readme.indexOf(usageStartTag) + usageStartTag.length;
            var usageEnd = readme.indexOf("<!--- END USAGE -->");
            var usageLen = usageEnd - usageStart - usageStartTag.length;

            var usage = readme.substr(usageStart, usageLen);
            out(usage);
            process.exit(exitCodes.incorrectArguments);
        });
    }

    var schema = readFile(argv._[0]).then(toString, ioError);
    var data = readFile(argv._[1]).then(toString, ioError);

    var callbacks = {
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
    };

    var options = {
        closedShapes: argv.closeShape,
        startingNodes: [argv._.slice(2)]
    };

    Promise.all([schema, data]).done(function (a) {
        validate(a[0], a[1], callbacks, options);
    });
}
