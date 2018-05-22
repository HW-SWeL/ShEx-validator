var Promise = require('promise');
var shexjs = require("shex");
var n3 = require("n3");

var DefaultBase = "";

function Validator(schemaText, dataText, callbacks, options) {
    this.callbacks = callbacks;
    this.options = options;
    
    this.updateSchema(location.origin + '/schema.shex', schemaText);
    this.updateData(dataText);
}

Validator.prototype = {
    updateSchema: function (base, schemaText) {
        this.schema = parseSchema(base ,schemaText);
        this.schema.done(this.callbacks.schemaParsed, this.callbacks.schemaParseError);
    },
    updateData: function (dataText) {
        this.data = parseData(dataText);
        this.data.done(this.callbacks.dataParsed, this.callbacks.dataParseError);
    },
    findShapes: function () {
        var _this = this;
        return Promise.all([this.schema, this.data]).then(function (a) {
            // console.log('showing shapes');
            // console.log(this.schema);
            // console.log(this.data);
        });
    },
    validate: function(startingNodes) {
        var _this = this;
        return Promise.all([this.schema, this.data, this.options]).then(function (a) {
            // console.log(a);
            var node = Object.keys(a[2].resourceShapeMap)[0];
            var result = shexjs.Validator.construct(a[0].schema).validate(a[1].db, node, a[2].resourceShapeMap[node]);
            // console.log('callbacks in validator',_this.callbacks);
            // console.log('db to validate',a[1].db)
            return cleanResult(result, a[1].triples, _this.callbacks.validationResult)
        });
    }
};

module.exports.Validator = Validator;

function parseData(dataText){
    return new Promise(function (resolve, reject) {
        var lineIndex = new Object();
        var db = n3.Store();
        n3.Parser({documentIRI: DefaultBase}).parse(dataText, function (error, triple, prefixes) {
            // console.log('db', db);
            // console.log('DB');
            // console.log('triple callback')
            if (error) {
                // throw Error("error parsing " + data + ": " + error);
                reject(parseN3Error(error));
            } else if (triple) {
                // console.log("N3triple",triple);
                lineIndex[JSON.stringify({'subject':triple.subject,'predicate':triple.predicate,'object':triple.object,'graph':triple.graph})] = triple.line;
                // lineIndex[triple.line] = {'object':triple.object,'subject':triple.subject,'predicate':triple.predicate,'graph':triple.graph};
                db.addTriple(triple);

            } else {
                var triples = db.getTriples();
                for (var i = triples.length - 1; i >= 0; i--) {
                    var triple_key = JSON.stringify({'subject':triples[i].subject,'predicate':triples[i].predicate,'object':triples[i].object,'graph':""});
                    triples[i].line = lineIndex[triple_key];
                }
                resolve({db: db, triples:triples});
            }
        });
        
    });
}



function parseSchema(base, schemaText) {
    return new Promise(function (resolve, reject) {
        var schema;

        var preprocessed = parseReqLevels(schemaText);

        try {
            schema = shexjs.Parser.construct(base).parse(preprocessed.data);
        }
        catch (e) {
            reject(e);
        }
        resolve({schema: schema, shapes: schema.shapes, levels:preprocessed.lineRules});

    });
};

function cleanResult(result, parsedTriples, callback){
    console.log('validation result', result);
    var errors = [];
    var matches = [];
    if (result.type == 'Failure'){
        errors = cleanErrors(parsedTriples, result);
    } else {
        matches = cleanMatches(parsedTriples, result);
        // console.log('result',result);
        // console.log('matches',matches);
    }
    var clean_result = {
            errors: errors,
            matches: matches,
            startingResource: result.node,
            passed: errors.length === 0,
            full_result:result
        };
    return callback(clean_result);
}

