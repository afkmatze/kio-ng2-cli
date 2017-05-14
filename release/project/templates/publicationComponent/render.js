"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxfs = require("rxfs");
var env = require("../../../env");
var stringUtils = require("../../../utils/string");
var path = require("path");
var ejs = require("ejs");
var TEMPLATE_DIR = path.resolve(__dirname, '../../../../templates');
var kio_ng2_1 = require("kio-ng2");
var replaceFilepath = function (filepath, data) {
    filepath = filepath.replace('__path__', stringUtils.dasherize(data.name));
    return filepath.replace('__name__', stringUtils.dasherize(data.name));
};
exports.mapCLIArgsToTemplateData = function (args) {
    var parentName = 'kio-abstract-' + args.contentType;
    var componentRoot = path.resolve(env.KIO_PROJECT_ROOT, env.KIO_PATHS.components.publication, args.contentType);
    return undefined;
    /*return {
      ...args,
      contentType: KioNodeType[args.contentType],
      styles: path.relative(path.join(componentRoot,args.name),path.join(env.KIO_PROJECT_ROOT,'src','scss')),
      selector: 'publication-' + stringUtils.dasherize(args.name),
      classifiedModuleName: stringUtils.classify(args.name),
      dasherizedModuleName: stringUtils.dasherize(args.name),
      classifiedParentComponentName: stringUtils.classify(parentName) + 'Component',
      dasherizedParentComponentPath: stringUtils.dasherize(parentName),
      pathToStructureComponents: '../../../components/'
    }*/
};
exports.render = function (data) {
    return rxfs.find(['-type', 'file'], path.join(TEMPLATE_DIR, kio_ng2_1.KioNodeType[data.contentType]))
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