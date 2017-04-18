"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("path"));
var path = require("path");
var fs = require("fs");
var readSymlink = function (filepath) {
    var outpath;
    try {
        outpath = fs.readlinkSync(filepath);
    }
    catch (e) { }
    return outpath || filepath;
};
function pathJoin() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return exports.create.apply(void 0, [this.toString()].concat(args));
}
exports.create = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var out = path.join.apply(path, args);
    return Object.assign(out, {
        join: pathJoin.bind(out)
    });
};
exports.resolveFull = function (filepath, parts) {
    if (!path.isAbsolute(filepath)) {
        filepath = path.resolve(filepath);
    }
    if (!parts) {
        return exports.resolveFull(path.resolve('/'), filepath.split('/'));
    }
    if (parts.length > 0) {
        var nextPart = parts[0], restParts = parts.slice(1);
        var nextPath = path.join(filepath, nextPart);
        var nextLinkPath = readSymlink(nextPath);
        if (nextPath !== nextLinkPath) {
            if (!path.isAbsolute(nextLinkPath))
                nextLinkPath = path.resolve(filepath, nextLinkPath);
            return exports.resolveFull(path.join.apply(path, [exports.resolveFull(nextLinkPath)].concat(restParts)));
        }
        else {
            return exports.resolveFull(nextPath, restParts);
        }
    }
    else {
        return filepath;
    }
};
//# sourceMappingURL=path.js.map