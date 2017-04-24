"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var rxfs = require("./rx/fs");
var stringUtils = require('ember-cli-string-utils');
exports.dasherize = function (str) { return stringUtils.dasherize(str); };
exports.decamelize = function (str) { return stringUtils.decamelize(str); };
exports.camelize = function (str) { return stringUtils.camelize(str); };
exports.classify = function (str) { return stringUtils.classify(str); };
exports.underscore = function (str) { return stringUtils.underscore(str); };
exports.capitalize = function (str) { return stringUtils.capitalize(str); };
var wrapFileContent = function (content) {
    if (content.length <= 255 && rxfs.existsSync(content)) {
        return rxjs_1.Observable.of(content);
    }
    return rxfs.tmp.file(content);
};
var diffStrings = function () {
    var stringValues = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        stringValues[_i] = arguments[_i];
    }
    return rxjs_1.Observable.from(stringValues)
        .flatMap(function (stringValue) {
        return wrapFileContent(stringValue);
    }).toArray().flatMap(function (tmpFiles) {
        return rxfs.diff.apply(rxfs, [{}].concat(tmpFiles));
    });
};
exports.diff = function () {
    var stringValues = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        stringValues[_i] = arguments[_i];
    }
    return diffStrings.apply(void 0, stringValues);
};
//# sourceMappingURL=string.js.map