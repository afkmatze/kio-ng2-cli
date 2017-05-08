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
var StringValueType = (function (_super) {
    __extends(StringValueType, _super);
    function StringValueType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.typeName = 'string';
        _this.flag = /s/;
        return _this;
    }
    StringValueType.prototype.render = function (formatArg) {
        return formatArg.value;
    };
    return StringValueType;
}(type_class_1.FormatValueType));
exports.StringValueType = StringValueType;
exports.default = StringValueType;
//# sourceMappingURL=index.js.map