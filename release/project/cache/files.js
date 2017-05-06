"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxfs = require("rxfs");
var path = require("path");
var rxjs_1 = require("rxjs");
exports.cache = function (projectEnv) {
    var componentsCacheRoot = path.join(projectEnv.KIO_PROJECT_CACHE, 'components');
    var list = function () {
        return rxfs.find(['-type', 'file'], componentsCacheRoot)
            .map(function (streamData) { return streamData.stdout.toString('utf8'); })
            .filter(function (filepath) { return /\.json$/.test(filepath); })
            .map(function (filename) { return './' + path.relative(componentsCacheRoot, filename); });
    };
    var readFile = function (filepath) {
        var fullFilepath = path.join(componentsCacheRoot, filepath);
        return rxfs.readFile(fullFilepath, 'utf8').toArray().map(function (contents) {
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