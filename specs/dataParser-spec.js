var RDF = require("../includes/Erics_RDF.js");
var dataParser = require("../dataParser.js");

describe("parseNode", function () { 
    it("Should return a RDF.RDFLiteral", function () {
        var literal = dataParser.parseNode("\"random\"");
        expect(literal._).toEqual("RDFLiteral");
    });
});

describe("parseNode", function () { 
    it("Should throw an error", function () {
        //var literal = dataParser.parseNode("\"random");
        function tester() {
            dataParser.parseNode("\"random");
        }
        expect(tester).toThrow();
    });
});