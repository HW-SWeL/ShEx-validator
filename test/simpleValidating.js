var ShExWrapper = require("./ShExWrapper.js");
var assert = require("assert");

var goodSchema = "PREFIX foaf: <http://xmlns.com/foaf/>\
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\
\
    start = <PersonShape>\
<PersonShape> {\
    foaf:name xsd:string\
}";

var badSchema = "PREFIX foaf: <http://xmlns.com/foaf/>\
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\
\
    start = <PersonShape>\
    \
<PersonShape> {\
    foaf:ERROR xsd:string\
}";

var goodData = "PREFIX foaf: <http://xmlns.com/foaf/>\
    <Somebody>\
foaf:name \"Mr Smith\".\
";

var badData = "PREFIX foaf: <http://xmlns.com/foaf/>\
    <Somebody>\
foaf:ERROR \"Mr Smith\".\
";



describe("Simple Validation Tests", function () {
    it("Should pass validation", function (done) {
        var validationResult = function (res) {
            assert(res.passed);
            done();
        };
        ShExWrapper.validate(goodSchema, goodData, "validationResult", validationResult, {Somebody: "<PersonShape>"});
    });

    it("bad data should not pass validation", function (done) {
        var validationResult = function (res) {
            assert(!res.passed);
            assert(res.errors.length === 1);
            done();
        };
        ShExWrapper.validate(goodSchema, badData, "validationResult", validationResult, {Somebody: "<PersonShape>"});
    });

    it("bad schema should not pass validation", function (done) {
        var validationResult = function (res) {
            assert(!res.passed);
            assert(res.errors.length === 1);
            done();
        };
        ShExWrapper.validate(badSchema, goodData, "validationResult", validationResult, {Somebody: "<PersonShape>"});
    });
});


