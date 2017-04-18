"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("./store");
var components_1 = require("./types/components");
exports.createCache = function (cacheType) {
    var cachePath = store_1.ensure(cacheType);
    return components_1.createComponentsCache(cachePath);
};
exports.default = exports.createCache;
//# sourceMappingURL=create.js.map