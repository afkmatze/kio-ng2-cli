"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolveTarget_1 = require("../../resolveTarget");
var path = require("path");
exports.mapTemplateData = function (indexData) {
    var data = {
        exportName: indexData.name,
        indexItems: indexData.components.map(function (comp) {
            return {
                importName: comp.name,
                importPath: comp.relativeFrom(resolveTarget_1.resolveTargetWithName("index"))
            };
        })
    };
    return data;
};
exports.mapTemplateFile = function (file, data) {
    var root = file.absoluteFilepath.replace(file.filename, '');
    var filename = file.filename.replace(/\_\_(\w+)\_\_/gm, function (src, key) {
        if (key === 'path')
            return data.dasherizedComponentName;
        if (key === 'name')
            return data.dasherizedComponentName;
        return src;
    });
    return {
        filename: filename,
        absoluteFilepath: path.join(root, filename)
    };
};
//# sourceMappingURL=map.js.map