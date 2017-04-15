"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env = require("../../../env");
exports.DataKeys = [
    "indexItems",
    "exportName"
];
exports.IndexMap = new Map();
var defaultMapper = function (key, indexData) {
    return indexData[key];
};
var addIndexMap = function (indexName) {
    var indexMap = function (key, indexData) {
        var capName = indexName.substr(0, 1).toUpperCase() + indexName.slice(1);
        switch (key) {
            case "indexItems":
                return indexData.components.map(function (component) { return ({
                    importName: capName,
                    importAlias: component.name,
                    importPath: component.relativeFrom(env.KIO_PATHS.root)
                }); });
            case "exportName":
                return capName + 's';
        }
    };
    exports.IndexMap.set(indexName, indexMap);
};
addIndexMap('navigation');
addIndexMap('structure');
addIndexMap('publication');
addIndexMap('criteria');
addIndexMap('fixture');
exports.mapDataKey = function (key, indexData) {
    var mapper = exports.IndexMap.get(indexData.name);
    if (mapper) {
        return mapper(key, indexData);
    }
    return undefined;
};
exports.mapComponentData = function (componentData) {
    var data = {};
    exports.DataKeys.forEach(function (dataKey) {
        data[dataKey] = exports.mapDataKey(dataKey, componentData);
    });
    return data;
};
//# sourceMappingURL=map.js.map