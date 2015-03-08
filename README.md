# ShEx-validator [![Build Status](https://travis-ci.org/HeriotWattMEng2015/ShEx-validator.svg?branch=master)](https://travis-ci.org/HeriotWattMEng2015/ShEx-validator)

Parses and a ShEx schema and ShEx data file and validates the data against the schema.

A standalone Node module with a command line interface and validate() function as described below

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

var startingNodes = {
    "STARTING NODE" : "NODE SHAPE",
    ...
};

var callbacks = {
    schemaParsed: function (schema) {...},
    schemaParseError: function (errorMessage) {...},
    dataParsed: function (data) {...},
    dataParseError: function (errorMessage) {...},
    validationResult: function (validationResult) {...},
    shapeFindingResult: function(shapes) {...}
};

var options = {
    closedShapes: true|false,
};

var validator = new ShEx.Validator(schemaText, dataText, callbacks, options);

validator.findShapes();

validator.validate(startingNodes);
```

#### Callbacks
Not nearly finished or perfected but it is the current implementation.

```js
validationResult = {
    passed: true|false,
    startingNode: RDF.RDFLiteral|RDF.IRI,
    matches: [{
        rule: RDF.Triple,
        triple: RDF.Triple
    ]},
    errors: [{
        name: string,
        triple: RDF.Triple
    ]}
}

shapeFindingResult = {
    "NODE NAME" : "NODE SHAPE" | null,
    ...
};

```

### On Command Line

While developing: `node commandLine.js tests/test.shex tests/test.turtle Issue1`

In future when globally installed:

<!--- BEGIN USAGE -->
    Usage:
        ShEx-validator [options] SCHEMA DATA STARTING_NODE [STARTING_NODE...]
        ShEx-validator [options] SCHEMA DATA -f

    Options:
        -c, --closed-shape  Schema must mention all used shapes
        -h, --help          Print usage information
        -f --find-shapes    Find and print shapes which match the data
<!--- END USAGE -->

## Development

The main access point is `index.js`.

Currently only n3.js is used for parsing the data but others can easily be added in `dataParser.js`.

Validation is still performed by a combination of Erics PEG generated `includes/shexParser` and `includes/RDF.js`.

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
