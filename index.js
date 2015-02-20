var fs = require('fs');

var dataParser = require("./dataParser.js");
var validator = require("./validator.js");

function parseData(err, text) {
    if (err) {
        throw err;
    }
    dataParser.parseData(text.toString(), {
        complete: function(parsed) { console.log("Data parsed") },
        error: function (error) {
            console.log(error)
        }
    });
}

function parseSchema(err, text) {
    if (err) {
        throw err;
    }
    console.log(validator.parseSchema(text.toString()));
}


if (process.argv.length == 4) {
    fs.readFile(__dirname + process.argv[2], parseSchema);
    fs.readFile(__dirname + process.argv[3], parseData);
}
