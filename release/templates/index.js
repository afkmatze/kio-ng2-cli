"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./resolveTarget"));
__export(require("./interfaces"));
var types_enum_1 = require("./types.enum");
var index = require("./types/index/index");
var publication = require("./types/publication");
var types_1 = require("./types");
__export(require("./types"));
__export(require("./files"));
__export(require("./types.enum"));
exports.template = function (templateName) {
    if (templateName === "index") {
        return types_1.Types.index;
    }
    return types_1.Types.publication;
};
exports.getType = function (typeValue) {
    if ('string' === typeof typeValue) {
        switch (typeValue.toLowerCase()) {
            case "index":
                return types_enum_1.TemplateType.Index;
            case "publication":
            case "publicationcomponent":
                return types_enum_1.TemplateType.PublicationComponent;
        }
    }
    return typeValue;
};
exports.byType = function (templateType) {
    if ('string' === typeof templateType) {
        templateType = exports.getType(templateType);
    }
    switch (templateType) {
        case types_enum_1.TemplateType.Index:
            return index;
        case types_enum_1.TemplateType.PublicationComponent:
            return publication;
    }
};
//# sourceMappingURL=index.js.map