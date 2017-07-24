"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var path = require("path");
var interfaces_1 = require("./interfaces");
var env = require("../env");
var files = require("./files");
var templates = require("./templates");
var _ = require("lodash");
var logger = require("../console");
var debug = logger.createDebugger();
exports.buildIndexes = function (projectPath) { return function (args) {
    if (args === void 0) { args = {}; }
    var indexTypes = _.values(interfaces_1.IndexTypes).filter(function (val) {
        if (!isNaN(val))
            return false;
        return (args.filter
            ? args.filter.indexOf(val) > -1
            : true);
    });
    //.map ( (indexTypeName:string) => IndexTypes[indexTypeName] )
    var targetPath = env.resolve(env.resolveKioPath('root'), 'publication');
    debug('build index module at %s', targetPath);
    return rxjs_1.Observable.of(interfaces_1.IndexTypes.publication)
        .flatMap(function (indexType) {
        debug('indexType: ', interfaces_1.IndexTypes[indexType]);
        var source = files.filesForIndexType(projectPath)(indexType).map(function (row, idx) {
            debug('source file #%s: %s', idx, path.relative(process.cwd(), row));
            return row;
        });
        var indexName = "PublicationComponents";
        return templates.indexes.mapFilesToTemplateData(indexName, source, targetPath)
            .map(function (templateData, idx) {
            debug('templateData indexName', idx, indexName);
            return {
                indexName: indexName,
                templateData: templateData
            };
        });
    })
        .flatMap(function (item) { return templates.indexes
        .render(item.indexName, item.templateData)
        .flatMap(function (contents) {
        var indexFileName = env.resolve(env.resolveKioPath('root'), 'publication', item.indexName + '.generated.ts');
        return templates.replaceFile(indexFileName, contents).map(function (status) { return ({
            indexFileName: path.relative(env.resolveRoot('.'), indexFileName),
            status: status
        }); });
    })
        .map(function (_a, idx) {
        var indexFileName = _a.indexFileName, status = _a.status;
        return indexFileName;
    }); });
}; };
exports.default = function (projectPath) { return ({
    buildIndexes: exports.buildIndexes(projectPath)
}); };
//# sourceMappingURL=buildModule.js.map