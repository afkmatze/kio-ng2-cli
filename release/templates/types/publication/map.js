"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stringUtils = require("../../../utils/string");
var env = require("../../../env");
var path = require("path");
var keys_1 = require("./keys");
exports.mapDataKey = function (key, component) {
    switch (key) {
        case "contentType":
            return component.contentType;
        case "styles":
            return component.relativeTo(path.join(env.KIO_PROJECT_ROOT, 'src', 'scss'));
        case "modifiers":
            return component.modifiers;
        case "childTypes":
            return component.childTypes;
        case "dasherizedModuleName":
            return stringUtils.dasherize(component.name);
        case "classifiedModuleName":
            return stringUtils.classify(component.name);
        case "classifiedParentComponentName":
            return stringUtils.classify(['kio', 'abstract', component.contentType, 'component'].join('-'));
        case "pathToStructureComponents":
            return component.relativeTo(env.KIO_PATHS.components.structure);
        case "dasherizedParentComponentPath":
            return stringUtils.dasherize(['kio', 'abstract', component.contentType].join('-'));
        case "selector":
            return 'publication-' + stringUtils.dasherize(component.name);
        case "dasherizedModuleName":
            return stringUtils.dasherize(component.name);
        default:
            return undefined;
    }
};
exports.mapComponentData = function (componentData) {
    var data = {};
    keys_1.DataKeys.forEach(function (dataKey) {
        data[dataKey] = exports.mapDataKey(dataKey, componentData);
    });
    return data;
};
//# sourceMappingURL=map.js.map