"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env = require("../env");
var shelljs_1 = require("shelljs");
exports.getTemplateFiles = function (template) {
    if ('string' === typeof template) {
        return shelljs_1.find(env.path.join(env.TEMPLATES, template))
            .filter(function (filepath) { return !!env.path.extname(filepath); })
            .map(function (filepath) {
            var relfilepath = env.path.relative(env.TEMPLATES, filepath);
            return {
                filename: relfilepath
            };
        });
    }
    return exports.getTemplateFiles(template.templateName);
};
exports.readTemplateFile = function (template, templateFile) {
    templateFile.source = shelljs_1.cat(env.path.resolve(env.TEMPLATES, templateFile.filename)).toString();
    return templateFile;
};
//# sourceMappingURL=files.js.map