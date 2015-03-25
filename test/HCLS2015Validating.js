var ShExWrapper = require("./ShExWrapper.js");
var fileParser = require("./fileParser.js");
var assert = require("assert");

describe("HCLS 2015 Tests", function () {
    var inputs;

    before(function(done) {
        fileParser("hcls_2015").done(function(i) {
            inputs = i;
            done();
        });
    });


    it("should validate chembl as SummaryLevelShape", function (done) {
        var validationResult = function (res) {
            assert(res.passed);
            done();
        };
        ShExWrapper.validate(inputs.schema, inputs.data, "validationResult", validationResult, {"http://rdf.ebi.ac.uk/chembl/chembl": "<SummaryLevelShape>"}, false); // Should be true, needs better schema
    });

    it("should validate chembl17 as VersionLevelShape", function (done) {
        var validationResult = function (res) {
            assert(res.passed);
            done();
        };
        ShExWrapper.validate(inputs.schema, inputs.data, "validationResult", validationResult, {"http://rdf.ebi.ac.uk/chembl/chembl17": "<VersionLevelShape>"});
    });
});

