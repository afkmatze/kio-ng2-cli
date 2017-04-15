"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Formatter_class_1 = require("./Formatter.class");
var defaultTypes_1 = require("./defaultTypes");
var formatter = new Formatter_class_1.Formatter();
exports.formatter = formatter;
Object.keys(defaultTypes_1.defaultTypes).forEach(function (key) {
    var defaultType = defaultTypes_1.defaultTypes[key];
    formatter.addType(defaultType.matcher, defaultType.formatter);
});
//# sourceMappingURL=formatter.js.map