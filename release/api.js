"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cache = require("./cache");
var env = require("./env/constants");
var path = require("path");
var stream_1 = require("./indexes/stream");
var templates_1 = require("./templates");
var components_1 = require("./components");
exports.getComponents = components_1.getComponents;
exports.targetDirForTemplate = function (templateName) {
    if (templateName === "index") {
        return env.KIO_PATHS.root;
    }
    return path.join(env.KIO_PATHS.components.publication, templateName);
};
exports.components = function (components) {
    return {
        renderTemplate: function (templateName, indexName) {
            var indexTemplate = templates_1.template(templateName);
            if (templateName === 'index') {
                cache.cachedComponents().filter(stream_1.filterStream(indexName)).subscribe(function (value) {
                    throw Error("Weiter hier");
                });
            }
        }
    };
};
//# sourceMappingURL=api.js.map