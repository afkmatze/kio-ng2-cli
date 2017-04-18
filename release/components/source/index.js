"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./interfaces"));
var stream_1 = require("./tsc/stream");
exports.tscStream = stream_1.default;
exports.tsc = stream_1.default;
var stream_2 = require("./cache/stream");
exports.cacheStream = stream_2.default;
exports.cache = stream_2.default;
//# sourceMappingURL=index.js.map