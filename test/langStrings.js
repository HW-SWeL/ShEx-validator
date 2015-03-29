var ShExWrapper = require("./ShExWrapper.js");
var assert = require("assert");

var schema = "\
PREFIX foaf: <http://xmlns.com/foaf/>\
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
\
<PersonShape> {\
    foaf:name rdf:langString\
}\
";

var goodData = '\
PREFIX foaf: <http://xmlns.com/foaf/> \
<Somebody>\
    foaf:name "Mr Smith"@en,"Mr Smith Jnr the third"@en-us .\
';

var badData = '\
PREFIX foaf: <http://xmlns.com/foaf/> \
<Somebody>\
    foaf:name "Mr Smith"@en,"Mr Smith Jnr the third"@en .\
';


describe("Test langString functionality", function () {
    it("Should allow multiple languages", function (done) {
        var validationResult = function (res) {
            assert(res.passed);
            done();
        };
        ShExWrapper.validate(schema, goodData, "validationResult", validationResult, {Somebody: "<PersonShape>"});
    });

    it("Should not allow two strings of same lang", function (done) {
        var validationResult = function (res) {
            assert(!res.passed);
            done();
        };
        ShExWrapper.validate(schema, badData, "validationResult", validationResult, {Somebody: "<PersonShape>"});
    });
});


