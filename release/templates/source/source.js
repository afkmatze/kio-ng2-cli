"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types");
var resolveTarget_1 = require("../resolveTarget");
var files_1 = require("../files");
var index = require("./index.source");
var publication = require("./publication.source");
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
        targetRoot: resolveTarget_1.resolveTargetWithName(templateName)
    };
    return template;
};
exports.createTemplate = function (source, data, targetRoot) {
    if (data.type === "publication")
        return publication.createTemplate(source, data, targetRoot);
    else if (data.type === "index")
        return index.createTemplate(source, data, targetRoot);
};
//# sourceMappingURL=source.js.map