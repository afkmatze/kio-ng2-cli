"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var env = require("../env/constants");
var stringUtils = require("../utils/string");
exports.dataForTemplate = function (publicationComponent) {
    var moduleName = stringUtils.classify(publicationComponent.name);
    var componentName = stringUtils.classify(publicationComponent.name + '-component');
    var parentModuleName = ['kio', 'abstract', publicationComponent.contentType].join('-');
    var parentComponentName = parentModuleName + '.component';
    var parentComponentFilepath = publicationComponent.relativeTo(path.join(env.KIO_PATHS.components.structure, parentModuleName, parentComponentName));
    var data = {
        contentType: publicationComponent.contentType,
        modifiers: publicationComponent.modifiers,
        childTypes: publicationComponent.childTypes,
        styles: publicationComponent.relativeTo(path.join(env.KIO_PROJECT_ROOT, 'src/scss')),
        classifiedParentComponentName: stringUtils.classify(parentModuleName),
        selector: stringUtils.dasherize(['publication', publicationComponent.name].join('-')),
        pathToStructureComponents: publicationComponent.relativeTo(env.KIO_PATHS.components.structure),
        dasherizedParentComponentPath: parentComponentFilepath,
        classifiedModuleName: stringUtils.classify(moduleName),
        dasherizedModuleName: stringUtils.dasherize(moduleName)
    };
    return data;
};
//# sourceMappingURL=template.js.map