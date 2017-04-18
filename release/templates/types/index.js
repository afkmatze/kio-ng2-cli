"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./interfaces"));
var indexType = require("./index/index");
var publication_1 = require("./publication");
exports.Types = {
    "index": indexType,
    "publication": publication_1.plugin
};
//# sourceMappingURL=index.js.map