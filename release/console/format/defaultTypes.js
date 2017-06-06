"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("util");
var makeSimpleTypeMatcher = function (typeName) { return function (value) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return typeName === typeof (value || undefined);
}; };
exports.defaultMatcher = {
    "string": makeSimpleTypeMatcher("string"),
    "number": makeSimpleTypeMatcher("number"),
    "boolean": makeSimpleTypeMatcher("boolean"),
    "object": makeSimpleTypeMatcher("object")
};
var valueFormatter = function (value) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return stringFormatter.apply(void 0, ['%s', value].concat(args));
};
var stringFormatter = function (value) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return util_1.format.apply(void 0, [value].concat(args));
};
var numberFormatter = function (value, dec) {
    return stringFormatter('%s', value);
};
var objectFormatter = function (value) {
    return JSON.stringify(value, null, '  ');
};
exports.defaultFormatter = {
    "string": {
        formatValue: stringFormatter
    },
    "number": {
        formatValue: numberFormatter
    },
    "boolean": {
        formatValue: valueFormatter
    },
    "object": {
        formatValue: objectFormatter
    }
};
//# sourceMappingURL=defaultTypes.js.map