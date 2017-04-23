"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxfs = require("../../utils/rx/fs");
var path = require("path");
var rxjs_1 = require("rxjs");
exports.cache = function (projectEnv) {
    var componentsCacheRoot = path.join(projectEnv.KIO_PROJECT_CACHE, 'components');
    var list = function () {
        return rxfs.findFiles(componentsCacheRoot, /\.json$/)
            .map(function (filename) { return './' + path.relative(componentsCacheRoot, filename); });
    };
    var readFile = function (filepath) {
        var fullFilepath = path.join(componentsCacheRoot, filepath);
        return rxfs.readfileFull(fullFilepath).toArray().map(function (contents) {
            return JSON.parse(contents.join('\n'));
        })
            .catch(function (error, caught) {
            var msg = "failed reading cache from \"" + fullFilepath + "\"";
            return rxjs_1.Observable.throw(msg);
        });
    };
    return {
        list: list,
        readFile: readFile
    };
};
//# sourceMappingURL=files.js.map