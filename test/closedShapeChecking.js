var ShExWrapper = require("./ShExWrapper.js");
var assert = require("assert");

var schema = "PREFIX foaf: <http://xmlns.com/foaf/>\
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\
\
<PersonShape> {\
    foaf:name xsd:string?\
}";

var data = "PREFIX foaf: <http://xmlns.com/foaf/>\
    <Somebody>\
foaf:NOTANAM \"Mr Smith\".\
";




describe("CloseShape Checking", function () {
    it("Error on unrecognised shape", function (done) {
        var validationResult = function (res) {
            assert(!res.passed);
            assert(res.errors.length === 1);
            done();
        };
        ShExWrapper.validate(schema, data, "validationResult", validationResult, {Somebody: "<PersonShape>"}, true);
    });

    it("allow unrecognised shape", function (done) {
        var validationResult = function (res) {
            assert(res.passed);
            done();
        };
        ShExWrapper.validate(schema, data, "validationResult", validationResult, {Somebody: "<PersonShape>"}, false);
    });
});


