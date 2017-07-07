"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var ceylon_1 = require("ceylon");
var interfaces_1 = require("./interfaces");
var parse_1 = require("./parse");
var allFlags = ['s', 'd', 'f', 'o', 'O', 'b'];
var createTypeMatchTest = function (flag, value, expect, param) {
    return {
        flag: flag,
        value: value,
        expect: expect,
        param: param,
        source: "%" + (param || '') + flag
    };
};
var createTypeTest = function (tests) {
    return {
        tests: tests
    };
};
var TestTypeMap = {
    string: createTypeTest([
        createTypeMatchTest('s', "Hallo", "Hallo")
    ]),
    number: createTypeTest([
        createTypeMatchTest('f', 1.4233, "1.42", "1.2")
    ]),
    object: createTypeTest([
        createTypeMatchTest('o', { foo: "bar" }, JSON.stringify({ foo: "bar" }))
    ]),
    boolean: createTypeTest([
        createTypeMatchTest('b', true, 'true')
    ])
};
var testFormatType = function (typeName) {
    describe("" + typeName, function () {
        var typeTest = TestTypeMap[typeName];
        var testType = typeTest.type;
        var testData = typeTest.tests;
        describe('parse', function () {
            testData && testData.forEach(function (testDataRow) {
                var paramString = "%" + (testDataRow.param || '') + testDataRow.flag;
                describe("\"" + paramString + "\" to " + testDataRow.expect, function () {
                    var vars = parse_1.parse("%" + (testDataRow.param || '') + testDataRow.flag, {
                        flags: allFlags
                    });
                    var firstVar = vars[0];
                    it('parsed var', function () {
                        ceylon_1.default(vars).toExist();
                        ceylon_1.default(vars.length).toEqual(1);
                    });
                    it("parsed var contains flag: " + testDataRow.flag, function () {
                        ceylon_1.default(firstVar).toContainKey('flag');
                        ceylon_1.default(firstVar.flag).toEqual(testDataRow.flag);
                    });
                    it("parsed var contains source: " + testDataRow.source, function () {
                        ceylon_1.default(firstVar).toContainKey('source');
                        ceylon_1.default(firstVar.source).toEqual(testDataRow.source);
                    });
                    it('parsed var contains "offset"', function () {
                        ceylon_1.default(firstVar).toContainKey('offset');
                        ceylon_1.default(firstVar.offset).toEqual(0);
                    });
                    testDataRow.param && it('parsed var contains "param"', function () {
                        ceylon_1.default(firstVar).toContainKey('param');
                        ceylon_1.default(interfaces_1.isInstanceOf.FormatVariableParam(firstVar)).toBeTrue();
                        if (interfaces_1.isInstanceOf.FormatVariableParam(firstVar)) {
                            ceylon_1.default(firstVar.param).toEqual(testDataRow.param);
                        }
                    });
                });
            });
        });
    });
};
describe('variables', function () {
    /*Object.keys(TestTypeMap).forEach ( key => {
      testFormatType(key)
    } )*/
    describe('string tests', function () {
        describe('test 1 param', function () {
            var test_format = 'Hello %s';
            var result = parse_1.parse(test_format, {
                flags: allFlags
            });
            it('has 1 param', function () {
                ceylon_1.default(result.length).toEqual(1);
            });
        });
        describe('test 2 param', function () {
            var test_format = 'Hello %s foo %s bar';
            var result = parse_1.parse(test_format, {
                flags: allFlags
            });
            it('has 2 param', function () {
                ceylon_1.default(result.length).toEqual(2);
            });
        });
        describe('test 3 param', function () {
            var test_format = 'Hello %s bla %s foo %s bla';
            var result = parse_1.parse(test_format, {
                flags: allFlags
            });
            it('has 3 param', function () {
                ceylon_1.default(result.length).toEqual(3);
            });
        });
        describe('test 4 param', function () {
            var test_format = 'Hello %s foo %s foo %s foo %s dadada';
            var result = parse_1.parse(test_format, {
                flags: allFlags
            });
            it('has 4 param', function () {
                ceylon_1.default(result.length).toEqual(4);
            });
        });
    });
});
//# sourceMappingURL=variables.spec.js.map