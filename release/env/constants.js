"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var tryResolve = function () {
    var resolvedPath;
    try {
        resolvedPath = require.resolve('./');
    }
    catch (e) { }
    if (resolvedPath) {
        return resolvedPath;
    }
    return path.resolve('./');
};
exports.KIO_PROJECT_ROOT = tryResolve();
//# sourceMappingURL=constants.js.map