function parseN3Error(error) {
    var line = error.message.match(/line [0-9]*/g);

    line = (line && line.length > 0 && line[0].length > 5)?Number(line[0].substr(5)):null;

    return {
        message: error.message,
        line: line,
        column: 0
    }
}
// returns the matched triples and the corresponding lines

function cleanMatches(parsedTriples, validationResult){
    var results = [];
    var messages = [];
    var matches = parseMatches(validationResult.solution);
    for (var i = matches.length - 1; i >= 0; i--) {
        var currentMatch = {};
        currentMatch.line = matchTriple(parsedTriples, matches[i]).line;
        currentMatch.subject = matches[i].subject;
        currentMatch.predicate = matches[i].predicate;

        if (matches[i].object.value && matches[i].object.type) {
                currentMatch.object = '<type>:' +String(matches[i].object.type) +' <value>:'+ String(matches[i].object.value);


        } else {
            currentMatch.object = matches[i].object;
        }
            currentMatch.message = 'Matched '+ String(currentMatch.predicate)+' '+ String(currentMatch.object) + ' on line ' + String(currentMatch.line);

        // console.log('cleanMatches',matches[i]);

        if (!messages.includes(currentMatch.message)){
            results.push(currentMatch);
            messages.push(currentMatch.message);
        }

    }
    // console.log('results returned',results);
    return results
}

function parseMatches(solution){
    var results = [];
    var values = Object.values(solution)
    // console.log('object values',values);
    for (var i = values.length - 1; i >= 0; i--) {
        if (values[i].subject && values[i].predicate && values[i].object){
            // console.log('istriple',values[i]);            
            results.push(values[i]);
        }
        else if (typeof(values[i]) == 'string'){
            // console.log('string found',values[i])
        } else {
            Array.prototype.push.apply(results,parseMatches(values[i]));
        }
    }

    return results
}

function parseErrors(errors){
    var results = [];
    for (var i = errors.length - 1; i >= 0; i--) {
        if (Array.isArray(errors[i])){
            // console.log('rec call',errors[i]);
            Array.prototype.push.apply(results,parseErrors(errors[i]));

        } else {
            // console.log('non rec call',errors[i]);
            results.push(errors[i])
        }
    }
    console.log('results',results);
    return results
}

function matchTriple(parsedTriples, keyTriple){
    var match;

    try {
        match = parsedTriples.find(function (triple) {
            var lookup = []
            if (typeof(keyTriple.subject) == 'string' ){
                if (triple.subject === keyTriple.subject){
                    lookup.push(true)
                } else{
                    return false
                }
            } else {
                lookup.push(true);
            }
            // console.log('subject',keyTriple.subject);

            if (typeof(keyTriple.predicate) == 'string'){
                if (triple.predicate === keyTriple.predicate){
                    lookup.push(true);
                } else {
                    return false
                }
            }else {
                lookup.push(true);
            }
            
            // console.log('predicate',keyTriple.predicate);
            
            if (typeof(keyTriple.object) == 'string'){
                if (triple.object === keyTriple.object){
                    lookup.push(true);
                } else {
                    return false
                }
            }else {
                lookup.push(true);
            }
            // console.log('object',keyTriple.object);

            return lookup[0] == lookup[1] == lookup[2]
        });
    } catch (error) {
        console.error(error);
    }
    // console.log('keyTriple',keyTriple,'matchedTriple',match);

    return match
}

