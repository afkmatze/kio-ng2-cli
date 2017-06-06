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
var NumberValueType = (function (_super) {
    __extends(NumberValueType, _super);
    function NumberValueType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.typeName = 'number';
        _this.flag = /d|f/;
        return _this;
    }
    NumberValueType.prototype.render = function (formatArg) {
        var value = new Number(formatArg.value);
        //console.log('NumberValueType::render()', formatArg)
        if (formatArg.flag === 'f') {
            var _a = formatArg.paramArgs.split('.') || [], _b = _a[0], typeBase = _b === void 0 ? "1" : _b, _c = _a[1], typeDec = _c === void 0 ? "0" : _c;
            var base = parseInt(typeBase);
            var dec = parseInt(typeDec) || 0;
            return value.toFixed(dec).toString();
        }
        return value.toFixed(0).toString();
    };
    return NumberValueType;
}(type_class_1.FormatValueType));
exports.NumberValueType = NumberValueType;
exports.default = NumberValueType;
//# sourceMappingURL=index.js.map