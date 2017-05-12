"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = require("../env");
var rxshell = require("rxshell");
var path = require("path");
var string_1 = require("../utils/string");
var logger = require("../console");
exports.createProject = function (opts) {
    var projectPath = path.join(process.cwd(), string_1.dasherize(opts.name));
    var createScript = path.join(env_1.cliRoot(), 'scripts/setup_digit.sh');
    logger.log('%s "%s"', createScript, projectPath);
    var command = {
        commandName: createScript,
        args: [projectPath]
    };
    return rxshell.exec({ command: command, cwd: process.cwd() }).map(function (s) {
        if (s.stderr) {
            return "\u001B[31mError: " + s.stderr.toString('utf8') + "\u001B[0m";
        }
        return s.stdout.toString('utf8');
    }).map(function (row) {
        console.log('row', row);
        return row;
    });
};
//# sourceMappingURL=create.js.map