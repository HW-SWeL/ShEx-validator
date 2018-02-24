var Promise = require('promise');

var dataParser = require("./dataParser.js");
var schemaParser = require("./schemaParser.js");
var validator = require("./validator.js");
var shapeFinder = require("./shapeFinder.js");

var shexjs = require("shex");
var n3 = require("n3");

var DefaultBase = "";

function Validator(schemaText, dataText, callbacks, options) {
    this.callbacks = callbacks;
    this.options = options;
    
    this.updateSchema(location.origin + '/schema.shex', schemaText);
    this.updateData(dataText);
    
    console.log("validator has instantiated");
    console.log("callbacks:\n",callbacks);
    console.log("options:\n",options);

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
            console.log(this.schema);
            console.log(this.data);
        });
    },
    validate: function(startingNodes) {
        var _this = this;
        return Promise.all([this.schema, this.data]).then(function (a) {
            return validator.validate(
                a[0].schema,                       // Schema
                a[0].resolver,
                startingNodes,      // Starting Node
                a[1].db,                       // db
                a[1].resolver,
                _this.options.closedShapes,
                _this.callbacks.validationResult);
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
                resolve({db: db, triples:db.triples});
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
