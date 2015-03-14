var RDF = require('../includes/Erics_RDF.js');

function formatError(startingResource, fail) {
    var rule;
    //if(fail.rule.valueClass._ === "ValueSet")
    //    rule = RDF.Triple(fail.rule.label, fail.rule.nameClass.term, fail.rule.valueClass.values[0].term);
    //else
    //    rule = RDF.Triple(fail.rule.label, fail.rule.nameClass.term, fail.rule.valueClass.type);
    var thingy = fail.rule.req_lev;
    return {
        name: fail._,
        triple : fail,
        req_lev: fail.rule.req_lev
    };
}

module.exports = formatError;
