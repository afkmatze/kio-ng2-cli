"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentInterfaces = require("./interfaces");
var constants_1 = require("../env/constants");
var path = require("path");
var stringUtils = require("../utils/string");
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
    Component.prototype.toString = function () {
        return "[" + this.name + " " + this.typeName + "]";
    };
    return Component;
}());
exports.Component = Component;
//# sourceMappingURL=Component.class.js.map