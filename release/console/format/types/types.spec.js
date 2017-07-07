"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var ceylon_1 = require("ceylon");
var _1 = require("../");
var _2 = require("./");
var variables = require("../variables");
var ValueTypeMap = {
    string: {
        type: "string",
        valueType: _2.stringType,
        matches: [
            {
                format: 'Text: "%s"',
                value: 'Hallo Welt',
                expect: 'Text: "Hallo Welt"'
            }
        ]
    },
    number: {
        type: "number",
        valueType: _2.numberType,
        matches: [
            {
                format: 'Value: %1.4f',
                value: 1.423432,
                expect: 'Value: 1.4234'
            }
        ]
    },
    /*date: {
      type: "Date",
      valueType:defaultTypes.date
    },*/
    boolean: {
        type: "boolean",
        valueType: _2.booleanType
    },
    object: {
        type: "object",
        valueType: _2.objectType
    } /*,
    buffer: {
      type: defaultTypes.Buffer
    }*/
};
var testFormatType = function (typeName) {
    describe("" + typeName, function () {
        var typeTest = ValueTypeMap[typeName];
        var testType = typeTest.type;
        var testValueType = typeTest.valueType;
        var testData = typeTest.matches;
        describe('formatter', function () {
            testData && testData.forEach(function (testDataRow) {
                it("formats " + testDataRow.format + " to " + testDataRow.expect, function () {
                    var formatted = _1.formatter.printf(testDataRow.format, testDataRow.value);
                    ceylon_1.default(formatted).toEqual(testDataRow.expect);
                });
                it('parses', function () {
                    var result = _1.formatter.parse(testDataRow.format, testDataRow.value);
                    ceylon_1.default(result).toContainKey('chunks');
                    ceylon_1.default(result.chunks).toExist();
                    ceylon_1.default(result.chunks.length).toEqual(3);
                    var valueParam = result.chunks[1];
                    //console.log('\n-----------\nvalueParam\n',valueParam,'\n-----\n')
                    ceylon_1.default(_1.isInstanceOf.Param(valueParam)).toBeTrue('param is not a Param');
                    ceylon_1.default(variables.isInstanceOfFormatVariable(valueParam)).toBeTrue('param is not a FormatVariable');
                    ceylon_1.default(_1.isInstanceOf.FormatParam(valueParam)).toBeTrue('param is not a FormatParam');
                    //console.log('result',result)
                });
            });
        });
        describe('matcher', function () {
            it('formats', function () {
                //expect(testValueType.formatte).toExist()
            });
        });
    });
};
var testArgs = {
    "string": ["Hello", "World", "Foo", "Bar"],
    "number": [0, 1, 13, 42, 23.429, 0xFF],
    "boolean": [0, 1, true, false],
    "object": [{ foo: "bar" }, new Date()]
};
describe('format types', function () {
    describe('string tests', function () {
        describe('test 1 param', function () {
            var numArgs = 1;
            var test_format = 'Hello %s';
            var args = testArgs.string.slice(0, numArgs);
            //console.log('%s args',numArgs, args)
            var result = _1.formatter.parse.apply(_1.formatter, [test_format].concat(args));
            it('has ' + numArgs + ' param', function () {
                //console.log('result.chunks',result.chunks)
                ceylon_1.default(result.chunks.length).toEqual((numArgs * 2) + 1);
            });
        });
        describe('test 2 param', function () {
            var numArgs = 2;
            var test_format = 'Hello %s foo %s bar';
            var args = testArgs.string.slice(0, numArgs);
            //console.log('%s args',numArgs, args)
            var result = _1.formatter.parse.apply(_1.formatter, [test_format].concat(args));
            it('has ' + numArgs + ' param', function () {
                ceylon_1.default(result.chunks.length).toEqual((numArgs * 2) + 1);
            });
        });
        describe('test 3 param', function () {
            var numArgs = 3;
            var test_format = 'Hello %s bla %s foo %s bla';
            var args = testArgs.string.slice(0, numArgs);
            //console.log('%s args',numArgs, args)
            var result = _1.formatter.parse.apply(_1.formatter, [test_format].concat(args));
            it('has ' + numArgs + ' param', function () {
                ceylon_1.default(result.chunks.length).toEqual((numArgs * 2) + 1);
            });
        });
        describe('test 4 param', function () {
            var numArgs = 4;
            var test_format = 'Hello %s foo %s foo %s foo %s';
            var args = testArgs.string.slice(0, numArgs);
            //console.log('%s args',numArgs, args)
            var result = _1.formatter.parse.apply(_1.formatter, [test_format].concat(args));
            it('has ' + numArgs + ' param', function () {
                ceylon_1.default(result.chunks.length).toEqual((numArgs * 2) + 1);
            });
        });
    });
    describe('floating number tests', function () {
        describe('test 1 param', function () {
            var numArgs = 1;
            var test_format = 'Hello %1.2f';
            var args = testArgs.number.slice(0, numArgs);
            //console.log('%s args',numArgs, args)
            var result = _1.formatter.parse.apply(_1.formatter, [test_format].concat(args));
            it('has ' + numArgs + ' param', function () {
                //console.log('result.chunks',result.chunks)
                ceylon_1.default(result.chunks.length).toEqual((numArgs * 2) + 1);
            });
        });
        describe('test 2 param', function () {
            var numArgs = 2;
            var test_format = 'Hello %1.2f foo %1.2f bar';
            var args = testArgs.number.slice(0, numArgs);
            //console.log('%1.2f args',numArgs, args)
            var result = _1.formatter.parse.apply(_1.formatter, [test_format].concat(args));
            it('has ' + numArgs + ' param', function () {
                ceylon_1.default(result.chunks.length).toEqual((numArgs * 2) + 1);
            });
        });
        describe('test 3 param', function () {
            var numArgs = 3;
            var test_format = 'Hello %1.2f bla %1.2f foo %1.2f bla';
            var args = testArgs.number.slice(0, numArgs);
            //console.log('%1.2f args',numArgs, args)
            var result = _1.formatter.parse.apply(_1.formatter, [test_format].concat(args));
            it('has ' + numArgs + ' param', function () {
                ceylon_1.default(result.chunks.length).toEqual((numArgs * 2) + 1);
            });
        });
        describe('test 4 param', function () {
            var numArgs = 4;
            var test_format = 'Hello %1.2f foo %1.2f foo %1.2f foo %1.2f';
            var args = testArgs.number.slice(0, numArgs);
            //console.log('%s args',numArgs, args)
            var result = _1.formatter.parse.apply(_1.formatter, [test_format].concat(args));
            it('has ' + numArgs + ' param', function () {
                ceylon_1.default(result.chunks.length).toEqual((numArgs * 2) + 1);
            });
        });
    });
    describe('number tests', function () {
        describe('test 1 param', function () {
            var numArgs = 1;
            var test_format = 'Hello %d';
            var args = testArgs.number.slice(0, numArgs);
            //console.log('%s args',numArgs, args)
            var result = _1.formatter.parse.apply(_1.formatter, [test_format].concat(args));
            it('has ' + numArgs + ' param', function () {
                //console.log('result.chunks',result.chunks)
                ceylon_1.default(result.chunks.length).toEqual((numArgs * 2) + 1);
            });
        });
        describe('test 2 param', function () {
            var numArgs = 2;
            var test_format = 'Hello %d foo %d bar';
            var args = testArgs.number.slice(0, numArgs);
            //console.log('%d args',numArgs, args)
            var result = _1.formatter.parse.apply(_1.formatter, [test_format].concat(args));
            it('has ' + numArgs + ' param', function () {
                ceylon_1.default(result.chunks.length).toEqual((numArgs * 2) + 1);
            });
        });
        describe('test 3 param', function () {
            var numArgs = 3;
            var test_format = 'Hello %d bla %d foo %d bla';
            var args = testArgs.number.slice(0, numArgs);
            //console.log('%d args',numArgs, args)
            var result = _1.formatter.parse.apply(_1.formatter, [test_format].concat(args));
            it('has ' + numArgs + ' param', function () {
                ceylon_1.default(result.chunks.length).toEqual((numArgs * 2) + 1);
            });
        });
        describe('test 4 param', function () {
            var numArgs = 4;
            var test_format = 'Hello %d foo %d foo %d foo %d';
            var args = testArgs.number.slice(0, numArgs);
            //console.log('%s args',numArgs, args)
            var result = _1.formatter.parse.apply(_1.formatter, [test_format].concat(args));
            it('has ' + numArgs + ' param', function () {
                ceylon_1.default(result.chunks.length).toEqual((numArgs * 2) + 1);
            });
        });
    });
    describe('boolean tests', function () {
        describe('test 1 param', function () {
            var numArgs = 1;
            var test_format = 'Hello %b';
            var args = testArgs.boolean.slice(0, numArgs);
            //console.log('%s args',numArgs, args)
            var result = _1.formatter.parse.apply(_1.formatter, [test_format].concat(args));
            it('has ' + numArgs + ' param', function () {
                ceylon_1.default(result.chunks.length).toEqual((numArgs * 2) + 1);
            });
        });
        describe('test 2 param', function () {
            var numArgs = 2;
            var test_format = 'Hello %b foo %b bar';
            var args = testArgs.boolean.slice(0, numArgs);
            //console.log('%b args',numArgs, args)
            var result = _1.formatter.parse.apply(_1.formatter, [test_format].concat(args));
            it('has ' + numArgs + ' param', function () {
                ceylon_1.default(result.chunks.length).toEqual((numArgs * 2) + 1);
            });
        });
        describe('test 3 param', function () {
            var numArgs = 3;
            var test_format = 'Hello %b bla %b foo %b bla';
            var args = testArgs.boolean.slice(0, numArgs);
            //console.log('%b args',numArgs, args)
            var result = _1.formatter.parse.apply(_1.formatter, [test_format].concat(args));
            it('has ' + numArgs + ' param', function () {
                ceylon_1.default(result.chunks.length).toEqual((numArgs * 2) + 1);
            });
        });
        describe('test 4 param', function () {
            var numArgs = 4;
            var test_format = 'Hello %b foo %b foo %b foo %b';
            var args = testArgs.boolean.slice(0, numArgs);
            //console.log('%s args',numArgs, args)
            var result = _1.formatter.parse.apply(_1.formatter, [test_format].concat(args));
            it('has ' + numArgs + ' param', function () {
                ceylon_1.default(result.chunks.length).toEqual((numArgs * 2) + 1);
            });
        });
    });
    describe('object tests', function () {
        describe('test 1 param', function () {
            var numArgs = 1;
            var test_format = 'Hello %o';
            var args = testArgs.object.slice(0, numArgs);
            //console.log('%s args',numArgs, args)
            var result = _1.formatter.parse.apply(_1.formatter, [test_format].concat(args));
            it('has ' + numArgs + ' param', function () {
                ceylon_1.default(result.chunks.length).toEqual((numArgs * 2) + 1);
            });
        });
        describe('test 2 param', function () {
            var numArgs = 2;
            var test_format = 'Hello %o foo %o bar';
            var args = testArgs.object.slice(0, numArgs);
            //console.log('%o args',numArgs, args)
            var result = _1.formatter.parse.apply(_1.formatter, [test_format].concat(args));
            it('has ' + numArgs + ' param', function () {
                ceylon_1.default(result.chunks.length).toEqual((numArgs * 2) + 1);
            });
        });
        describe('test 3 param', function () {
            var numArgs = 3;
            var test_format = 'Hello %o bla %o foo %o bla';
            var args = testArgs.object.slice(0, numArgs);
            //console.log('%o args',numArgs, args)
            var result = _1.formatter.parse.apply(_1.formatter, [test_format].concat(args));
            it('has ' + numArgs + ' param', function () {
                ceylon_1.default(result.chunks.length).toEqual((numArgs * 2) + 1);
            });
        });
        describe('test 4 param', function () {
            var numArgs = 4;
            var test_format = 'Hello %o foo %o foo %o foo %o';
            var args = testArgs.object.slice(0, numArgs);
            //console.log('%s args',numArgs, args)
            var result = _1.formatter.parse.apply(_1.formatter, [test_format].concat(args));
            it('has ' + numArgs + ' param', function () {
                ceylon_1.default(result.chunks.length).toEqual((numArgs * 2) + 1);
            });
        });
    });
    Object.keys(ValueTypeMap).forEach(function (key) {
        testFormatType(key);
    });
});
//# sourceMappingURL=types.spec.js.map