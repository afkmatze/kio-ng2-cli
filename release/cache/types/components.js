"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var path = require("path");
var rxfs = require("../../utils/rx/fs");
var fs = require("fs");
var env = require("../../env");
var shelljs_1 = require("shelljs");
var store_1 = require("../store");
var logger = require("../../console");
var components_1 = require("../../components");
var componentTypeNames = ['publication', 'structure', 'navigation'];
var writeToFile = function (filename, data) { return new Promise(function (resolve, reject) {
    fs.writeFile(filename, data, 'utf8', function (error) {
        error ? reject(error) : resolve();
    });
}); };
var cacheComponent = function (component, targetDir) {
    var data = component.toJSON();
    var targetPath = path.join(targetDir, component.name + '.json');
    logger.debug('write component %s to "%s"', component, targetPath);
    return writeToFile(targetPath, JSON.stringify(data, null, '\t')).then(function () { return targetPath; });
};
var cacheComponents = function (targetDir, typeName) { return Promise.all(components_1.findComponents(typeName).map(function (component) { return cacheComponent(component, targetDir); })); };
var isJSON = function (filename) { return /\.json$/i.test(filename); };
exports.readCache = function (targetDir) {
    var pathname = !path.isAbsolute(targetDir) ? store_1.resolve(targetDir) : targetDir;
    return shelljs_1.find(pathname)
        .filter(isJSON)
        .map(function (filename) { return shelljs_1.cat(filename); })
        .map(function (json) { return JSON.parse(json); });
};
exports.createComponentsCache = function (targetDir) {
    return Promise.all(componentTypeNames.map(function (componentType) { return cacheComponents(store_1.ensure("components", componentType), componentType); })).then(function (results) {
        return results.reduce(function (prev, cur) { return prev.concat(cur); });
    });
};
exports.readComponentsCache = function (targetDir) {
    return exports.readCache(targetDir)
        .map(function (data) { return components_1.createWithData(data); });
};
var readJSON = function (filepath) {
    return rxjs_1.Observable.fromPromise(new Promise(function (resolve, reject) {
        fs.readFile(filepath, 'utf8', function (error, result) {
            error ? reject(error) : resolve(result);
        });
    }).then(JSON.parse), rxjs_1.Scheduler.async);
};
exports.Components = function () { return rxfs.readdir(path.join(env.KIO_PROJECT_CACHE, 'components'))
    .filter(function (filename) { return path.extname(filename) === '.json'; })
    .flatMap(function (filename) { return readJSON(filename); }, 1).concat().map(function (data) { return components_1.createWithData(data); }); };
exports.default = exports.createComponentsCache;
//# sourceMappingURL=components.js.map