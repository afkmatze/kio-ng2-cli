"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = require("../env");
//import * as rxshell from 'rxshell'
var rxfs = require("rxfs");
var path = require("path");
var string_1 = require("../utils/string");
var logger = require("../console");
exports.createProject = function (opts) {
    var projectPath = path.join(process.cwd(), string_1.dasherize(opts.name));
    var createScript = path.join(env_1.cliRoot(), 'scripts/setup_digit.sh');
    logger.log('%s "%s"', createScript, projectPath);
    return rxfs.spawnProcess(createScript, [projectPath]).flatMap(function (result) { return result.close; }).map(function (result) {
        if (result.exitCode !== 0) {
            return "\u001B[31mError: " + result.stderr + "\u001B[0m";
        }
        return result.stdout;
    });
};
//# sourceMappingURL=create.js.map