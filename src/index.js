var Promise = require('promise');
var shexjs = require("shex");
var n3 = require("n3");

var DefaultBase = "";

function Validator(schemaText, dataText, callbacks, options) {
    this.callbacks = callbacks;
    this.options = options;
    
    this.updateSchema(location.origin + '/schema.shex', schemaText);
    this.updateData(dataText);
    // console.log("validator has instantiated");
    // console.log("callbacks:\n",callbacks);
    // console.log("options:\n",options);

}

Validator.prototype = {
    updateSchema: function (base, schemaText) {
        this.schema = parseSchema(base ,schemaText);
        // this.schema = schemaParser.parseSchema(schemaText);
        this.schema.done(this.callbacks.schemaParsed, this.callbacks.schemaParseError);
        // var _schema = shexjs.Parser.construct(DefaultBase).parse(schemaText);
        // console.log('UPDATING THE FUCKIGN Schema',this.schema, _schema);
    },
    updateData: function (dataText) {
        this.data = parseData(dataText);
        // this.data = dataParser.parseData(dataText);
        this.data.done(this.callbacks.dataParsed, this.callbacks.dataParseError);
    },
    findShapes: function () {
        var _this = this;
        return Promise.all([this.schema, this.data]).then(function (a) {
            console.log('showing shapes');
            console.log(this.schema);
            console.log(this.data);
        });
    },
    validate: function(startingNodes) {
        var _this = this;
        console.log('validate function',_this);
        return Promise.all([this.schema, this.data, this.options]).then(function (a) {
            console.log(a);
            var node = Object.keys(a[2].resourceShapeMap)[0];
            var result = shexjs.Validator.construct(a[0].schema).validate(a[1].db, node, a[2].resourceShapeMap[node]);
            console.log('callbacks in validator',_this.callbacks);
            console.log('db to validate',a[1].db)
            // console.log('validation results:',result);
            // return validator.validate(
            //     a[0].schema,                       // Schema
            //     a[0].resolver,
            //     startingNodes,      // Starting Node
            //     a[1].db,                       // db
            //     a[1].resolver,
            //     _this.options.closedShapes,
            //     _this.callbacks.validationResult);
            return cleanResult(result, a[1].triples, _this.callbacks.validationResult)
        });
    }
};

module.exports.Validator = Validator;

function parseData(dataText){
    console.log('split data');
    console.log(dataText.split("\n"));
    console.log('this',this);
    return new Promise(function (resolve, reject) {
        var lineIndex = new Object();
        var db = n3.Store();
        n3.Parser({documentIRI: DefaultBase}).parse(dataText, function (error, triple, prefixes) {
            // console.log('db', db);
            // console.log('DB');
            console.log('triple callback')
            if (error) {
                // throw Error("error parsing " + data + ": " + error);
                reject(parseN3Error(error));
            } else if (triple) {
                console.log("N3triple",triple);
                lineIndex[JSON.stringify({'subject':triple.subject,'predicate':triple.predicate,'object':triple.object,'graph':triple.graph})] = triple.line;
                // lineIndex[triple.line] = {'object':triple.object,'subject':triple.subject,'predicate':triple.predicate,'graph':triple.graph};
                db.addTriple(triple);
            // console.log(triple.subject, triple.predicate, triple.object, '.');
            } else {
                var triples = db.getTriples();
                for (var i = triples.length - 1; i >= 0; i--) {
                    var triple_key = JSON.stringify({'subject':triples[i].subject,'predicate':triples[i].predicate,'object':triples[i].object,'graph':""});
                    triples[i].line = lineIndex[triple_key];
                }
                resolve({db: db, triples:triples};
            }
        });
        
    });
}

function parseSchema(base, schemaText) {
    return new Promise(function (resolve, reject) {
        var schema;
        try {
            schema = shexjs.Parser.construct(base).parse(schemaText);
        }
        catch (e) {
            reject(e);
        }
        resolve({schema: schema, shapes: schema.shapes});

    });
};

function cleanResult(result, parsedTriples, callback){
    console.log('validation result', result);
    var errors = [];
    var solutions = [];
    if (result.type == 'Failure'){
        errors = result.errors;
        console.log('errors',errors);
        // console.log('lineIndex',lineIndex);
        for (var i = errors.length - 1; i >= 0; i--) {
            var triple_key = JSON.stringify({'subject':errors[i].triple.subject,'predicate':errors[i].triple.predicate,'object':errors[i].triple.object,'graph':""});
            errors[i].line = lineIndex[triple_key];
        }
    } else {
        solutions = result.solution;
    }
    var clean_result = {
            errors: errors,
            matches: solutions,
            startingResource: result.node,
            passed: errors.length === 0,
            full_result:result
        };
    console.log('clean_result',clean_result);
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
function cleanMatches(validResult){
    var results = []
    if (validResult.type == 'ShapeTest') {
        cleanMatches(validResult.solution);
    }
    else if (validResult.type == 'EachOfSolutions') {

    }
    else if (validResult.type == 'OneOfSolutions') {

    }
    else if (validResult.type == 'TripleConstraintSolutions') {

    }
    else if (validResult.type == 'TestedTriple') {

    }
    else if (validResult instanceof Array){
        for (var i = validResult.length - 1; i >= 0; i--) {
            cleanMatches(validResult[i]);
        }
    }
    return results
}