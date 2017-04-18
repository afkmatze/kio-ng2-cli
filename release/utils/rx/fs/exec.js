"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var child_process_1 = require("child_process");
var from_1 = require("./from");
var execObserve = function (command, opts) {
    var cwd = (opts || { cwd: process.cwd() }).cwd;
    var commandLog = "command: \"" + command + "\"";
    opts = opts || {
        cwd: cwd
    };
    //console.log(commandLog)
    var cp = child_process_1.exec(command, opts, function (error, out) {
        //console.log('[%s] %s - end', new Date() , commandLog , '\n---\nerror\n', error )
    });
    var obs = from_1.fromReadable(cp.stdout).map(function (stdout) { return ({ stdout: stdout }); });
    var obsErr = from_1.fromReadable(cp.stderr).map(function (stderr) { return ({ stderr: stderr }); });
    return rxjs_1.Observable.merge(obs, obsErr);
};
exports.exec = execObserve;
exports.evalJS = function (filepath, opts) {
    var data = require(filepath);
    return rxjs_1.Observable.of(data);
};
//# sourceMappingURL=exec.js.map