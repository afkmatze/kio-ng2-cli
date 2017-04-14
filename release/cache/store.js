"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var constants_1 = require("../env/constants");
exports.resolve = function (cachePath) {
    return path.join(constants_1.KIO_PROJECT_CACHE, cachePath.toString());
};
//# sourceMappingURL=store.js.map