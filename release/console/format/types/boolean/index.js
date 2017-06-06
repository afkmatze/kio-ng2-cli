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
var type_class_1 = require("../type.class");
var BooleanValueType = (function (_super) {
    __extends(BooleanValueType, _super);
    function BooleanValueType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.typeName = 'boolean';
        _this.flag = /b/;
        return _this;
    }
    BooleanValueType.prototype.render = function (formatArg) {
        return JSON.stringify(formatArg, null, '  ');
    };
    return BooleanValueType;
}(type_class_1.FormatValueType));
exports.BooleanValueType = BooleanValueType;
exports.default = BooleanValueType;
//# sourceMappingURL=index.js.map