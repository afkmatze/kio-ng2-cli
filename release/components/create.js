"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentInterfaces = require("./interfaces");
var constants_1 = require("../env/constants");
var path = require("path");
var logger = require("../console");
var classes_1 = require("./classes");
var PATH_TO_PUBLICATION = path.join(constants_1.KIO_PATHS.components.publication);
var PATH_TO_STRUCTURE = path.join(constants_1.KIO_PATHS.components.structure);
var PATH_TO_NAVIGATION = path.join(constants_1.KIO_PATHS.components.navigation);
exports.getComponentTypeForPath = function (dir) {
    if (dir.indexOf(PATH_TO_PUBLICATION) > -1) {
        return ComponentInterfaces.KioComponentType.PublicationComponent;
    }
    else if (dir.indexOf(PATH_TO_STRUCTURE) > -1) {
        return ComponentInterfaces.KioComponentType.StructureComponent;
    }
    else if (dir.indexOf(PATH_TO_NAVIGATION) > -1) {
        return ComponentInterfaces.KioComponentType.NavigationComponent;
    }
    return undefined;
};
exports.getContentTypeForPath = function (dir) {
    if (dir.indexOf(PATH_TO_PUBLICATION) > -1) {
        return dir.replace(PATH_TO_PUBLICATION + '/', '').split('/')[0];
    }
    return undefined;
};
exports.createWithData = function (data) {
    if (data.componentType === ComponentInterfaces.KioComponentType.PublicationComponent)
        return new classes_1.PublicationComponent(data);
    return new classes_1.Component(data);
};
/**
 * @brief      Creates a Component with path.
 *
 * @param      dir   The component`s directory
 *
 * @return     Component
 */
exports.createWithPath = function (dir) {
    logger.debug('create with path "%s"', dir);
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
        return new classes_1.PublicationComponent(data);
    }
    else if (componentType === ComponentInterfaces.KioComponentType.StructureComponent) {
        var data = {
            dir: dir,
            componentType: componentType,
            name: path.basename(dir)
        };
        return new classes_1.Component(data);
    }
    else if (componentType === ComponentInterfaces.KioComponentType.NavigationComponent) {
        var data = {
            dir: dir,
            componentType: componentType,
            name: path.basename(dir)
        };
        return new classes_1.Component(data);
    }
    throw Error('Invalid component type at dir: ' + dir);
};
//# sourceMappingURL=create.js.map