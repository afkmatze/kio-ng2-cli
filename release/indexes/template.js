"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("./interfaces");
var stringUtils = require("../utils/string");
var env = require("../env/constants");
var path = require("path");
// TODO: map fixture and criteria
var mapIndexNameToFileType = new Map();
mapIndexNameToFileType.set(interfaces_1.IndexType.fixture, "fixture");
mapIndexNameToFileType.set(interfaces_1.IndexType.criteria, "criteria");
mapIndexNameToFileType.set(interfaces_1.IndexType.publication, "component");
mapIndexNameToFileType.set(interfaces_1.IndexType.navigation, "component");
mapIndexNameToFileType.set(interfaces_1.IndexType.structure, "component");
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
        source: undefined,
        targetRoot: undefined,
        indexItems: componentIndex.components.map(mapComponentToComponentImport(mapIndexNameToFileType.get(componentIndex.indexType)))
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