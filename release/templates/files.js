"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env = require("../env");
var rxfs = require("../utils/rx/fs");
var shelljs_1 = require("shelljs");
exports.findTemplateSourceFiles = function (templateName) {
    var templateRoot = env.path.join(env.TEMPLATES, templateName);
    return shelljs_1.find(templateRoot)
        .filter(function (item) { return !!env.path.extname(item); })
        .map(function (item) {
        return {
            filename: env.path.relative(templateRoot, item),
            absoluteFilepath: item
        };
    });
};
exports.templateFiles = function (templateName, mapper) {
    var templateRoot = env.path.resolve(env.TEMPLATES, templateName);
    return rxfs.findFiles(templateRoot, /.+\.*$/)
        .filter(function (filename) { return !!env.path.extname(filename); })
        .flatMap(function (filename) { return rxfs.readFile(filename, 'utf8').map(function (source) { return ({
        source: source,
        filename: env.path.relative(templateRoot, filename),
        absoluteFilepath: filename
    }); }); })
        .map(function (file) {
        return mapper ? mapper(file) : file;
    });
};
//# sourceMappingURL=files.js.map