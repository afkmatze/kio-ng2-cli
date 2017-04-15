"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var shelljs = require("shelljs");
var env = require("../../env");
exports.readTemplateFiles = function (templateName) {
    var root = path.join(env.TEMPLATES, templateName);
    return shelljs.find(root + '/*.*');
};
//# sourceMappingURL=common.js.map