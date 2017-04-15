"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stringUtils = require("../utils/string");
var env = require("../env/constants");
var path = require("path");
// TODO: map fixture and criteria
var mapIndexNameToFileType = new Map();
mapIndexNameToFileType.set("fixture", "fixture");
mapIndexNameToFileType.set("criteria", "criteria");
mapIndexNameToFileType.set("publication", "component");
mapIndexNameToFileType.set("navigation", "component");
mapIndexNameToFileType.set("structure", "component");
var mapComponentToComponentImport = function (fileType) { return function (component) {
    var filePath = component.getFile(fileType);
    var componentImport = {
        importName: component.name + 'Component',
        importPath: './' + path.relative(env.KIO_PATHS.root, component.getFile(fileType)).replace(/\.\w+$/, '')
    };
    return componentImport;
}; };
exports.dataForIndex = function (componentIndex) {
    //console.log('dataForIndex',componentIndex)
    var data = {
        exportName: stringUtils.classify([componentIndex.name, 'components'].join('-')),
        components: componentIndex.components.map(mapComponentToComponentImport(mapIndexNameToFileType.get(componentIndex.name)))
    };
    if (componentIndex.name === "fixture") {
        data.components.forEach(function (component) {
            component.importAlias = 'Fixture';
        });
        data.exportName = 'Fixtures';
    }
    else if (componentIndex.name === "criteria") {
        data.components.forEach(function (component) {
            component.importAlias = 'Criteria';
        });
        data.exportName = 'Criterias';
    }
    return data;
};
//# sourceMappingURL=template.js.map