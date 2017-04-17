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
var rxjs_1 = require("rxjs");
var chalk = require("chalk");
var components_1 = require("../../components");
var componentApi = require("../../components");
var componentSource = require("../../components/source");
var templates_1 = require("../../templates");
var logger = require("../../console");
var rxfs = require("../../utils/rx/fs");
var stringUtils = require("../../utils/string");
var env_1 = require("../../env");
var templateCreate = require("../../templates/types/publication/create");
var templateRender = require("../../templates/types/publication/render");
var templateMap = require("../../templates/types/publication/map");
var mapComponentToPublicationComponentTemplateData = function (component) {
    return templateMap.mapComponentData(component);
};
exports.writeComponentToCache = function (component) {
    logger.log('writing %s to cache', component);
    return componentSource.cache.write(component).map(function (file) { return component; });
};
exports.writeTemplateFile = function (component, templateFile) {
    var target = env_1.path.join(component.dir, env_1.path.basename(templateFile.filename));
    return rxjs_1.Observable.fromPromise(rxfs.async.stat(target)
        .then(function (stats) {
        logger.log(chalk.yellow('skipping existing') + ' %s', target);
        return component;
    })
        .catch(function (error) {
        logger.log('writing %s to file "%s"', component, templateFile.filename);
        return rxfs.async.writeFile(target, templateFile.source).then(function () { return component; });
    }));
};
exports.execCreateComponent = function (config) {
    var componentTemplate = templateCreate.createTemplateByName(config.contentType);
    componentTemplate.source = templateCreate.createTemplateSource(config.contentType);
    var componentData = __assign({}, config, { modifiers: config.modifiers || [], childTypes: config.childTypes || [], name: config.componentName, componentType: components_1.KioComponentType.PublicationComponent, dir: env_1.path.join(env_1.KIO_PATHS.components.publication, config.contentType, stringUtils.dasherize(config.componentName)) });
    //logger.keys(componentData,'*','component data')
    var componentStream = exports.writeComponentToCache(componentApi.createWithData(componentData)).flatMap(function (component) {
        return rxfs.mkdir(component.dir).map(function (dirpath) { return component; });
    });
    return componentStream.flatMap(function (component) {
        logger.log('wrote %s to cache', component);
        var componentTemplateData = mapComponentToPublicationComponentTemplateData(component);
        return templates_1.templateFiles(component.contentType, function (file) {
            logger.debug('component filename %s', file.filename);
            var baseFilename = env_1.path.basename(file.filename);
            var pathname = component.dasherizedName;
            var filename = env_1.path.join(pathname, baseFilename.replace('__name__', pathname));
            return __assign({}, file, { absoluteFilepath: env_1.path.join(env_1.KIO_PATHS.components.publication, config.contentType, filename), filename: filename });
        }).flatMap(function (file) {
            return templateRender.renderTemplateFileWithData(file, componentTemplateData)
                .map(function (source) {
                return __assign({}, file, { source: source });
            });
        })
            .flatMap(function (file) {
            return exports.writeTemplateFile(component, file);
        });
    });
};
exports.default = exports.execCreateComponent;
//# sourceMappingURL=exec.js.map