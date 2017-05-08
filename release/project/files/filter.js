"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("../interfaces");
var path = require("path");
exports.filterByIndexType = function (indexType) {
    var expr;
    switch (indexType) {
        case interfaces_1.IndexTypes.navigation:
        case interfaces_1.IndexTypes.structure:
        case interfaces_1.IndexTypes.publication:
            expr = /\.component\.ts$/;
            break;
        case interfaces_1.IndexTypes.fixture:
            expr = /\.fixture\.ts$/;
            break;
        case interfaces_1.IndexTypes.criteria:
            expr = /\.criteria\.ts$/;
            break;
    }
    return function (filename, idx, files) {
        if (filename === void 0) { filename = ""; }
        return filename ? expr.test(path.basename(filename)) : false;
    };
};
//# sourceMappingURL=filter.js.map