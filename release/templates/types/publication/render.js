"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var ejs = require("ejs");
exports.renderTemplateFileWithData = function (templateFile, data) {
    var source = rxjs_1.Observable.of(templateFile.source.toString());
    return source
        .map(function (templateSource) { return ejs.render(templateSource, data); });
};
//# sourceMappingURL=render.js.map