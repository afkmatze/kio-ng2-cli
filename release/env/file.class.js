"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kio_ng2_env_1 = require("kio-ng2-env");
var path = require("path");
var EnvFile = (function () {
    function EnvFile() {
    }
    EnvFile.FromFile = function (filepath) {
        var data = require(filepath);
        var envFile = new EnvFile();
        return Object.assign(envFile, data);
    };
    EnvFile.FromProjectPath = function (projectPath) {
        var projectName = kio_ng2_env_1.api.modules.resolve.rootModule(projectPath).name;
        var projectPackagePath = path.join(projectPath, projectName + '.json');
        return this.FromFile(projectPackagePath);
    };
    return EnvFile;
}());
exports.EnvFile = EnvFile;
//# sourceMappingURL=file.class.js.map