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
var rxjs_1 = require("rxjs");
var env_1 = require("../../../env");
var child_process_1 = require("child_process");
var from_1 = require("./from");
var child_process_2 = require("../child_process");
var execChildProcess = function (command, opts) {
    return child_process_2.spawn(__assign({ command: command }, opts)).catch(function (error) {
        console.error(error);
        return rxjs_1.Observable.throw(error);
    });
    /*.map ( data => {
      const {
        stderr,
        stdout
      } = data
      return {
        stderr: stderr.toString('utf8'),
        stdout: stdout.toString('utf8')
      }
    } )*/
};
exports.exec = execChildProcess;
var execObserve = function (command, opts) {
    var cwd = (opts || { cwd: process.cwd() }).cwd;
    var commandLog = "command: \"" + command + "\"";
    opts = opts || {
        cwd: cwd
    };
    //console.log(commandLog)
    var cp = child_process_1.exec(command, opts, function (error, out) {
        //console.log('[%s] %s - end', new Date() , out , '\n---\nerror\n', error )
    });
    var obs = from_1.fromReadable(cp.stdout).map(function (stdout) { return ({ stdout: stdout }); });
    var obsErr = from_1.fromReadable(cp.stderr).map(function (stderr) { return ({ stderr: stderr }); });
    return rxjs_1.Observable.merge(obs, obsErr);
};
exports.evalJS = function (filepath, opts) {
    var data = require(filepath);
    return rxjs_1.Observable.of(data);
};
exports.evalTS = function (filepath, opts) {
    var execRoot = opts && opts.cwd ? opts.cwd : env_1.KIO_PROJECT_ROOT;
    var relFilepath = env_1.path.relative(execRoot, filepath);
    return execObserve("ts-node -e 'require(\"./" + relFilepath + "\")'", { cwd: execRoot });
};
//# sourceMappingURL=exec.js.map