"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxfs = require("../../../utils/rx/fs");
var path = require("path");
var ejs = require("ejs");
var string_1 = require("../../../utils/string");
var rxjs_1 = require("rxjs");
var TEMPLATE_DIR = path.resolve(__dirname, '../../../../templates/index');
exports.mapTemplateData = function (component, relativeTo) {
    var item = {
        importName: string_1.classify(component.name),
        importPath: './' + path.relative(relativeTo, component.dir)
    };
    return item;
};
exports.mapFilesToTemplateData = function (exportName, files, relativeTo) {
    return files.map(function (file) { return exports.mapFileToTemplateDataItem(file, relativeTo); })
        .toArray().map(function (files) { return ({
        exportName: exportName,
        indexItems: files
    }); });
};
exports.mapFileToTemplateDataItem = function (filepath, relativeTo) {
    var componentBaseName = path.basename(filepath, '.ts').split('.component').join('');
    var _a = componentBaseName.split('.') || [], _b = _a[0], componentName = _b === void 0 ? '' : _b, _c = _a[1], typeName = _c === void 0 ? '' : _c;
    if (!componentName) {
        throw Error('Invalid component name at "' + filepath + '".');
    }
    var item = {
        importName: string_1.classify(componentName),
        importPath: './' + path.relative(relativeTo, filepath).replace(/\.ts$/, '')
    };
    if (!typeName) {
        item.importName += 'Component';
    }
    else if (typeName === 'fixture') {
        item.importAlias = 'Fixture';
    }
    else if (typeName === 'criteria') {
        item.importAlias = 'Criteria';
    }
    return item;
};
exports.render = function (indexName, data) {
    return rxfs.readfile(path.join(TEMPLATE_DIR, 'ComponentIndex.ts'), true)
        .flatMap(function (contents) {
        return rxjs_1.Observable.of(ejs.render(contents.toString(), data));
    });
};
//# sourceMappingURL=render.js.map