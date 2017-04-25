"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./command"));
__export(require("./ChildProcess.class"));
var rxjs_1 = require("rxjs");
var command_1 = require("./command");
var ChildProcess_class_1 = require("./ChildProcess.class");
exports.spawn = function (commandOptions, opts) {
    if ('string' === typeof commandOptions) {
        return exports.spawn(__assign({ command: command_1.parseCommand(commandOptions) }, opts));
    }
    console.log('commandOptions', commandOptions);
    var cp = new ChildProcess_class_1.ChildProcess(commandOptions);
    return rxjs_1.Observable.from(cp.spawn()).concatMap(function (stream) { return stream; });
};
exports.createChildProcess = function (commandOptions, opts) {
    if ('string' === typeof commandOptions) {
        return exports.createChildProcess(__assign({ command: command_1.parseCommand(commandOptions) }, opts));
    }
    return new ChildProcess_class_1.ChildProcess(commandOptions);
};
//# sourceMappingURL=index.js.map