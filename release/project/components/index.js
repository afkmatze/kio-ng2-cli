"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kio_ng2_data_1 = require("kio-ng2-data");
var rxjs_1 = require("rxjs");
var env = require("../../env");
var path = require("path");
var rxfs_1 = require("rxfs");
var templates = require("../templates");
var string_1 = require("../../utils/string");
exports.isNamedFragmentComponentStructure = function (other) {
    return ('modifiers' in other
        &&
            'childTypes' in other);
};
exports.pathForNamedComponent = function (type, name) {
    if ('string' === typeof type)
        return exports.pathForNamedComponent(kio_ng2_data_1.KioNodeType[type], name);
    return path.join(kio_ng2_data_1.KioNodeType[type], string_1.dasherize(name));
};
exports.dataForNamedFragmentComponent = function (pathToStructureComponents, namedComponent) {
    var contentType = kio_ng2_data_1.KioNodeType[kio_ng2_data_1.KioNodeType.fragment];
    return {
        name: namedComponent.name,
        styles: '../../../',
        contentType: contentType,
        type: kio_ng2_data_1.KioNodeType.fragment,
        selector: 'kio-' + string_1.dasherize(namedComponent.name),
        modifiers: namedComponent.modifiers,
        childTypes: namedComponent.childTypes,
        classifiedModuleName: string_1.classify(namedComponent.name),
        dasherizedModuleName: string_1.dasherize(namedComponent.name),
        classifiedParentComponentName: string_1.classify(contentType + '-component'),
        pathToStructureComponents: pathToStructureComponents
    };
};
exports.dataForNamedComponent = function (pathToStructureComponents, namedComponent) {
    var nodeType = kio_ng2_data_1.KioNodeType[namedComponent.type];
    if (!kio_ng2_data_1.isChildContentType(nodeType))
        return undefined;
    var contentType = nodeType;
    var contentTypeName = kio_ng2_data_1.KioNodeType[contentType];
    return {
        name: namedComponent.name,
        type: contentType,
        contentType: contentTypeName,
        styles: '../../../',
        selector: 'kio-' + string_1.dasherize(namedComponent.name),
        modifiers: namedComponent.modifiers,
        childTypes: [],
        classifiedModuleName: string_1.classify(namedComponent.name),
        dasherizedModuleName: string_1.dasherize(namedComponent.name),
        classifiedParentComponentName: string_1.classify(contentType + '-content-component'),
        pathToStructureComponents: pathToStructureComponents
    };
};
exports.resolveComponentPath = function (namedComponent, targetRoot) {
    if (targetRoot === void 0) { targetRoot = env.moduleRoot(); }
    var kioPath = env.resolveKioPath('publication');
    var componentPath = exports.pathForNamedComponent(namedComponent.type, namedComponent.name);
    return path.join(targetRoot, kioPath, componentPath);
};
exports.namedComponentExists = function (namedComponent) {
    var publicationPath = exports.resolveComponentPath(namedComponent);
    return rxfs_1.existsSync(publicationPath);
};
exports.writeComponent = function (componentData, targetRoot) {
    var kioPath = env.resolveKioPath('publication');
    //console.log('kioPath',kioPath)
    //console.log('targetRoot',targetRoot)
    var componentPath = exports.pathForNamedComponent(componentData.type, componentData.name);
    //console.log('componentPath',componentPath)
    var targetFolder = path.join(targetRoot, kioPath, componentPath);
    //console.log('targetFolder',targetFolder)
    var targetName = string_1.dasherize(componentData.name);
    return rxfs_1.exists(targetFolder).switchMap(function (exists) {
        return exists
            ? rxjs_1.Observable.empty()
            : rxfs_1.mkdir(targetFolder).flatMap(function () {
                return templates.publicationComponent.render(componentData).flatMap(function (info) {
                    var content = info.content;
                    var filepath = path.join(targetRoot, kioPath, info.filepath);
                    console.log('write file', filepath);
                    return rxfs_1.writeFile(filepath, rxjs_1.Observable.of(new Buffer(content)), 'utf8');
                }).toArray().map(function () { return targetFolder; })
                    .catch(function (error) {
                    console.error(error);
                    return rxjs_1.Observable.throw(error);
                });
            });
    });
};
//# sourceMappingURL=index.js.map