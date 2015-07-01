var RDF = require('../includes/Erics_RDF.js');

function formatError(fail) {
    
    return {
        name: fail._,
        triple : fail,
        req_lev: fail.rule.req_lev,
        description: errorToString(fail),
        line: getLine(fail)
    };
}

function errorToString(fail) {
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
        if (fail.failures && fail.rule.disjoints) {
            //if the number of values is the same as the number of disjoints
            //then we can (maybe) guess that all the options are missing
            if (fail.failures.length === fail.rule.disjoints.length) {
                var retString = "Needs at least one of : ";
                fail.failures.forEach(function(f){
                    //making some strong assumptions here
                    retString += "\t Property " + f.errors[0].rule._pos._orig;
                });
                return retString;
            }
            //when there are less failures than disjoints, that means that
            //there are failures-disjoints violations of the or rule (maybe)
            else if (fail.failures.length < fail.rule.disjoints.length) {
                var retString = "Can have either:\n ";
                fail.rule.disjoints.forEach(function(d){
                    //dont show all possible values, only ones which are present
                    //in the data
                    if (!disjointInFailures(d,this.fail.failures)){
                        retString += "\t Property " + d.nameClass.term._pos._orig
                        + " with type " + d.valueClass._pos._orig +" or \n";
                    }
                }.bind({fail: fail}));
                // remove last occurence of or
                var n = retString.lastIndexOf('or');
                return retString.substring(0,n);
                
            }
            
        }

        else {
            return "RuleFailOr - if you get this message contact someone";
        }
    }
    else if (fail._ === "RuleFailTree") {
        return "RuleFailTree - if you get this message contact someone";
    }
    else if (fail._ === "RuleFailValue") {
        return "RuleFailValue - if you get this message contact someone";
    }
    else if (fail._ === "RuleFailExtra") {
        //this is wrong
        var retString = "";
        fail.triples.forEach(function(t){
           retString += t.p.lex + " is not a valid property \n";
        });
        return retString;
        //return fail.triples[0].p.lex.split('/').slice(-2).join(":") + " is not a valid property";
    }
    else if (fail._ === "RuleFail") {
        // Maybe replace this with the non expanded types - it's unclear
        // which would be better
        return "Property " + fail.rule.nameClass.term._pos._orig
        + " has a value with type: " + fail.triple.o.datatype 
        + " instead of the expected type: " + fail.rule.valueClass.toString();
    }
}

function disjointInFailures(disjoint,failures){
    var contains = false;
    failures.forEach(function(f){
        f.errors.forEach(function(e){
            console.log("Disjoint property failing: " + e.rule.nameClass.term._pos._orig + " at requirement level " + e.rule.req_lev);
            if (disjoint.nameClass.term._pos._orig ===
                e.rule.nameClass.term._pos._orig)
                contains = true;
        });
    });
    return contains;
}

function getLine(fail) {
    if(fail.triples && fail.triples[0]) {
        return fail.triples[0].line
    }

    if(fail.triple) {
        return fail.triple.line
    }
}


module.exports = formatError;
