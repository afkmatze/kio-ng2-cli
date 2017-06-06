"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./interfaces"));
__export(require("./Formatter.class"));
__export(require("./formatter"));
var formatter_1 = require("./formatter");
exports.useTypeFormatter = function (valueMapper) {
    formatter_1.formatter.addType(valueMapper);
};
//# sourceMappingURL=index.js.map