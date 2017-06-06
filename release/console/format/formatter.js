"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Formatter_class_1 = require("./Formatter.class");
var types_1 = require("./types");
var formatter = new Formatter_class_1.Formatter();
exports.formatter = formatter;
types_1.default.forEach(function (defaultType) {
    formatter.addType(defaultType);
});
//# sourceMappingURL=formatter.js.map