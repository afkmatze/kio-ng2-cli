"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import * as assert from 'assert'
var ceylon_1 = require("ceylon");
var extension_1 = require("./extension");
var fs = require("fs");
var logger = require("../console");
var negateMethodName = function (methodName) {
    return methodName.replace(/^to/, 'toNot');
};
var FSTypes;
(function (FSTypes) {
    FSTypes[FSTypes["file"] = 0] = "file";
    FSTypes[FSTypes["directory"] = 1] = "directory";
    FSTypes[FSTypes["block_device"] = 2] = "block_device";
    FSTypes[FSTypes["character_device"] = 3] = "character_device";
    FSTypes[FSTypes["symbolic_link"] = 4] = "symbolic_link";
    FSTypes[FSTypes["fifo"] = 5] = "fifo";
    FSTypes[FSTypes["socket"] = 6] = "socket";
})(FSTypes = exports.FSTypes || (exports.FSTypes = {}));
exports.flagMatcher = {
    file: function (stats) { return stats.isFile(); },
    directory: function (stats) { return stats.isDirectory(); },
    block_device: function (stats) { return stats.isBlockDevice(); },
    character_device: function (stats) { return stats.isCharacterDevice(); },
    symbolic_link: function (stats) { return stats.isSymbolicLink(); },
    fifo: function (stats) { return stats.isFIFO(); },
    socket: function (stats) { return stats.isSocket(); }
};
exports.isFSType = function (value, fsType) {
    var matcher = exports.flagMatcher[fsType];
    return matcher ? matcher(value) : false;
};
exports.getFSTypeForStats = function (value) {
    if (exports.isFSType(value, "file"))
        return "file";
    if (exports.isFSType(value, "directory"))
        return "directory";
    if (exports.isFSType(value, "socket"))
        return "socket";
    return undefined;
};
exports.FileSystemAssertions = {
    toBeFSType: function (not, actual, fsType, message) {
        if (not === void 0) { not = false; }
        logger.debug('toBeFSType actual: %s, fsType: %s, message', actual, fsType, message);
        var stats = exports.getStats(actual);
        ceylon_1.assert({
            assertion: exports.isFSType(stats, fsType) !== not,
            message: message || "expected " + actual + " " + (not ? 'not ' : '') + "to be a " + fsType,
            expected: fsType,
            actual: exports.getFSTypeForStats(stats)
        });
    },
    toExist: function (not, actual, message) {
        if (not === void 0) { not = false; }
        var stats = exports.getStats(actual);
        ceylon_1.assert({
            assertion: (stats !== exports.emptyStats) !== not,
            message: message || "expected " + actual + " " + (not ? 'not ' : '') + "to be a existing",
        });
    },
    toBeDirectory: function (not, actual, message) {
        if (not === void 0) { not = false; }
        return exports.FileSystemAssertions.toBeFSType(not, actual, "directory", message);
    },
    toBeFile: function (not, actual, message) {
        if (not === void 0) { not = false; }
        return exports.FileSystemAssertions.toBeFSType(not, actual, "file", message);
    }
};
var normalizeDate = function (datetime) {
    var t = datetime.getTime();
    return new Date(t - (t % 1000));
};
exports.FileAgeAssertion = {
    toBeNewerThan: function (not, actual, datetime, message) {
        if (not === void 0) { not = false; }
        datetime = normalizeDate(datetime);
        var stats = exports.getStats(actual);
        var valTime = datetime.getTime();
        var statsTime = stats.mtime.getTime();
        ceylon_1.assert({
            assertion: statsTime >= valTime !== not,
            message: message || "expected " + actual + " " + (not ? 'not ' : '') + "to be newer than " + datetime + " (diff: " + (datetime.getTime() - stats.mtime.getTime()) + ")",
            expected: 'newer than ' + datetime.getTime(),
            actual: stats.mtime.getTime() + ' diff: ' + (stats.mtime.getTime() - datetime.getTime())
        });
    }
};
exports.emptyStats = {
    isFile: function () { return false; },
    isDirectory: function () { return false; },
    isBlockDevice: function () { return false; },
    isCharacterDevice: function () { return false; },
    isSymbolicLink: function () { return false; },
    isFIFO: function () { return false; },
    isSocket: function () { return false; },
    dev: undefined,
    ino: undefined,
    mode: undefined,
    nlink: undefined,
    uid: undefined,
    gid: undefined,
    rdev: undefined,
    size: undefined,
    blksize: undefined,
    blocks: undefined,
    atime: undefined,
    mtime: undefined,
    ctime: undefined,
    birthtime: undefined
};
exports.getStats = function (filepath) {
    var stats = exports.emptyStats;
    try {
        stats = fs.statSync(filepath);
    }
    catch (e) {
        stats = exports.emptyStats;
    }
    return stats;
};
exports.assertExists = function (filepath, message) {
    var fileStats = exports.getStats(filepath);
    ceylon_1.assert({
        assertion: fileStats !== exports.emptyStats,
        message: message || "expected " + filepath + " to exist"
    });
};
exports.expectFile = function (filepath) {
    var _expect = extension_1.expect(filepath);
};
exports.default = function (filepath) {
    var assertionScope = {
        actual: filepath + ''
    };
    var assertions = {
        toExist: function (message) { return exports.FileSystemAssertions.toExist(false, filepath, message || undefined); },
        toBeNewerThan: function (datetime, message) { return exports.FileAgeAssertion.toBeNewerThan(false, filepath, datetime, message || undefined); },
        toBeFSType: function (fsType, message) { return exports.FileSystemAssertions.toBeFSType(false, filepath, fsType, message || undefined); },
        toBeDirectory: function (message) { return exports.FileSystemAssertions.toBeFSType(false, filepath, "directory", message || undefined); },
        toBeADirectory: function (message) { return exports.FileSystemAssertions.toBeFSType(false, filepath, "directory", message || undefined); },
        toBeFile: function (message) { return exports.FileSystemAssertions.toBeFSType(false, filepath, "file", message || undefined); },
        toBeAFile: function (message) { return exports.FileSystemAssertions.toBeFSType(false, filepath, "file", message || undefined); },
        toNotExist: function (message) { return exports.FileSystemAssertions.toExist(true, filepath, message || undefined); },
        toNotBeNewerThan: function (datetime, message) { return exports.FileAgeAssertion.toBeNewerThan(true, filepath, datetime, message || undefined); },
        toNotBeFSType: function (fsType, message) { return exports.FileSystemAssertions.toBeFSType(true, filepath, fsType, message || undefined); },
        toNotBeDirectory: function (message) { return exports.FileSystemAssertions.toBeFSType(true, filepath, "directory", message || undefined); },
        toNotBeADirectory: function (message) { return exports.FileSystemAssertions.toBeFSType(true, filepath, "directory", message || undefined); },
        toNotBeFile: function (message) { return exports.FileSystemAssertions.toBeFSType(true, filepath, "file", message || undefined); },
        toNotBeAFile: function (message) { return exports.FileSystemAssertions.toBeFSType(true, filepath, "file", message || undefined); }
    };
    return assertions;
};
//# sourceMappingURL=fs.js.map