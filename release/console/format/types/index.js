"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./interfaces"));
var type_class_1 = require("./type.class");
exports.FormatValueType = type_class_1.FormatValueType;
var string_1 = require("./string");
var number_1 = require("./number");
var object_1 = require("./object");
var boolean_1 = require("./boolean");
exports.stringType = new string_1.default();
exports.numberType = new number_1.default();
exports.objectType = new object_1.default();
exports.booleanType = new boolean_1.default();
exports.Types = [
    exports.stringType,
    exports.numberType,
    exports.objectType,
    exports.booleanType
];
exports.default = exports.Types;
//# sourceMappingURL=index.js.map