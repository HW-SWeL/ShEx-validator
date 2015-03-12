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



describe("Simple Shape Finding", function () {
    it("Should match Somebody with PersonShape", function (done) {
        var findShapesResult = function (res) {
            assert("<Somebody>" in res);
            assert.equal(res["<Somebody>"], "<PersonShape>");
            done();
        };
        ShExWrapper.findShapes(goodSchema, goodData, "findShapesResult", findShapesResult);
    });

    it("Bad schema should fail to match Somebody", function (done) {
        var findShapesResult = function (res) {
            assert("<Somebody>" in res);
            assert.equal(res["<Somebody>"], null);
            done();
        };
        ShExWrapper.findShapes(badSchema, goodData, "findShapesResult", findShapesResult);
    });

    it("bad data should fail to match Somebody with PersonShape", function (done) {
        var findShapesResult = function (res) {
            assert("<Somebody>" in res);
            assert.equal(res["<Somebody>"], null);
            done();
        };
        ShExWrapper.findShapes(goodSchema, badData, "findShapesResult", findShapesResult);
    });


});


