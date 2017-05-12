"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var path = require("path");
var env = require("../../env");
var rxfs = require("rxfs");
var stringUtils = require("../../utils/string");
__export(require("./Runner.class"));
var Runner_class_1 = require("./Runner.class");
var templates = require("../templates");
var files = require("../files");
var runner = new Runner_class_1.TestRunner();
exports.default = runner;
exports.renderTests = function (targetFilename) {
    return files.publicationComponents()
        .map(function (componentFilepath) { return path.basename(componentFilepath, '.component.ts'); })
        .map(stringUtils.classify)
        .toArray()
        .flatMap(function (componentNames) {
        var targetFilepath = path.resolve(targetFilename);
        var targetDir = path.resolve(path.dirname(targetFilename));
        return templates
            .renderTemplateWithData('test', {
            pathToKioIndexes: './' + path.relative(targetDir, env.resolve(env.resolveKioPath('root'))),
            componentNames: componentNames
        })
            .flatMap(function (_a) {
            var file = _a.file, content = _a.content;
            return rxfs.writeFile(targetFilepath, rxjs_1.Observable.of(new Buffer(content))).map(function () { return path.relative(process.cwd(), targetFilepath); });
        });
    }, 1);
};
exports.execTestAt = function (specFilename) {
    var specDirpath = path.dirname(specFilename);
    var command = "ts-node \"./" + path.basename(specFilename) + "\"";
    return rxfs.exec(command, {
        cwd: specDirpath
    })
        .map(function (row, idx) {
        console.log('<------------------------------------------------');
        console.log('- row: %s ', idx);
        console.log('-------------------------------------------------');
        console.log(row);
        console.log('------------------------------------------------->');
        return row;
    });
};
//# sourceMappingURL=index.js.map