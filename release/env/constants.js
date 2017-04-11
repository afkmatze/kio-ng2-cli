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
exports.KIO_PROJECT_PACKAGE = require(path.join(exports.KIO_PROJECT_ROOT, 'package.json'));
exports.KIO_PATHS = exports.KIO_PROJECT_PACKAGE.kio;
//# sourceMappingURL=constants.js.map