"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var env = require("../../env/constants");
var shelljs = require("shelljs");
var path = require("path");
//const STRUCTURE_COMPS = path.join(env.KIO_PROJECT_ROOT,env.KIO_PATHS.components.structure)
//const PUBLICATION_COMPS = path.join(env.KIO_PROJECT_ROOT,env.KIO_PATHS.components.publication)
__export(require("./yargs"));
var DEFAULT_PATTERN = /.*/;
var findFiles = function (sourcePath, pattern) {
    if (sourcePath === void 0) { sourcePath = env.KIO_PATHS.root; }
    if (pattern === void 0) { pattern = DEFAULT_PATTERN; }
    var patternExp = (function () {
        if ('string' === typeof pattern) {
            return new RegExp(pattern);
        }
        return pattern;
    })();
    return shelljs.find(path.join(env.KIO_PROJECT_ROOT, sourcePath)).filter(function (filename) { return filename.match(patternExp); });
};
exports.readExports = function (filepath) {
    //return ts.preProcessFile(shelljs.cat(filepath),true)
    var rg = /export\ (\w+) (\w+)/g;
    return shelljs.cat(filepath).match(rg) || [];
};
exports.main = function (env) {
    var allFiles = findFiles(env.KIO_PATHS.components.structure, /\.ts$/);
    var allExports = allFiles.map(function (file) {
        //console.log('read file',file)
        return {
            file: file,
            exports: exports.readExports(file).map(function (val) { return val.split(' ').pop(); })
        };
    }).filter(function (a) { return a.exports.length > 0; });
    allExports.forEach(function (item) {
        console.log('import { %s } from "./%s"', item.exports, path.relative(env.KIO_PATHS.root, item.file));
    });
};
//# sourceMappingURL=index.js.map