"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./Formatter.class"));
__export(require("./formatter"));
var formatter_1 = require("./formatter");
exports.useTypeFormatter = function (typeMatcher, typeFormatter) {
    formatter_1.formatter.addType(typeMatcher, typeFormatter);
};
//# sourceMappingURL=index.js.map