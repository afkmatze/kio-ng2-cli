"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var ejs = require("ejs");
var stringUtils = require("../../utils/string");
var logger = require("../../console");
var env = require("../../env/constants");
var fs = require("fs");
var shelljs_1 = require("shelljs");
var TEMPLATES = path.resolve(__dirname, '../../../templates');
var STYLES = path.join(env.KIO_PROJECT_ROOT, env.KIO_PATHS.root, 'scss');
exports.renderType = function (options) {
    var typeName = options.contentType;
    var templateDir = path.resolve(TEMPLATES, typeName);
    var renderOptions = {
        filename: stringUtils.dasherize(options.name)
    };
    var outputDir = path.join(env.KIO_PROJECT_ROOT, options.dir);
    logger.log('outputDir', outputDir);
    shelljs_1.mkdir('-p', outputDir);
    //const parentComponentName = stringUtils.classify(['kio','abstract',typeName,'component'].join('-'))
    shelljs_1.find(templateDir)
        .filter(function (item) { return /\_\_name/.test(item); })
        .forEach(function (item) {
        var outputFile = item.replace(/__\w+__/gm, renderOptions.filename).replace(TEMPLATES, env.KIO_PATHS.components.publication);
        var data = Object.assign({}, options, {
            styles: '../' + path.relative(outputFile, STYLES),
            joinedChildTypes: options.childTypes.map(function (ct) { return "'" + ct + "'"; }).join(','),
            dasherizedModuleName: stringUtils.dasherize(options.name),
            classifiedModuleName: stringUtils.classify(options.name),
            pathToStructureComponents: path.relative(outputDir, env.KIO_PATHS.components.structure),
            classifiedParentComponentName: stringUtils.classify(['kio', 'abstract', typeName, 'component'].join('-')),
            selector: stringUtils.dasherize(['publication', options.name].join('-')),
            dasherizedParentComponentPath: stringUtils.dasherize(stringUtils.classify(['kio', 'abstract', typeName].join('-'))),
            dasherizedParentComponentName: stringUtils.dasherize(stringUtils.classify(['kio', 'abstract', typeName].join('-')))
        });
        logger.log('render template: "%s"', outputFile);
        var result = ejs.render(shelljs_1.cat(item), data, renderOptions);
        fs.writeFileSync(outputFile, result, { encoding: 'utf8' });
    });
};
//# sourceMappingURL=render.js.map