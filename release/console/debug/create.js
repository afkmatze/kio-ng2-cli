"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var writer_1 = require("../writer");
exports.DebuggerOptionsDefault = {
    debugKey: 'debug',
    envKey: 'KIO_CLI_ENV'
};
function createDebugger(opts) {
    var _a = opts || {}, _b = _a.debugKey, debugKey = _b === void 0 ? exports.DebuggerOptionsDefault.debugKey : _b, _c = _a.envKey, envKey = _c === void 0 ? exports.DebuggerOptionsDefault.envKey : _c;
    var envValue = process.env[envKey];
    var envExpression = new RegExp(debugKey);
    if (envExpression.test(envValue)) {
        var debugWriter = writer_1.writer("[" + debugKey + ":" + envKey + "]");
        debugWriter('INITIALIZED DEBUGGER');
        return debugWriter;
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
}
exports.createDebugger = createDebugger;
//# sourceMappingURL=create.js.map