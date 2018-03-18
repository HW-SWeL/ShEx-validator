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
            // console.log('validation results:',result);
            // return validator.validate(
            //     a[0].schema,                       // Schema
            //     a[0].resolver,
            //     startingNodes,      // Starting Node
            //     a[1].db,                       // db
            //     a[1].resolver,
            //     _this.options.closedShapes,
            //     _this.callbacks.validationResult);
            return cleanResult(result, _this.callbacks.validationResult)
        });
    }
};

module.exports.Validator = Validator;

function parseData(dataText){
    return new Promise(function (resolve, reject) {

        var db = n3.Store();
        n3.Parser({documentIRI: DefaultBase, format: "text/turtle"}).parse(dataText, function (error, triple, prefixes) {
            if (error) {
                // throw Error("error parsing " + data + ": " + error);
                reject(parseN3Error(error));
            } else if (triple) {
                db.addTriple(triple)
            // console.log(triple.subject, triple.predicate, triple.object, '.');
            } else {
                resolve({db: db, triples:db.getTriples()});
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

function cleanResult(result, callback){
    console.log('validation result', result);
    var errors = [];
    var solutions = [];
    if (result.type == 'Failure'){
        errors = result.errors;
    } else {
        solutions = result.solution.solutions;
    }
    console.log('errors',errors,'passed',errors.length === 0);
    return callback({
            errors: errors,
            matches: solutions,
            startingResource: 'startingResource',
            passed: errors.length === 0
        });
}

function cleanupValidation(valRes, resolver, startingResource, cb) {

    return valRes.then(function(valRes) {
        var errors = valRes.errors.map(errorFormatter);

        cb({
            errors: errors,
            matches: valRes.matches,
            startingResource: startingResource,
            passed: errors.length === 0
        });
    });

}