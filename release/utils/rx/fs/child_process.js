"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cp = require("child_process");
var rxjs_1 = require("rxjs");
var parseCommand = function (command) {
    if ('string' !== typeof command) {
        return command;
    }
    var _a = command.split(' ') || [''], commandName = _a[0], args = _a.slice(1);
    return {
        commandName: commandName,
        args: args
    };
};
var spawnCommand = function (command, spawnOptions) {
    return cp.spawn(command.commandName, command.args, spawnOptions);
};
var ChildProcess = (function () {
    function ChildProcess(options) {
        this.__logs = [];
        this.pwd = process.cwd();
        this.__stdout_data = '';
        this.__stderr_data = '';
        this.command = parseCommand(options.command);
        if (options.cwd) {
            this.pwd = options.cwd;
        }
    }
    ChildProcess.prototype.log = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var log = {
            t: new Date(),
            eventName: eventName,
            args: args
        };
        this.__logs.push(log);
        this.printLog(log);
    };
    ChildProcess.prototype.printLog = function (log, idx) {
        console.log.apply(console, ['[%s at %s] %s\t%s', log.eventName, log.t, idx || ''].concat(log.args));
    };
    Object.defineProperty(ChildProcess.prototype, "stdout", {
        get: function () {
            return this.__stdout;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChildProcess.prototype, "stderr", {
        get: function () {
            return this.__stderr;
        },
        enumerable: true,
        configurable: true
    });
    ChildProcess.prototype.createObserver = function (typeName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.log('create observer: ', typeName);
            switch (typeName) {
                case "stderr":
                    _this.__stderr = rxjs_1.Observable.create(function (observer) {
                        _this.log('create __stderr_observer');
                        _this.__stderr_observer = observer;
                        resolve(observer);
                    });
                    break;
                case "stdout":
                    _this.__stdout = rxjs_1.Observable.create(function (observer) {
                        _this.log('create __stdout_observer');
                        _this.__stdout_observer = observer;
                        resolve(observer);
                    });
                    break;
            }
        });
    };
    ChildProcess.prototype.createObservers = function () {
        this.log('create observers');
        return rxjs_1.Observable.forkJoin(this.createObserver('stdout'), this.createObserver('stderr')).toArray();
    };
    ChildProcess.prototype._spawn = function (callback) {
        var _this = this;
        var stdout = this.__stdout_observer;
        var stderr = this.__stderr_observer;
        var pushStdout = function (data) {
            _this.__stdout_data += data.toString('utf8');
            stdout.next(data);
        };
        var pushStderr = function (data) {
            _this.__stderr_data += data.toString('utf8');
            stderr.next(data);
        };
        var finish = function (error) {
            if (error) {
                stdout.error(error);
                stderr.error(error);
            }
            else {
                stdout.complete();
                stderr.complete();
            }
        };
        var child = spawnCommand(this.command, {
            cwd: this.pwd
        });
        child.on('close', function (code, signal) {
            _this.log('close', { code: code, signal: signal });
            finish();
            callback && callback(code, _this.__stdout_data, _this.__stderr_data);
        });
        child.stdout.on('data', function (data) {
            pushStdout(data);
        });
        child.stderr.on('data', function (data) {
            pushStdout(data);
        });
        child.on('error', function (error) {
            finish(error);
        });
    };
    ChildProcess.prototype.exec = function (callback) {
        var _this = this;
        this._execCallback = callback;
        return rxjs_1.Observable.fromPromise(new Promise(function (resolve, reject) {
            process.nextTick(function () {
                _this.log('will create');
                _this.createObservers()
                    .flatMap(function (observers) {
                    process.nextTick(function () {
                        _this._spawn(callback);
                    });
                    return rxjs_1.Observable.forkJoin(_this.__stdout, _this.__stderr);
                });
            });
        }));
    };
    return ChildProcess;
}());
exports.ChildProcess = ChildProcess;
//# sourceMappingURL=child_process.js.map