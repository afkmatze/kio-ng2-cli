"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shelljs_1 = require("shelljs");
var constants_1 = require("../env/constants");
var path = require("path");
var resolveTemplate = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return path.join.apply(path, [constants_1.TEMPLATES].concat(args));
};
exports.getFiles = function (templateName) {
    var files = shelljs_1.find(resolveTemplate(templateName)).filter(function (item) { return !!path.extname(item); }).map(function (item) {
        return {
            filename: item
        };
    });
    return files;
};
exports.readTemplateFile = function (templateFiles, templateFile) {
    if (!path.isAbsolute(templateFile.filename))
        templateFile.filename = resolveTemplate(templateFiles.templateName, templateFile.filename);
    templateFile.source = shelljs_1.cat(templateFile.filename);
};
exports.readFile = function (templateName, templateFile) {
    if (!path.isAbsolute(templateFile))
        templateFile = resolveTemplate(templateName, templateFile);
    return shelljs_1.cat(templateFile);
};
//# sourceMappingURL=read.js.map