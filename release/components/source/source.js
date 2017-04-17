"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("./tsc/stream");
exports.tscStream = stream_1.default;
var stream_2 = require("./cache/stream");
exports.cacheStream = stream_2.default;
exports.getSource = function (sourceType) {
    if (sourceType === 'cache') {
        return stream_2.default.fetch();
    }
    return stream_1.default.fetch();
};
//# sourceMappingURL=source.js.map