"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env = require("../env/constants");
var cmd_indexes = require("./indexes");
exports.BUILD_INDEXES = "indexes";
exports.exec = function (command) {
    if (!command) {
        throw Error("Command required.");
    }
    switch (command) {
        case exports.BUILD_INDEXES:
            return cmd_indexes.main(env);
            break;
        default:
            throw Error("Unknown command \"" + command + "\"");
            break;
    }
};
//# sourceMappingURL=index.js.map