function cleanErrors(parsedTriples, validationResult){
    var results = [];
    var messages = [];
    var errors = parseErrors(validationResult.errors);
    // console.log('errors',validationResult.errors);
    //sometimes errors are in arrays of length one for some reason :/

    // console.log('errors',errors);
    // console.log('validationResult',validationResult);
    for (var i = errors.length - 1; i >= 0; i--) {
        if (errors[i].type == 'TypeMismatch'){
            if (errors[i].triple) {

                var match = matchTriple(parsedTriples,errors[i].triple);
                // console.log('match',match);
                errors[i].line = match.line;

                errors[i].message = 'Type mismatch on line ' + String(errors[i].line) + ' in ' + String(validationResult.node);


            } else {
                errors[i].message = ' Missing property ' + String(errors[i].property) + ' in ' + String(validationResult.node);
            }
        }

        else if (errors[i].type == 'MissingProperty') {
            try {
                errors[i].message = ' Missing property ' + String(errors[i].property) ;

            }catch (error){
                console.error(error);
            }
            // console.log('missing property error',errors[i]);

        }
        else {
            console.log('VALIDATION ERROR:',errors[i].type);
        }
        //check if the same error has been already parsed, as the validation library does produce duplicates
        if (!messages.includes(errors[i].message)){
            results.push(errors[i]);
            messages.push(errors[i].message);
        }
    }

    return results
}

function parseReqLevels(rawSchema, levels){
    var defaultLevels = ['`MUST`','`MAY`','`SHOULD`'];
    var quoteChar = '`';
    if (levels) {
        defaultLevels = levels;
        for (var i = levels.length - 1; i >= 0; i--) {
            defaultLevels[i] = quoteChar + levels[i] + quoteChar;
        }
    }

    
    var lines = [];
    var result = {'data':'',lineRules:{}};

    lines = rawSchema.split("\n");

    var re = new RegExp('(.*)('+defaultLevels[0]+'|'+defaultLevels[1]+'|'+defaultLevels[2]+')(.*)');

    for (var i = 0; i <= lines.length - 1; i++) {
        var match = lines[i].match(re);
        if (match) {
            result.lineRules[i] = match[2];
            result.data = String.concat(result.data,match[3] + '\n');
        } else {
            result.data = String.concat(result.data,lines[i] + '\n');
        }
    }
    console.log('PREPROCESSING OF schema DONE',result.data);
    return result
}

var schemaText = 
"# Issue-simple-annotated.shex - Issue representation in Turtle\n" + 
"\n" + 
"#BASE <http://base.example/#>\n" + 
"PREFIX ex: <http://ex.example/#>\n" + 
"PREFIX foaf: <http://xmlns.com/foaf/>\n" + 
"PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n" + 
"PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" + 
"start = <IssueShape>  # Issue validation starts with <IssueShape>\n" + 
"\n" + 
"<IssueShape> {                       # An <IssueShape> has:\n" + 
"    ex:state [ex:unassigned            # state which is\n" + 
"              ex:assigned],            #   unassigned or assigned.\n" + 
"    `MUST`ex:reportedBy @<UserShape>,        # reported by a <UserShape>.\n" + 
"    ex:reportedOn xsd:dateTime,        # reported some date/time.\n" + 
"    (                                  # optionally\n" + 
"     ex:reproducedBy @<EmployeeShape>, #   reproduced by someone\n" + 
"     ex:reproducedOn xsd:dateTime      #   at some data/time.\n" + 
"    )?,\n" + 
"    ex:related @<IssueShape>*          # n related issues.\n" + 
"}\n" + 
"\n" + 
"<UserShape> {                        # A <UserShape> has:\n" + 
"    (                                  # either\n" + 
"       foaf:name xsd:string            #   a FOAF name\n" + 
"     |                                 #  or\n" + 
"       foaf:givenName xsd:string+,     #   one or more givenNames\n" + 
"       foaf:familyName xsd:string),    #   and one familyName.\n" + 
"    foaf:mbox IRI                      # one FOAF mbox.\n" + 
"}\n" + 
"\n" + 
"<EmployeeShape> {                    # An <EmployeeShape> has:\n" + 
"    `MUST`foaf:givenName xsd:string+,        # at least one givenName.\n" + 
"    `MAY`foaf:familyName xsd:string,        # one familyName.\n" + 
"    `SHOULD`foaf:phone IRI*,                   # any number of phone numbers.\n" + 
"    foaf:mbox IRI                      # one FOAF mbox.\n" + 
"}";

