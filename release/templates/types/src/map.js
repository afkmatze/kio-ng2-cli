"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var common_publication_1 = require("../common.publication");
exports.mapComponentData = common_publication_1.mapComponentData;
/*
export const mapComponentData = ( indexData:PublicationComponent ):PublicationComponentTemplateData => {
  const data:PublicationComponentTemplateData = {
    exportName: indexData.name
  }
  return data
}*/
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
exports.default = common_publication_1.mapComponentData;
//# sourceMappingURL=map.js.map