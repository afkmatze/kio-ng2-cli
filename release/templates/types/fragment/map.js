"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var common_publication_1 = require("../common.publication");
exports.mapComponentData = common_publication_1.mapComponentData;
exports.mapComponentDataKey = function (key, component) {
    switch (key) {
        case "contentType":
            return component.contentType;
        default:
            return common_publication_1.mapComponentDataKey(key, component);
    }
};
exports.mapTemplateFile = function (file, data, replaceRoot) {
    var root = file.absoluteFilepath.replace(file.filename, '');
    var filename = file.filename.replace(/\_\_(\w+)\_\_/gm, function (src, key) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (key === 'path')
            return data.dasherizedComponentName;
        if (key === 'name')
            return data.dasherizedComponentName;
        return src;
    });
    return {
        filename: filename,
        absoluteFilepath: path.join(replaceRoot ? replaceRoot : root, filename)
    };
};
exports.default = common_publication_1.mapComponentData;
//# sourceMappingURL=map.js.map