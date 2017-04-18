"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../../types");
var resolveTarget_1 = require("../../resolveTarget");
var files_1 = require("../../files");
exports.DataKeys = [
    "contentType",
    "styles",
    "modifiers",
    "childTypes",
    "dasherizedModuleName",
    "classifiedModuleName",
    "classifiedParentComponentName",
    "pathToStructureComponents",
    "dasherizedParentComponentPath",
    "selector",
    "dasherizedModuleName"
];
exports.createTemplateSource = function (name, files) {
    var type = types_1.Types[name];
    return {
        name: name,
        files: files || files_1.findTemplateSourceFiles(name)
    };
};
exports.createTemplateByName = function (templateName) {
    var type = types_1.Types[templateName];
    var template = {
        source: exports.createTemplateSource(templateName),
        targetRoot: resolveTarget_1.resolveTargetWithName(templateName),
        name: 'publication'
    };
    return template;
};
exports.createTemplate = function (source, data, targetRoot) {
    var template = {
        source: source,
        data: data,
        targetRoot: targetRoot
    };
    return template;
};
//# sourceMappingURL=create.js.map