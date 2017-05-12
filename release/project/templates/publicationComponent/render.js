"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var rxfs = require("rxfs");
var env = require("../../../env");
var stringUtils = require("../../../utils/string");
var path = require("path");
var ejs = require("ejs");
var TEMPLATE_DIR = path.resolve(__dirname, '../../../../templates');
var replaceFilepath = function (filepath, data) {
    filepath = filepath.replace('__path__', stringUtils.dasherize(data.name));
    return filepath.replace('__name__', stringUtils.dasherize(data.name));
};
exports.mapCLIArgsToTemplateData = function (args) {
    var parentName = 'kio-abstract-' + args.contentType;
    var componentRoot = path.resolve(env.KIO_PROJECT_ROOT, env.resolveKioPath('publication'), args.contentType);
    return __assign({}, args, { styles: path.relative(path.join(componentRoot, args.name), path.join(env.KIO_PROJECT_ROOT, 'src', 'scss')), selector: 'publication-' + stringUtils.dasherize(args.name), classifiedModuleName: stringUtils.classify(args.name), dasherizedModuleName: stringUtils.dasherize(args.name), classifiedParentComponentName: stringUtils.classify(parentName) + 'Component', dasherizedParentComponentPath: stringUtils.dasherize(parentName), pathToStructureComponents: '../../../components/' });
};
exports.render = function (data) {
    return rxfs.find(['-type', 'file'], path.join(TEMPLATE_DIR, data.contentType))
        .map(function (streamData) { return streamData.stdout.toString('utf8'); })
        .flatMap(function (filename) { return rxfs.readFile(filename).toArray().map(function (rows) { return rows.join('\n'); })
        .map(function (content) { return ({
        content: ejs.render(content.toString(), data),
        filepath: path.relative(TEMPLATE_DIR, filename)
    }); }); })
        .map(function (_a) {
        var filepath = _a.filepath, content = _a.content;
        filepath = replaceFilepath(filepath, data);
        //console.log('render "%s"', filepath , '\n---------\n', content, '\n--------\n')
        return ({
            filepath: filepath,
            content: content
        });
    });
};
//# sourceMappingURL=render.js.map