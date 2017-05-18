"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("./path");
var fs = require("fs");
var folder_settings_1 = require("./folder-settings");
var logger = require("../console");
var debug = logger.createDebugger();
exports.isInstalled = function () {
    if (process && process.argv && /\/kio\-ng2$/.test(process.argv[1] || ""))
        return true;
    return false;
};
exports.cliRoot = function () {
    return __dirname.replace(/kio\-ng2\-cli\/.*/, 'kio-ng2-cli');
};
var __moduleRoot;
exports.moduleRoot = function () {
    if (__moduleRoot)
        return __moduleRoot;
    if (process.env.KIO_NG2_PROJECT) {
        debug('Use project path from environment variable KIO_NG2_PROJECT: "%s"', process.env.KIO_NG2_PROJECT);
        __moduleRoot = process.env.KIO_NG2_PROJECT;
        return __moduleRoot;
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
        resolvedPath = path.resolveFull(resolvedPath);
    }
    else {
        resolvedPath = path.resolve('./');
    }
    debug('resolve module root: %s', resolvedPath);
    __moduleRoot = resolvedPath;
    return resolvedPath;
};
exports.isProjectEnv = function () {
    var __env_path;
    try {
        __env_path = exports.resolveProjectPackage();
    }
    catch (e) { }
    return !!__env_path;
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
    return path.resolve(path.join(exports.moduleRoot(), projectPath));
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
var projectPackage;
exports.resolveProjectPackage = function () {
    if (!projectPackage) {
        var packagePath = exports.resolveProjectPackagePath();
        debug('package path: %s', packagePath);
        var json = fs.readFileSync(packagePath, 'utf8');
        debug('json:', json);
        projectPackage = JSON.parse(json) || require('./' + packagePath);
        debug('package key config: ', projectPackage.kio);
    }
    return projectPackage;
};
exports.resolveProjectCache = function () {
    return exports.resolveRoot('.kio-ng2-cache');
};
exports.resolveKioPathSettings = function (pathName) {
    var packageInfo = exports.resolveProjectPackage();
    var folder = (pathName && pathName !== 'root') ? packageInfo.kio.components[pathName] : packageInfo.kio.root;
    if (folder) {
        return folder_settings_1.folderSettings(folder);
    }
    throw Error("Config prop \"" + pathName + "\" could not be found in kio settings of project package.\n(" + exports.resolveProjectPackagePath() + ")");
};
exports.resolveKioPath = function (pathName) {
    var kioPath = exports.resolveKioPathSettings(pathName);
    if (kioPath) {
        return kioPath.path;
    }
};
exports.resolve = function () {
    var pathNames = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pathNames[_i] = arguments[_i];
    }
    return path.join.apply(path, [exports.moduleRoot()].concat(pathNames));
};
//# sourceMappingURL=resolve.js.map