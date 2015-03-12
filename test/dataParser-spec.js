var RDF = require("../includes/Erics_RDF.js");
var dataParser = require("../dataParser.js");
var assert = require("assert");

describe("parseNode", function () { 
    it("Should return a RDF.RDFLiteral", function () {
        var literal = dataParser.parseNode("\"random\"");
        assert.equal(literal._, "RDFLiteral");
    });
});

describe("parseNode", function () { 
    it("Should throw an error", function () {
        function tester() {
            dataParser.parseNode("\"random");
        }
        assert.throws(tester);
    });
});

describe("parseNode", function () { 
    it("Should return a RDF.IRI", function () {
        var iri = dataParser.parseNode("IRI");
        assert.equal(iri._, "IRI");
    });
});

describe("parseNode", function () { 
    it("Should throw an error", function () {
        function tester() {
            dataParser.parseNode("");
        }
        assert.throws(tester);
    });
});
