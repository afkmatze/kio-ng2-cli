"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("./path");
var MACHINE_ROOT = path.resolve('/');
exports.resolveLink = function (filepath) {
    var comps = filepath.split('/');
    var p = MACHINE_ROOT;
    comps.forEach(function (comp) {
    });
};
var isInstalled = function () {
    if (process && process.argv && /\/kio\-ng2$/.test(process.argv[1] || ""))
        return true;
};
var tryResolve = function () {
    var resolvedPath;
    try {
        resolvedPath = require.resolve('./');
    }
    catch (e) { }
    if (isInstalled()) {
        resolvedPath = process.argv[1].replace(/\/node_modules*/gm, '\n').split('\n')[0];
    }
    if (/test|debug/.test(process.env.NODE_ENV)) {
        resolvedPath = process.env.DEV_LATEST || process.env.AFKM_LATEST;
    }
    if (resolvedPath) {
        return path.resolveFull(resolvedPath);
    }
    return path.resolve('./');
};
__export(require("./interfaces"));
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
var resolveRoot = function (projectPath) {
    return path.resolveFull(path.join(exports.KIO_PROJECT_ROOT, projectPath));
};
exports.resolve = function (componentType, projectPath) {
    if (!projectPath)
        return resolveRoot(componentType);
    return path.join(exports.KIO_PATHS.components[componentType], projectPath);
};
exports.relative = function (absProjectPath) {
    //if ( !absProjectPath.startsWith(process.env.HOME) )
    var relPath = path.relative(exports.KIO_PROJECT_ROOT, path.resolveFull(absProjectPath));
    return relPath;
};
exports.KIO_PROJECT_CACHE = exports.resolve('.kio-ng2-cache');
exports.KIO_PATHS = {
    root: resolveRoot(exports.KIO_PROJECT_PACKAGE.kio.root),
    components: {
        publication: resolveRoot(exports.KIO_PROJECT_PACKAGE.kio.components.publication),
        structure: resolveRoot(exports.KIO_PROJECT_PACKAGE.kio.components.structure),
        navigation: resolveRoot(exports.KIO_PROJECT_PACKAGE.kio.components.navigation)
    }
};
exports.TEMPLATES = path.resolve(__dirname, '../../templates');
//# sourceMappingURL=constants.js.map