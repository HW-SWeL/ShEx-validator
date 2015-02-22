# ShEx-validator 

Parses and a ShEx schema and ShEx data file and validates the data against the schema.

A standalone Node module with a command line interface and validate() function as described below

## Installation

```sh
npm install git@github.com:HeriotWattMEng2015/ShEx-validator.git
```

## Usage
### In Code
```javascript
var validator = require('ShEx-validator');

var schemaText = "...";

var dataText = "...";

var callbacks = {
    schemaParsed: function (schema) {...},
    schemaParseError: function (errorMessage) {...},
    dataParsed: function (data) {...},
    dataParseError: function (errorMessage) {...},
    tripleValidated: function (validation) {...},
    validationError: function (validationError) {...}
};

var options = {
    closedShapes: true|false
};

validator.validate(schemaText, dataText, callbacks, options);
```

### On Command Line
While developing: `node index.js tests/test.shex tests/test.turtle`

In future when globally installed: `ShEx-validator <schema> <data>`

## Development

The main access point is `index.js`.

Currently only n3.js is used for parsing the data but others can easily be added in `dataParser.js`.

Validation is still performed by a combination of Erics PEG generated `includes/shexParser` and `includes/RDF.js`.

### Tests
TODO

### Dependencies

- [n3](https://github.com/RubenVerborgh/N3.js): Lightning fast, asynchronous, streaming Turtle / N3 / RDF library.
- [promise](https://github.com/then/promise): Bare bones Promises/A+ implementation

### Dev Dependencies

- [pegjs](https://github.com/dmajda/pegjs): Parser generator for JavaScript

## License

MIT
