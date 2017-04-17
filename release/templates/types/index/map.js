"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolveTarget_1 = require("../../resolveTarget");
var path = require("path");
exports.mapTemplateData = function (indexData) {
    var data = {
        source: undefined,
        targetRoot: resolveTarget_1.resolveTargetWithName("index"),
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
    console.log('index template file', file.filename);
    return {
        filename: file.filename,
        absoluteFilepath: path.join(root, file.filename)
    };
};
//# sourceMappingURL=map.js.map