"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Component_class_1 = require("./Component.class");
var PublicationComponent = (function (_super) {
    __extends(PublicationComponent, _super);
    function PublicationComponent(data) {
        var _this = _super.call(this, data) || this;
        _this._modifiers = data.modifiers;
        _this._childTypes = data.childTypes;
        return _this;
    }
    Object.defineProperty(PublicationComponent.prototype, "modifiers", {
        get: function () {
            /*if ( !this._modifiers )
            {
              this.update()
            }*/
            return this._modifiers || [];
        },
        set: function (mods) {
            /*if ( !this._modifiers )
            {
              this.update()
            }*/
            this._modifiers = mods;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PublicationComponent.prototype, "childTypes", {
        get: function () {
            /*if ( !this._childTypes )
            {
              this.update()
            }*/
            return this._childTypes || [];
        },
        set: function (childTypes) {
            /*if ( !this._childTypes )
            {
              this.update()
            }*/
            this._childTypes = childTypes;
        },
        enumerable: true,
        configurable: true
    });
    PublicationComponent.prototype.update = function () {
        /*const criteriaFile = this.getFiles().find(filename => /criteria\.ts$/.test(filename) )
        if ( !criteriaFile )
          throw Error (`No criteria file for component ${this.toString()}`)
        const Criteria = evalFile(criteriaFile,path.dirname(criteriaFile)).Criteria
        this._modifiers = Criteria.modifiers
        this._childTypes = Criteria.childTypes*/
    };
    PublicationComponent.prototype.toJSON = function () {
        var _a = _super.prototype.toJSON.call(this), name = _a.name, dir = _a.dir, componentType = _a.componentType;
        return {
            name: name,
            dir: dir,
            contentType: this.contentType,
            componentType: componentType,
            modifiers: this.modifiers,
            childTypes: this.childTypes
        };
    };
    return PublicationComponent;
}(Component_class_1.Component));
PublicationComponent.FileTypes = Component_class_1.Component.FileTypes.concat(["criteria", "fixture", "querytest"]);
exports.PublicationComponent = PublicationComponent;
//# sourceMappingURL=PublicationComponent.class.js.map