var ShExWrapper = require("./ShExWrapper.js");
var assert = require("assert");

var schema = "\
PREFIX foaf: <http://xmlns.com/foaf/>\
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
\
<PersonShape> {\
    foaf:name rdf:langString,\
    !foaf:anotherName rdf:langString\
}\
";


var dataWithNegated = '\
PREFIX foaf: <http://xmlns.com/foaf/> \
<Somebody>\
    foaf:name "Mr Smith"@en;\
    foaf:anotherName "Mr Smith"@en .\
';

var dataWithoutNegated = '\
PREFIX foaf: <http://xmlns.com/foaf/> \
<Somebody>\
    foaf:name "Mr Smith"@en.\
';


describe("Negation", function () {
    it("Should fail when negated property is included", function (done) {
        var validationResult = function (res) {
            assert(!res.passed);
            done();
        };
        ShExWrapper.validate(schema, dataWithNegated, "validationResult", validationResult, {Somebody: "<PersonShape>"});
    });

    it("Should pass when negated property is not included", function (done) {
        var validationResult = function (res) {
            assert(res.passed);
            done();
        };
        ShExWrapper.validate(schema, dataWithoutNegated, "validationResult", validationResult, {Somebody: "<PersonShape>"});
    });
});


