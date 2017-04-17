"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("./store");
var components_1 = require("./types/components");
var isJSON = function (filename) { return /\.json$/i.test(filename); };
exports.readCache = function (cacheType) {
    var pathNames = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        pathNames[_i - 1] = arguments[_i];
    }
    var cachePath = store_1.ensure.apply(void 0, [cacheType].concat(pathNames));
    return components_1.readComponentsCache(cachePath);
};
exports.cachedComponents = function () { return components_1.Components(); };
//# sourceMappingURL=read.js.map