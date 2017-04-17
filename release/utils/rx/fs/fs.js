"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var from_1 = require("./from");
var shelljs_1 = require("shelljs");
var rxjs_1 = require("rxjs");
var promisify = function (method) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return new Promise(function (resolve, reject) {
        var result = method.apply(void 0, args.concat([function (error) {
                var results = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    results[_i - 1] = arguments[_i];
                }
                if (error) {
                    reject(error);
                }
                else {
                    var _a = results[0], payload = _a === void 0 ? result : _a, resultArgs = results.slice(1);
                    resolve(payload);
                }
            }]));
    });
}; };
//export * from 'fs'
exports.statSync = function (filename) {
    var stat;
    try {
        stat = fs.statSync(filename);
    }
    catch (e) { }
    return stat;
};
exports.existsSync = function (filename) {
    return !!exports.statSync(filename);
};
exports.async = {
    stat: promisify(fs.stat),
    mkdir: function (filepath, p) { return Promise.resolve(p ? shelljs_1.mkdir('-p', filepath) : shelljs_1.mkdir(filepath)); },
    readFile: promisify(fs.readFile),
    writeFile: promisify(fs.writeFile),
    readdir: promisify(fs.readdir)
};
exports.readfileFull = function (filepath, full) {
    if (full === void 0) { full = false; }
    if (full) {
        return rxjs_1.Observable.fromPromise(exports.async.readFile(filepath));
    }
    return from_1.fromReadable(fs.createReadStream(filepath, {
        encoding: 'utf8'
    })).map(function (buffer) { return buffer.toString(); }).concat();
};
exports.readFile = function (filename) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return rxjs_1.Observable.fromPromise(exports.async.readFile.apply(exports.async, [filename].concat(args)));
};
exports.writeFile = function (filename, content) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return rxjs_1.Observable.fromPromise(exports.async.writeFile.apply(exports.async, [filename, content].concat(args)).then(function () { return filename; })
        .catch(function (error) {
        console.error("writeFile(" + filename + ") failed with error: " + error);
    }));
};
exports.readfile = function (filepath, full) {
    if (full === void 0) { full = false; }
    if (full) {
        return exports.readFile(filepath);
    }
    return from_1.fromReadable(fs.createReadStream(filepath, {
        encoding: 'utf8'
    })).map(function (buffer) { return buffer.toString(); }).concat();
};
exports.readDir = function (filename) {
    return rxjs_1.Observable.fromPromise(exports.async.readdir(filename));
};
exports.readstats = function (filepath) { return rxjs_1.Observable.fromPromise(exports.async.stat(filepath)); };
exports.mkdir = function (filepath) { return rxjs_1.Observable.fromPromise(exports.async.mkdir(filepath).then(function () { return filepath; })); };
//# sourceMappingURL=fs.js.map