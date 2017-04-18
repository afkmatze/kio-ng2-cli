"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env = require("../env");
/** path */
exports.resolveTargetWithName = function (name) {
    switch (name) {
        case "index":
            return env.KIO_PATHS.root;
        default:
            return env.path.join(env.KIO_PATHS.components.publication, name);
    }
};
//# sourceMappingURL=resolveTarget.js.map