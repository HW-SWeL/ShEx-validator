var ShExWrapper = require("./ShExWrapper.js");
var assert = require("assert");

var schema = "PREFIX foaf: <http://xmlns.com/foaf/>\
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\
\
<PersonShape> {\
    foaf:name xsd:string\
}";

var line4Extra = "PREFIX foaf: <http://xmlns.com/foaf/>\n\
    <Somebody>\n\
        foaf:name \"Mr Smith\";\n\
        foaf:OTHERPROP \"Mr Smith\".\
";

var line5Extra = "PREFIX foaf: <http://xmlns.com/foaf/>\n\
    <Somebody>\n\
        foaf:name \"Mr Smith\";\n\
        \n\
        foaf:OTHERPROP \"str\".\
";



describe("Line numbers", function () {

    it("should report error on line 3", function (done) {
        var validationResult = function (res) {
            assert.equal(res.errors[0].line, 4);
            done();
        };
        ShExWrapper.validate(schema, line4Extra, "validationResult", validationResult, {Somebody: "<PersonShape>"});
    });

    it("should report error on line 4", function (done) {
        var validationResult = function (res) {
            assert.equal(res.errors[0].line, 5);
            done();
        };
        ShExWrapper.validate(schema, line5Extra, "validationResult", validationResult, {Somebody: "<PersonShape>"});
    });
});


