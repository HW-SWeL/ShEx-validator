var ShExWrapper = require("./ShExWrapper.js");
var assert = require("assert");

var schemaNameStem = "\
PREFIX foaf: <http://xmlns.com/foaf/>\
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
\
<PersonShape> {\
    foaf:~ rdf:langString\
}\
";

var schemaValueStem = "\
PREFIX foaf: <http://xmlns.com/foaf/>\
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
\
<PersonShape> {\
    foaf:name rdf:~\
}\
";

var data = '\
PREFIX foaf: <http://xmlns.com/foaf/> \
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
<Somebody>\
    foaf:name "Mr Smith"^^rdf:langString.\
';


describe("Shex stem functionality", function () {
    it("Should allow name stem", function (done) {
        var validationResult = function (res) {
            assert(res.passed);
            done();
        };
        ShExWrapper.validate(schemaNameStem, data, "validationResult", validationResult, {Somebody: "<PersonShape>"});
    });

    it("Should allow value stem", function (done) {
        var validationResult = function (res) {
            assert(res.passed);
            done();
        };
        ShExWrapper.validate(schemaValueStem, data, "validationResult", validationResult, {Somebody: "<PersonShape>"});
    });
});


