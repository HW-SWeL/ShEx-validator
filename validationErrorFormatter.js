var RDF = require('./includes/Erics_RDF.js');

function formatError(fail) {
    var rule = RDF.Triple(fail.rule.label, fail.rule.nameClass.term, fail.rule.valueClass.type);
    return {
        name: fail._,
        triple : rule
    }
}

module.exports = formatError;
