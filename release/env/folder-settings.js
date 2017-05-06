"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_EXCLUDES = [
    /^\.DS_Store/
];
exports.folderSettings = function (arg) {
    if ('string' === typeof arg) {
        return {
            path: arg,
            exclude: exports.DEFAULT_EXCLUDES
        };
    }
    return arg;
};
//# sourceMappingURL=folder-settings.js.map