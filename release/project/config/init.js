"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file_1 = require("./file");
var kioEnv = require("kio-ng2-env");
var isConfigKey = function (key) {
    return key === 'components';
};
var mergeConfig = function (target, other) {
    Object.keys(target).forEach(function (key) {
        if (isConfigKey(key)) {
            target[key] = other[key];
        }
    });
    return target;
};
exports.init = function (projectConfig) {
    if (projectConfig.configFilepath) {
        projectConfig = mergeConfig(projectConfig, file_1.read(projectConfig.configFilepath));
    }
    var info = kioEnv.api.modules.resolve.rootModule();
    console.log('project config info: ', info);
    return projectConfig;
};
//# sourceMappingURL=init.js.map