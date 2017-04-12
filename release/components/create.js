"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentInterfaces = require("./interfaces");
var constants_1 = require("../env/constants");
var path = require("path");
var Component_class_1 = require("./Component.class");
var PATH_TO_PUBLICATION = path.join(constants_1.KIO_PATHS.components.publication);
var PATH_TO_STRUCTURE = path.join(constants_1.KIO_PATHS.components.structure);
exports.getComponentTypeForPath = function (dir) {
    if (dir.indexOf(PATH_TO_PUBLICATION) > -1) {
        return ComponentInterfaces.KioComponentType.PublicationComponent;
    }
    else if (dir.indexOf(PATH_TO_STRUCTURE) > -1) {
        return ComponentInterfaces.KioComponentType.StructureComponent;
    }
    return undefined;
};
exports.getContentTypeForPath = function (dir) {
    if (dir.indexOf(PATH_TO_PUBLICATION) > -1) {
        return dir.replace(PATH_TO_PUBLICATION + '/', '').split('/')[0];
    }
    return undefined;
};
exports.createWithPath = function (dir) {
    var componentType = exports.getComponentTypeForPath(dir);
    if (componentType === ComponentInterfaces.KioComponentType.PublicationComponent) {
        var contentType = exports.getContentTypeForPath(dir);
        if (!contentType) {
            throw Error('Invalid component type at dir: ' + dir);
        }
        var data = {
            dir: dir,
            componentType: componentType,
            name: path.basename(dir),
            contentType: contentType
        };
        return new Component_class_1.Component(data);
    }
    else if (componentType === ComponentInterfaces.KioComponentType.StructureComponent) {
        var data = {
            dir: dir,
            componentType: componentType,
            name: path.basename(dir)
        };
        return new Component_class_1.Component(data);
    }
    throw Error('Invalid component type at dir: ' + dir);
};
//# sourceMappingURL=create.js.map