"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentInterfaces = require("../interfaces");
var constants_1 = require("../../env/constants");
var path = require("path");
var stringUtils = require("../../utils/string");
var shjs = require("shelljs");
var fileTypePatterns = {
    "component": /\.component\.ts$/,
    "spec": /\.component\.spec\.ts$/,
    "template": /\.component\.html$/,
    "style": /\.component\.[s]?css$/,
    "criteria": /\.component\.criteria\.ts$/,
    "fixture": /\.component\.fixture\.ts$/,
    "querytest": /\.component\.spec\.ts$/
};
var matchFileType = function (fileType) {
    var regex = fileTypePatterns[fileType];
    return function (filename) { return regex.test(filename); };
};
var Component = (function () {
    function Component(data) {
        this.data = data;
    }
    Object.defineProperty(Component.prototype, "typeName", {
        get: function () {
            return ComponentInterfaces.KioComponentType[this.data.componentType];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "dir", {
        get: function () {
            return path.resolve(constants_1.KIO_PROJECT_ROOT, this.data.dir);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "name", {
        get: function () {
            return stringUtils.classify(this.data.name);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "dasherizedName", {
        get: function () {
            return stringUtils.dasherize(this.data.name);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "childTypes", {
        get: function () {
            return this.data.childTypes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "modifiers", {
        get: function () {
            return this.data.modifiers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "contentType", {
        get: function () {
            return this.data.contentType;
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.relativeTo = function (toPathname) {
        return path.relative(this.dir, toPathname);
    };
    Component.prototype.relativeFrom = function (fromPathname) {
        return path.relative(fromPathname, this.dir);
    };
    Component.prototype.getFiles = function () {
        //logger.trace('getFiles at %s',this.dir)
        var files = shjs.find(this.dir);
        return Array.isArray(files) ? files.filter(function (item) { return !!path.extname(item); }) : [];
    };
    Component.prototype.getFile = function (fileType) {
        return this.getFiles().find(matchFileType(fileType));
    };
    Component.prototype.toString = function () {
        return "[" + this.name + " " + this.typeName + "]";
    };
    Component.prototype.toJSON = function () {
        return this.data;
    };
    return Component;
}());
Component.FileTypes = ["component", "spec", "template", "style"];
exports.Component = Component;
//# sourceMappingURL=Component.class.js.map