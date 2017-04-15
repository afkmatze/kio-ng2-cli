"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shelljs = require("shelljs");
var path = require("path");
var ejs = require("ejs");
var fs = require("fs");
var types_1 = require("./types");
var logger = require("../console");
var create_1 = require("./create");
exports.readTemplateFile = function (templateFile) {
    return fs.readFileSync(templateFile.absoluteFilepath, 'utf8');
};
exports.renderTemplateFile = function (templateFile, templateData) {
    var source = exports.readTemplateFile(templateFile);
    logger.log('writing to "%s"', templateFile.filename, '\n', source);
    return ejs.render(source, templateData);
};
exports.renderTemplateSource = function (source, data, targetRoot) {
    var template = create_1.createTemplate(source, data, targetRoot);
    return exports.renderTemplate(template);
};
exports.renderTemplate = function (template) {
    var type = types_1.Types[template.source.name];
    logger.log('template.targetRoot: %s', template.targetRoot);
    template.source.files.forEach(function (sourceFile) {
        var targetFile = type.mapTemplateFile(sourceFile, template.data, template.targetRoot);
        var content = exports.renderTemplateFile(sourceFile, template.data);
        shelljs.mkdir('-p', path.dirname(targetFile.absoluteFilepath));
        fs.writeFileSync(targetFile.absoluteFilepath, content, 'utf8');
    });
};
//# sourceMappingURL=render.js.map