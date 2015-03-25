var ShExWrapper = require("./ShExWrapper.js");
var assert = require("assert");

var goodSchema = "PREFIX foaf: <http://xmlns.com/foaf/>\
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\
\
<PersonShape> {\
    foaf:name xsd:string\
}";

var goodData = "PREFIX foaf: <http://xmlns.com/foaf/>\
    <Somebody>\
foaf:name \"Mr Smith\".\
\
<AnotherSomebody>\
foaf:name \"Mr Smith\".\
";





describe("Multiple resource validation", function () {
    var passes = 0;

    it("Should pass multiple resources", function (done) {
        var validationResult = function (res) {
            passes ++;
            if(passes === 2) {
                assert(true);
                done();
            }
        };
        ShExWrapper.validate(goodSchema, goodData, "validationResult", validationResult, {Somebody: "<PersonShape>", AnotherSomebody: "<PersonShape>"});
    });
});


