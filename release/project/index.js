"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var path = require("path");
var interfaces_1 = require("./interfaces");
var env = require("../env");
var files = require("./files");
exports.files = files;
var templates = require("./templates");
exports.templates = templates;
var _ = require("lodash");
var indexNames = {
    publication: 'PublicationComponents',
    fixture: 'PublicationFixtures',
    criteria: 'PublicationCriterias',
    navigation: 'NavigationComponents',
    structure: 'StructureComponents'
};
var mapIndexType = function (indexName) {
    if ('string' !== typeof indexName)
        return mapIndexType(interfaces_1.IndexTypes[indexName]);
    switch (indexName) {
        case "fixture":
            return interfaces_1.IndexTypes.fixture;
        case "criteria":
            return interfaces_1.IndexTypes.criteria;
        case "navigation":
            return interfaces_1.IndexTypes.navigation;
        case "structure":
            return interfaces_1.IndexTypes.structure;
        case "publication":
        case "component":
            return interfaces_1.IndexTypes.publication;
    }
    return indexName;
};
var nameForType = function (indexType) {
    return interfaces_1.IndexTypes[indexType];
};
exports.buildIndexes = function (args) {
    if (args === void 0) { args = {}; }
    var indexTypes = _.values(interfaces_1.IndexTypes).filter(function (val) {
        if (!isNaN(val))
            return false;
        return (args.filter
            ? args.filter.indexOf(val) > -1
            : true);
    });
    //.map ( (indexTypeName:string) => IndexTypes[indexTypeName] )
    return rxjs_1.Observable.from(indexTypes.map(function (indexType) { return mapIndexType(indexType); }))
        .flatMap(function (indexType) {
        var source = files.filesForIndexType(indexType);
        var indexName = indexNames[nameForType(mapIndexType(indexType))];
        return templates.indexes.mapFilesToTemplateData(indexName, source, env.KIO_PATHS.root)
            .map(function (templateData) {
            return {
                indexName: indexName,
                templateData: templateData
            };
        });
    })
        .flatMap(function (item) { return templates.indexes
        .render(item.indexName, item.templateData)
        .flatMap(function (contents) {
        var indexFileName = path.join(env.KIO_PATHS.root, item.indexName + '.generated.ts');
        return templates.replaceFile(indexFileName, contents).map(function (status) { return ({
            indexFileName: path.relative(env.KIO_PROJECT_ROOT, indexFileName),
            status: status
        }); });
    })
        .map(function (_a, idx) {
        var indexFileName = _a.indexFileName, status = _a.status;
        return indexFileName;
    }); });
};
exports.createComponent = function (args) {
    var name = args.name, contentType = args.contentType, childTypes = args.childTypes, modifiers = args.modifiers;
    var templateData = templates.publicationComponent.mapCLIArgsToTemplateData(args);
    return templates.publicationComponent.render(templateData)
        .flatMap(function (template, idx) {
        var targetFile = path.join(env.KIO_PATHS.components.publication, template.filepath);
        return templates.replaceFile(targetFile, template.content);
    })
        .toArray()
        .flatMap(function (list) {
        return exports.buildIndexes({}).toArray().map(function () { return list; });
    });
};
//# sourceMappingURL=index.js.map