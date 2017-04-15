"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env = require("./env/constants");
var path = require("path");
var fs = require("fs");
var template_1 = require("./indexes/template");
var indexes_1 = require("./indexes");
var template_2 = require("./template");
var template = require("./template");
var components_1 = require("./components");
exports.getComponents = components_1.getComponents;
exports.targetDirForTemplate = function (templateName) {
    if (templateName === "index") {
        return env.KIO_PATHS.root;
    }
    return path.join(env.KIO_PATHS.components.publication, templateName);
};
exports.render = function (templateName, data) {
    if ('string' === typeof templateName) {
        var template_3 = template_2.createTemplate(templateName, exports.targetDirForTemplate(templateName));
        return exports.render(template_3, data);
    }
    template_2.readTemplate(templateName);
    //renderTemplate(<TemplateFiles>templateName,data)
    return template_2.writeTemplate(templateName);
};
exports.renderIndex = function (indexName, fromCache) {
    if (fromCache === void 0) { fromCache = true; }
    var componentIndex = indexes_1.getIndex(indexName, fromCache);
    var indexData = template_1.dataForIndex(componentIndex);
    return template.renderIndex(indexData)[0];
};
exports.writeIndex = function (indexName, fromCache) {
    if (fromCache === void 0) { fromCache = true; }
    var source = exports.renderIndex(indexName, fromCache);
    var filename = indexes_1.getIndexFilePath(indexName);
    return fs.writeFileSync(filename, source, { encoding: 'utf8' });
};
exports.renderPublicationComponent = function (publicationComponent) {
    var tmpl = template.createTemplate("publication", publicationComponent.dir);
    return tmpl;
};
//# sourceMappingURL=api.js.map