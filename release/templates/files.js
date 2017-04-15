"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env = require("../env");
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
//# sourceMappingURL=files.js.map