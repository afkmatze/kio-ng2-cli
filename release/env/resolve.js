"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("./path");
exports.isInstalled = function () {
    if (process && process.argv && /\/kio\-ng2$/.test(process.argv[1] || ""))
        return true;
    return false;
};
exports.cliRoot = function () {
    return __dirname.replace(/kio\-ng2\-cli\/.*/, 'kio-ng2-cli');
};
exports.moduleRoot = function () {
    if (process.env.KIO_NG2_PROJECT) {
        return process.env.KIO_NG2_PROJECT;
    }
    var resolvedPath;
    try {
        resolvedPath = require.resolve('./');
    }
    catch (e) { }
    if (exports.isInstalled()) {
        resolvedPath = process.argv[1].replace(/\/node_modules*/gm, '\n').split('\n')[0];
    }
    else if (/test/.test(process.env.NODE_ENV)) {
        resolvedPath = path.resolve(__dirname, '../../test_target');
    }
    else if (!/production/.test(process.env.NODE_ENV)) {
        resolvedPath = process.env.DEV_LATEST || process.env.AFKM_LATEST;
    }
    if (resolvedPath) {
        return path.resolveFull(resolvedPath);
    }
    return path.resolve('./');
};
/**
 * @brief      resolves path in target project
 *
 * @param      projectPath  path to resolve in project
 *
 * @return     resolved path
 */
exports.resolveRoot = function (projectPath) {
    if (path.isAbsolute(projectPath))
        return projectPath;
    return path.resolveFull(path.join(exports.moduleRoot(), projectPath));
};
exports.relative = function (absProjectPath) {
    //if ( !absProjectPath.startsWith(process.env.HOME) )
    var relPath = path.relative(exports.moduleRoot(), path.resolveFull(absProjectPath));
    return relPath;
};
/*export const resolve = ( componentType:string, projectPath?:string ) => {
  if ( !projectPath )
    return resolveKioPath ( componentType )
  return path.join(resolveKioPath(componentType),projectPath)
}*/
exports.resolveProjectPackagePath = function () {
    return exports.resolveRoot('package.json');
};
exports.resolveProjectPackage = function () {
    return require(exports.resolveProjectPackagePath());
};
exports.resolveProjectCache = function () {
    return exports.resolveRoot('.kio-ng2-cache');
};
exports.resolveKioPath = function (pathName) {
    var packageInfo = exports.resolveProjectPackage();
    return packageInfo.kio[pathName || 'root'];
};
exports.resolve = function () {
    var pathNames = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pathNames[_i] = arguments[_i];
    }
    return path.join.apply(path, [exports.moduleRoot()].concat(pathNames));
};
//# sourceMappingURL=resolve.js.map