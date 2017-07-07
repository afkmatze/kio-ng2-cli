"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var ceylon_1 = require("ceylon");
var mock_1 = require("../../../test/mock");
var _1 = require("../");
var typeNameIsString = function (typeName, value) {
    return typeName === 'string';
};
var typeNameIsNumber = function (typeName, value) {
    return typeName === 'number';
};
var TEST_FORMAT = [
    ['Hello', mock_1.mockParam('s', null, 'World'), 'today is', mock_1.mockParam('o')]
];
var logTestData = function (testData) {
    console.log('format\n••••••\n', testData.format, '\n••••••\n');
    console.log('args\n[\n');
    testData.args.forEach(function (arg, idx) {
        console.log('--');
        console.log('#Arg %s\t[%s]', idx, typeof arg);
        console.log(arg);
        console.log('-');
    });
};
describe('test formatter', function () {
    var execTest = function (params, idx) {
        var testData = mock_1.mockTest(params);
        describe('TEST_FORMAT ' + idx + (" \"" + testData.format + "\""), function () {
            //logTestData(testData)
            var result = _1.formatter.printf.apply(_1.formatter, [testData.format].concat(testData.args));
            ceylon_1.default(result).toEqual(testData.expect);
            //console.log('result\n=====\n',result,'\n====\n')
        });
    };
    TEST_FORMAT.forEach(execTest);
});
//# sourceMappingURL=formatter.spec.js.map