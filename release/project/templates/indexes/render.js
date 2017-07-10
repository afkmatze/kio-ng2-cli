"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxfs = require("rxfs");
var path = require("path");
var ejs = require("ejs");
var string_1 = require("../../../utils/string");
var rxjs_1 = require("rxjs");
var TEMPLATE_DIR = path.resolve(__dirname, '../../../../templates/index');
exports.render = function (indexName, data) {
    return rxfs
        .readFile(path.join(TEMPLATE_DIR, 'ComponentIndex.ts'), 'utf8')
        .toArray().map(function (rows) { return rows.join('\n'); })
        .flatMap(function (contents) {
        //console.log('render(%s)\n-----\n\x1b[2m', indexName, contents,'\n-----\x1b[0m')
        //console.log(data)
        return rxjs_1.Observable.of(ejs.render(contents, data));
    }).map(function (contents) {
        //console.log('contents\n----\n',contents,'\n----\n')
        return contents;
    });
};
exports.mapTemplateData = function (component, relativeTo) {
    var item = {
        importName: string_1.classify(component.name),
        importPath: './' + path.relative(relativeTo, component.dir)
    };
    return item;
};
exports.mapFilesToTemplateData = function (exportName, files, relativeTo) {
    return files
        .toArray()
        .map(function (files) {
        //console.log('mapFilesToTemplate::exportName',exportName,files)
        return {
            exportName: exportName,
            indexItems: files
                .map(function (file) { return exports.mapFileToTemplateDataItem(file, relativeTo); })
                .filter(function (item) { return !!item.importName; })
        };
    });
};
exports.mapFileToTemplateDataItem = function (filepath, relativeTo) {
    var componentBaseName = path.basename(filepath, '.ts').split('.component')
        .map(function (val) { return val.replace('.cquery', ''); })
        .join('');
    var _a = componentBaseName.split('.') || [], _b = _a[0], componentName = _b === void 0 ? '' : _b, _c = _a[1], typeName = _c === void 0 ? '' : _c;
    //console.log('componentBaseName',componentBaseName)
    //console.log('componentName',componentName)
    //console.log('typeName',typeName)
    var componentRoot = path.relative(relativeTo, path.dirname(filepath));
    if (!componentName) {
        throw Error('Invalid component name at "' + filepath + '".');
    }
    var item = {
        importName: string_1.classify(componentName),
        importPath: './' + path.relative(relativeTo, filepath)
    };
    //console.log('map template data - relativeTo', item.importPath)
    if (!rxfs.existsSync(path.resolve(relativeTo, path.dirname(item.importPath)))) {
        console.log('componentRoot', componentRoot);
        console.log('componentBaseName', componentBaseName);
        console.log('item.importPath', item.importPath);
        throw Error("\n\n" + item.importPath + " is not a valid directory");
    }
    item.importPath = item.importPath.replace(/\.ts$/, '');
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
//# sourceMappingURL=render.js.map