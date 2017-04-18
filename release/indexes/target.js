"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = require("../env");
exports.targetPathForIndex = function (indexName) {
    if (indexName === "publication") {
        return env_1.path.join(env_1.KIO_PATHS.components.publication);
    }
    if (indexName === "navigation") {
        return env_1.path.join(env_1.KIO_PATHS.components.navigation);
    }
    if (indexName === "structure") {
        return env_1.path.join(env_1.KIO_PATHS.components.structure);
    }
    return env_1.KIO_PATHS.root;
};
//# sourceMappingURL=target.js.map