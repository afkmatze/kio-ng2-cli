"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shelljs = require("shelljs");
var path = require("path");
var constants_1 = require("../env/constants");
exports.ensure = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var resolvedPath = exports.resolve.apply(void 0, args);
    shelljs.mkdir('-p', resolvedPath);
    return resolvedPath;
};
exports.resolve = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return path.resolve(path.join.apply(path, [constants_1.KIO_PROJECT_CACHE].concat(args)));
};
//# sourceMappingURL=store.js.map