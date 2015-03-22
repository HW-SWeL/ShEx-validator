# ShEx-validator [![Build Status](https://travis-ci.org/HeriotWattMEng2015/ShEx-validator.svg?branch=master)](https://travis-ci.org/HeriotWattMEng2015/ShEx-validator)

Parses and a ShEx schema and RDF data file and validates the resources in the data against the shapes in the schema.

A standalone Node module with a command line interface and validate() function as described below

It is built on [Eric Prud'hommeaux's](http://www.w3.org/People/Eric/) [ShEx validator and parser](https://github.com/ericprud/ShExDemo)

## Installation

```sh
npm install HeriotWattMEng2015/ShEx-validator
```

## Usage
### In Code
```js
var ShEx = require('ShEx-validator');

var schemaText = "...";

var dataText = "...";

var startingResources = {
    "RESOURCE" : "SHAPE",
    ...
};

var callbacks = {
    schemaParsed: function (schema) {...},
    schemaParseError: function (errorMessage) {...},
    dataParsed: function (data) {...},
    dataParseError: function (errorMessage) {...},
    validationResult: function (validationResult) {...},
    findShapesResult: function(shapes) {...}
};

var options = {
    closedShapes: true|false,
};

var validator = new ShEx.Validator(schemaText, dataText, callbacks, options);

validator.findShapes();

validator.validate(startingResources);
```

#### Callbacks
Not nearly finished or perfected but it is the current implementation.

```js
schemaParsed = {
    shapes: ["SHAPE", ...]
}

dataParsed = {
    resources: ["RESOURCE"],
    triples: [RDF.Triple]
}

validationResult = {
    passed: true|false,
    startingResource: RDF.RDFLiteral|RDF.IRI,
    matches: [{
        rule: RDF.Triple,
        triple: RDF.Triple
    ]},
    errors: [{
        name: string,
        triple: RDF.Triple,
        req_lev: string
    ]}
}

shapeFindingResult = {
    "RESOURCE" : "SHAPE" | null,
    ...
};

```

### On Command Line

While developing: `node commandLine.js samples/hcls_2014.shex samples/chembl_2014.ttl  http://rdf.ebi.ac.uk/chembl/chembl=SummaryLevelShape`


In future when globally installed:

<!--- BEGIN USAGE -->
    Usage:
        ShEx-validator [options] SCHEMA DATA RESOURCE=SHAPE [RESOURCE=SHAPE ...]
        ShEx-validator [options] SCHEMA DATA -f

    Options:
        -c, --closed-shape  All properties must be in shape
        -h, --help          Print usage information
        -f, --find-shapes   Find shapes which match the resources
<!--- END USAGE -->

## Development

The main access point is `index.js`.

Currently only n3.js is used for parsing the data but others can easily be added in `dataParser.js`.

Validation is still performed by a combination of Erics PEG generated `includes/shexParser` and `includes/RDF.js`.

### Requirement Levels ShEx Addition

Requirement levels have been added to the ShEx syntax to a allow sematics such as "should" and "should not".
The following example shows the syntax.

```
PREFIX foaf: <http://xmlns.com/foaf/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema>

start = <PersonShape>
<PersonShape> {
    `should` foaf:name rdf:langString,
    `should not` !foaf:age rdfs:Literal
}
```

### Tests
Tests are done using Jasmine, and the test specifications are located in specs/.

To run the tests do: 
```sh
npm test
```
### Dependencies

- [minimist](https://github.com/substack/minimist): parse argument options
- [n3](https://github.com/RubenVerborgh/N3.js): Lightning fast, asynchronous, streaming Turtle / N3 / RDF library.
- [promise](https://github.com/then/promise): Bare bones Promises/A+ implementation

### Dev Dependencies

- [jasmine-node](https://github.com/mhevery/jasmine-node): DOM-less simple JavaScript BDD testing framework for Node
- [pegjs](https://github.com/dmajda/pegjs): Parser generator for JavaScript

## License

MIT
