"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_EXCLUDES = [
    /^\.DS_Store/
];
exports.folderSettings = function (arg, mergeDefaults) {
    if (mergeDefaults === void 0) { mergeDefaults = true; }
    var include = undefined;
    if ('string' === typeof arg) {
        return exports.folderSettings({
            path: arg,
            exclude: exports.DEFAULT_EXCLUDES
        }, mergeDefaults);
    }
    if (mergeDefaults) {
        return Object.assign({}, arg, {
            exclude: (arg.exclude || []).concat(exports.DEFAULT_EXCLUDES)
        });
    }
    return arg;
};
//# sourceMappingURL=folder-settings.js.map