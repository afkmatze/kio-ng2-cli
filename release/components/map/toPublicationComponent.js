"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var env = require("../../env/constants");
var stringUtils = require("../../utils/string");
var STYLES = path.join(env.KIO_PROJECT_ROOT, env.KIO_PATHS.root, 'scss');
exports.mapComponent = function (component) {
    return {
        styles: '../' + path.relative(component.dir, STYLES),
        contentType: component.contentType,
        modifiers: component.modifiers,
        childTypes: component.childTypes,
        joinedChildTypes: component.childTypes.map(function (ct) { return "'" + ct + "'"; }).join(','),
        dasherizedModuleName: stringUtils.dasherize(component.name),
        classifiedModuleName: stringUtils.classify(component.name),
        pathToStructureComponents: path.relative(component.dir, env.KIO_PATHS.components.structure),
        classifiedParentComponentName: stringUtils.classify(['kio', 'abstract', component.contentType, 'component'].join('-')),
        selector: stringUtils.dasherize(['publication', component.name].join('-')),
        dasherizedParentComponentPath: stringUtils.dasherize(stringUtils.classify(['kio', 'abstract', component.contentType].join('-'))),
        dasherizedParentComponentName: stringUtils.dasherize(stringUtils.classify(['kio', 'abstract', component.contentType].join('-')))
    };
};
//# sourceMappingURL=toPublicationComponent.js.map