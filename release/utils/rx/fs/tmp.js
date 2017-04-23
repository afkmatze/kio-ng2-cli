"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var nodefs = require("fs");
var fs = require("./fs");
var randomInt = function (max, min) {
    if (max === void 0) { max = 100; }
    if (min === void 0) { min = 0; }
    return Math.floor(Math.random() * (max - min)) + min;
};
var randomChr = function () { return String.fromCharCode(randomInt('z'.charCodeAt(0), 'a'.charCodeAt(0))); };
var randomWord = function (length) {
    if (length === void 0) { length = randomInt(30, 2); }
    var chrs = '.'.repeat(length).split('.').slice(1).map(function () { return randomChr(); });
    return chrs.join('');
};
var randomName = function () { return "kio_tmp_" + randomWord(9) + ".tmp"; };
var registerAutoDeletion = function (filename) {
    addExitHandler(function () {
        nodefs.unlinkSync(filename);
    });
};
var addExitHandler = function (handler) {
    //do something when app is closing
    process.on('exit', handler);
    process.on('SIGINT', handler);
    process.on('uncaughtException', handler);
};
exports.file = function (content, persist) {
    if (persist === void 0) { persist = false; }
    var tmpFilename = path.join(process.env.TMPDIR, randomName());
    return fs.writeFile(tmpFilename, content || '').map(function (filepath) {
        if (persist !== true) {
            registerAutoDeletion(filepath);
        }
        return filepath;
    })
        .toArray().map(function (rows) { return rows.join("\n"); });
};
//# sourceMappingURL=tmp.js.map