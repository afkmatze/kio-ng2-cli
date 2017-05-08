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
var ObjectValueType = (function (_super) {
    __extends(ObjectValueType, _super);
    function ObjectValueType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.typeName = 'object';
        _this.flag = /o|O/;
        return _this;
    }
    ObjectValueType.prototype.render = function (formatArg) {
        return JSON.stringify(formatArg.value, null, '  ');
    };
    return ObjectValueType;
}(type_class_1.FormatValueType));
exports.ObjectValueType = ObjectValueType;
exports.default = ObjectValueType;
//# sourceMappingURL=index.js.map