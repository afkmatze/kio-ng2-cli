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
var stringUtils = require("../../../utils/string");
var path = require("path");
var ejs = require("ejs");
var logger = require("../../../console");
var TEMPLATE_DIR = path.resolve(__dirname, '../../../../templates');
var kio_ng2_data_1 = require("kio-ng2-data");
var replaceFilepath = function (filepath, data) {
    filepath = filepath.replace('__path__', stringUtils.dasherize(data.name));
    return filepath.replace('__name__', stringUtils.dasherize(data.name));
};
exports.mapCLIArgsToTemplateData = function (args) {
    var parentName = 'kio-abstract-' + args.contentType;
    return undefined;
};
exports.render = function (data) {
    var templateDir = path.join(TEMPLATE_DIR, kio_ng2_data_1.KioNodeType[data.type]);
    var templateData = __assign({}, data, { contentType: kio_ng2_data_1.KioNodeType[data.type] });
    logger.log('template data', templateData);
    return rxfs.find(['-type', 'file'], templateDir).map(function (data) { return "" + data; })
        .map(function (filepath) { return path.join(templateDir, filepath); })
        .flatMap(function (filename) {
        return rxfs.readFile(filename, 'utf8').toArray().map(function (rows) { return rows.join('\n'); })
            .map(function (content) { return ({
            content: ejs.render(content.toString(), templateData),
            filepath: path.relative(TEMPLATE_DIR, filename)
        }); });
    })
        .map(function (_a) {
        var filepath = _a.filepath, content = _a.content;
        filepath = replaceFilepath(filepath, data);
        logger.log('render "%s"', filepath, '\n---------\n', content, '\n--------\n');
        return ({
            filepath: filepath,
            content: content
        });
    });
};
//# sourceMappingURL=render.js.map