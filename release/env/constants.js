"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var tryResolve = function () {
    var resolvedPath;
    try {
        resolvedPath = require.resolve('./');
    }
    catch (e) { }
    if (process.env.NODE_ENV === 'debug') {
        resolvedPath = process.env.DEV_LATEST;
    }
    if (resolvedPath) {
        return resolvedPath;
    }
    return path.resolve('./');
};
// target project root directory
exports.KIO_PROJECT_ROOT = tryResolve();
// content of target project`s package.json
exports.KIO_PROJECT_PACKAGE = require(path.join(exports.KIO_PROJECT_ROOT, 'package.json'));
/**
 * @brief      resolves path in target project
 *
 * @param      projectPath  path to resolve in project
 *
 * @return     resolved path
 */
exports.resolve = function (projectPath) {
    return path.resolve(path.join(exports.KIO_PROJECT_ROOT, projectPath));
};
exports.KIO_PROJECT_CACHE = exports.resolve('.kio-ng2-cache');
exports.KIO_PATHS = {
    root: exports.resolve(exports.KIO_PROJECT_PACKAGE.kio.root),
    components: {
        publication: exports.resolve(exports.KIO_PROJECT_PACKAGE.kio.components.publication),
        structure: exports.resolve(exports.KIO_PROJECT_PACKAGE.kio.components.structure),
        navigation: exports.resolve(exports.KIO_PROJECT_PACKAGE.kio.components.navigation)
    }
};
exports.TEMPLATES = path.resolve(__dirname, '../../templates');
//# sourceMappingURL=constants.js.map