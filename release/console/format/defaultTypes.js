"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("util");
var makeSimpleTypeMatcher = function (typeName) { return function (dataType, value) {
    return typeName === typeof (value || undefined);
}; };
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
exports.defaultMatcher = {
    "string": makeSimpleTypeMatcher("string"),
    "number": makeSimpleTypeMatcher("number"),
    "boolean": makeSimpleTypeMatcher("boolean"),
    "object": makeSimpleTypeMatcher("object")
};
exports.defaultFormatter = {
    "string": stringFormatter,
    "number": numberFormatter,
    "boolean": valueFormatter,
    "object": valueFormatter
};
exports.defaultTypes = {
    "string": { formatter: exports.defaultFormatter.string, matcher: exports.defaultMatcher.string },
    "number": { formatter: exports.defaultFormatter.number, matcher: exports.defaultMatcher.number },
    "boolean": { formatter: exports.defaultFormatter.boolean, matcher: exports.defaultMatcher.boolean },
    "object": { formatter: exports.defaultFormatter.object, matcher: exports.defaultMatcher.object }
};
//# sourceMappingURL=defaultTypes.js.map