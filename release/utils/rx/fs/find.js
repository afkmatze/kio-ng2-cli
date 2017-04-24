"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var path = require("path");
var fs_1 = require("./fs");
var exec_1 = require("./exec");
exports.find = function (filepath, concurrent) {
    if (!fs_1.existsSync(filepath))
        return rxjs_1.Observable.empty();
    return exec_1.exec("find .", { cwd: filepath })
        .map(function (value) { return path.join(filepath, value.stdout.toString('utf8')); })
        .flatMap(function (value) { return rxjs_1.Observable.of(value); }, concurrent);
};
exports.findFiles = function (filepath, pattern) {
    if (pattern === void 0) { pattern = /.*/; }
    if (!fs_1.existsSync(filepath)) {
        return rxjs_1.Observable.empty();
    }
    return exec_1.exec("find . -type file", { cwd: filepath })
        .map(function (value) { return path.join(filepath, value.stdout.toString('utf8')); })
        .filter(function (value) { return !path.basename(value).startsWith('.'); })
        .filter(function (filename) { return pattern.test(filename); })
        .flatMap(function (value) { return rxjs_1.Observable.of(value); }).concat();
};
//# sourceMappingURL=find.js.map