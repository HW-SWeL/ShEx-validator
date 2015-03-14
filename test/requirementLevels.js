var RDF = require("../includes/Erics_RDF.js");
var schemaParser = require("../src/schemaParser.js")
var ShExWrapper = require("./ShExWrapper.js");
var assert = require("assert");
var out = console.log;

var goodSchema = "PREFIX foaf: <http://xmlns.com/foaf/>\
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\
\
<PersonShape> {\
    `should` foaf:name xsd:string,\
    `should not` !foaf:age xsd:integer\
}";

var goodData = "PREFIX foaf: <http://xmlns.com/foaf/>\
    <Somebody>\
foaf:name \"Mr Smith\".\
";

describe("Requirement levels tests", function () {
    it("Should pass validation and include requirement level data", function (done) {
        var validationResult = function (res) {
            assert(res.passed);
            assert.equal(res.matches[0].rule.req_lev, "should");
            done();
        };
        ShExWrapper.validate(goodSchema, goodData, "validationResult", validationResult, {Somebody: "<PersonShape>"});
    });
});