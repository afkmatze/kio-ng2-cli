"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CLIConfig = (function () {
    function CLIConfig() {
    }
    CLIConfig.prototype.update = function (config) {
        this._data = config;
        //console.log('updated cli config',config)
    };
    Object.defineProperty(CLIConfig.prototype, "data", {
        get: function () {
            return __assign({}, this._data);
        },
        enumerable: true,
        configurable: true
    });
    return CLIConfig;
}());
exports.CLIConfig = CLIConfig;
exports.default = new CLIConfig();
//# sourceMappingURL=config.js.map