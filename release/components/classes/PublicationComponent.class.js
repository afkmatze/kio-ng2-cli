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
var path = require("path");
var eval_1 = require("../../utils/eval");
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
            if (!this._modifiers) {
                this.update();
            }
            return this._modifiers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PublicationComponent.prototype, "childTypes", {
        get: function () {
            if (!this._childTypes) {
                this.update();
            }
            return this._childTypes;
        },
        enumerable: true,
        configurable: true
    });
    PublicationComponent.prototype.update = function () {
        var criteriaFile = this.getFiles().find(function (filename) { return /criteria\.ts$/.test(filename); });
        if (!criteriaFile)
            throw Error("No criteria file for component " + this.toString());
        var Criteria = eval_1.evalFile(criteriaFile, path.dirname(criteriaFile)).Criteria;
        this._modifiers = Criteria.modifiers;
        this._childTypes = Criteria.childTypes;
    };
    PublicationComponent.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        json.modifiers = this.modifiers;
        json.childTypes = this.childTypes;
        return json;
    };
    return PublicationComponent;
}(Component_class_1.Component));
PublicationComponent.FileTypes = Component_class_1.Component.FileTypes.concat(["criteria", "fixture", "querytest"]);
exports.PublicationComponent = PublicationComponent;
//# sourceMappingURL=PublicationComponent.class.js.map