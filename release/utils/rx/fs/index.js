"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var rxjs_1 = require("rxjs");
var exec_1 = require("./exec");
__export(require("./exec"));
__export(require("./find"));
__export(require("./fs"));
__export(require("./from"));
exports.readdir = function (filepath) {
    return exec_1.exec("find . -type file", { cwd: filepath }).map(function (value) { return path.join(filepath, value.stdout.toString('utf8')); })
        .flatMap(function (value) { return rxjs_1.Observable.of(value); }).concat();
};
//# sourceMappingURL=index.js.map