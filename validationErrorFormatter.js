var RDF = require('./includes/Erics_RDF.js');

function formatError(startingShape,fail) {
    var rule;
    if(fail.rule.valueClass._ === "ValueSet")
        rule = RDF.Triple(fail.rule.label, fail.rule.nameClass.term, fail.rule.valueClass.values[0].term);
    else
        rule = RDF.Triple(fail.rule.label, fail.rule.nameClass.term, fail.rule.valueClass.type);

    return {
        name: fail._,
        triple : rule
    }
}

module.exports = formatError;
