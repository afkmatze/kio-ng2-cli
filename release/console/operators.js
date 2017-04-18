"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var map_1 = require("./operator/map");
var keys_1 = require("./operator/keys");
var api = require("./api");
exports.map = map_1.operator(api);
exports.keys = keys_1.operatorKeys(api);
//# sourceMappingURL=operators.js.map