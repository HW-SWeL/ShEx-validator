var Promise = require('promise');

var exit = require('exit');

var ShEx = require('./index.js');

var parseArgs = require('minimist');
var readFile = Promise.denodeify(require('fs').readFile);

var exitCodes = {
    success: 0,
    dataParseError: 1,
    schemaParseError: 2,
    validationError: 3,
    ioError: 4,
    incorrectArguments: 5
};

var out = console.log;
var error = console.error;

function exitWithUsage() {
    readFile(__dirname + '/README.md').done(function (f) {
        var readme = f.toString();

        var usageStartTag = "<!--- BEGIN USAGE -->";
        var usageStart = readme.indexOf(usageStartTag) + usageStartTag.length;
        var usageEnd = readme.indexOf("<!--- END USAGE -->");
        var usageLen = usageEnd - usageStart;

        var usage = readme.substr(usageStart, usageLen);
        out(usage);

        exit(exitCodes.incorrectArguments);
    });
}

function processCommandLine(argv) {

    var toString = function (t) {
        return t.toString();
    };
    var ioError = function (e) {
        error(e);
        exit(exitCodes.ioError);
    };

    argv = parseArgs(argv.slice(2), {
        boolean: ["closed-shape", "absolute-iri", "find-shapes", "find-and-use-shapes"],
        alias: {
            c: "closed-shape",
            h: "help",
            v: "version",
            a: "absolute-iri",
            f: "find-shapes",
            F: "find-and-use-shapes"
        },
        unknown: function (unknownParam) {
            if (unknownParam.substr(0, 1) == '-') {
                error("Unknown paramater: " + unknownParam);
                exitWithUsage();
            }
        }
    });

    var alen = argv._.length;

    if (
        argv.h ||
        alen < 2 ||
        (alen < 3 && !(argv.f || argv.F)) ||
        (alen > 2 && (argv.f || argv.F))
    ) exitWithUsage();

    var schema = readFile(argv._[0]).then(toString, ioError);
    var data = readFile(argv._[1]).then(toString, ioError);

    var validator;

    var callbacks = {
        schemaParsed: function (schema) {
            out("Schema Parsed: " + schema.shapes.length + " shapes.");
        },
        schemaParseError: function (errorMessage) {
            error(errorMessage);
            //exit(exitCodes.schemaParseError);
        },
        dataParsed: function (data) {
            out("Data Parsed: " + data.resources.length + " resources and " + data.triples.length + " triples.");
        },
        dataParseError: function (errorMessage) {
            error("Data Parse Error:");
            error(errorMessage);
            //exit(exitCodes.dataParseError);
        },
        findShapesResult: function (shapes) {
            if (argv.F)
                validator.validate(shapes).done();
            else {
                for (var resource in shapes) {
                    if (!shapes.hasOwnProperty(resource)) continue;
                    if (shapes[resource])
                        out(resource + " Is a " + shapes[resource]);
                    else
                        error(resource + " Could not be found");
                }
            }

        },
        validationResult: function (validation) {
            if (validation.passed)
                out("Validation Passed: " + validation.matches.length + " matches");
            else {
                error("Validation Failed :");

                validation.errors.forEach(function(e) {
                    error(e.name + " : " + e.triple);
                })

            }
        }
    };

    var options = {
        closedShapes: argv.c
    };

    Promise.all([schema, data]).done(function (a) {
        validator = new ShEx.Validator(a[0], a[1], callbacks, options);
        if (argv.f || argv.F) {
            validator.findShapes().done();
        }
        else {
            var startingResources = {};
            argv._.slice(2).forEach(function (str) {
                var parts = str.split("=");
                if (parts.length !== 2) exitWithUsage();
                startingResources[parts[0]] = "<" + parts[1] + ">";
            });
            validator.validate(startingResources).done();
        }

    });
}

if (process) {
    processCommandLine(process.argv);
}
