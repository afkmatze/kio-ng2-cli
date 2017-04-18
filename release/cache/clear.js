"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("./store");
var logger = require("../console");
var shelljs_1 = require("shelljs");
exports.clearCache = function (cacheName) {
    var cachePath = store_1.resolve(cacheName || '');
    logger.debug('clear cache', cachePath);
    shelljs_1.rm('-rf', cachePath);
};
exports.default = exports.clearCache;
//# sourceMappingURL=clear.js.map