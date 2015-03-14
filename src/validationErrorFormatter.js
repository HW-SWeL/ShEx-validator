var RDF = require('../includes/Erics_RDF.js');

function formatError(startingResource, fail) {
    
    return {
        name: fail._,
        triple : fail,
        startingResource: startingResource,
        req_lev: fail.rule.req_lev,
        toString: function() {
            if (fail._ === "RuleFailMin") {
                if (fail.min == fail.max) {
                    return "Needs "+ fail.min + fail.rule.nameClass.term._pos._orig;
                }
                else if (fail.max == undefined){
                    return "Needs at least "+ fail.min + " " + fail.rule.nameClass.term._pos._orig
                    + " with type " + fail.rule.valueClass._pos._orig;
                }
                else if (fail.min != undefined && fail.max != undefined) {
                    return "Needs between "+ fail.min + " and " + fail.max + " "
                    + fail.rule.nameClass.term._pos._orig + " with type "
                    + fail.rule.valueClass._pos._orig;
                }
                else{
                    return "RuleFailMin - if you get this message contact someone"
                }
            }
            else if (fail._ === "RuleFailMax") {
                return "RuleFailMax - if you get this message contact someone"
            }
            else if (fail._ === "RuleFailMixedOpt") {
                return "RuleFailMixedOpt - if you get this message contact someone"
            }
            else if (fail._ === "RuleFailOr") {
                return "RuleFailOr - if you get this message contact someone"
            }
            else if (fail._ === "RuleFailTree") {
                return "RuleFailTree - if you get this message contact someone"
            }
            else if (fail._ === "RuleFailValue") {
                return "RuleFailValue - if you get this message contact someone"
            }
        }
    };
}

module.exports = formatError;
