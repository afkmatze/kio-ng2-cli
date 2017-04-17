"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var env_1 = require("../../../env");
var rxfs = require("../../../utils/rx/fs");
var ejs = require("ejs");
exports.renderFilesIndex = function (data) {
    var sourceFilepath = env_1.path.join(env_1.TEMPLATES, 'index', 'ComponentIndex.ts');
    return rxfs.readfile(sourceFilepath, true).map(function (content) {
        return ejs.render(content, data);
    });
};
exports.renderTemplateFileWithData = function (templateFile, data) {
    var source = rxjs_1.Observable.of(templateFile.source.toString());
    return source.map(function (templateSource) { return ejs.render(templateSource, data); });
};
//# sourceMappingURL=render.js.map