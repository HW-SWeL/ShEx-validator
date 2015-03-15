var RDF = require('../includes/Erics_RDF.js');

function formatError(fail) {
    
    return {
        name: fail._,
        triple : fail,
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
                if (fail.min != undefined && fail.max != undefined) {
                    return "Needs between "+ fail.min + " and " + fail.max + " "
                    + fail.rule.nameClass.term._pos._orig + " with type "
                    + fail.rule.valueClass._pos._orig;
                }
                else if (fail.max != undefined) {
                    return "Cannot have more than " + fail.max + " " + fail.rule.nameClass.term._pos._orig
                    + " of type " + fail.rule.valueClass._pos._orig;
                }
                else{
                    return "RuleFailMax - if you get this message contact someone";
                }
            }
            else if (fail._ === "RuleFailMixedOpt") {
                return "RuleFailMixedOpt - if you get this message contact someone";
            }
            else if (fail._ === "RuleFailOr") {
                return "RuleFailOr - if you get this message contact someone";
            }
            else if (fail._ === "RuleFailTree") {
                return "RuleFailTree - if you get this message contact someone";
            }
            else if (fail._ === "RuleFailValue") {
                return "RuleFailValue - if you get this message contact someone";
            }
            else if (fail._ === "RuleFail") {
                // Maybe replace this with the non expanded types - it's unclear
                // which would be better
                return "Property " + fail.rule.nameClass.term._pos._orig
                + " has a value with type: " + fail.triple.o.datatype 
                + " instead of the expected type: " + fail.rule.valueClass.toString();
            }
        }
    };
}

module.exports = formatError;
