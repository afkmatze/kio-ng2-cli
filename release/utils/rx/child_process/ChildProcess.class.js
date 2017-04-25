"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var command_1 = require("./command");
var cp = require("child_process");
var ChildProcess = (function () {
    function ChildProcess(options) {
        this.options = options;
    }
    /**
     * spawn child process and return pid
     * @return {Promise<number>} [description]
     */
    ChildProcess.prototype.spawn = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var command = command_1.parseCommand(_this.options.command);
            var cwd = _this.options.cwd || process.cwd();
            console.log('spawn command:', command, cwd);
            _this.ref = cp.spawn(command.commandName, command.args, {
                cwd: cwd
            });
            _this.bindChildProcess();
            process.nextTick(function () { return resolve(_this.stream); });
        });
    };
    Object.defineProperty(ChildProcess.prototype, "end", {
        get: function () {
            return this.__onClose.map(function (e) { return e.code; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChildProcess.prototype, "stdout", {
        get: function () {
            return rxjs_1.Observable.from(this.__onStdoutData).map(function (eventData) { return eventData.data; })
                .takeUntil(rxjs_1.Observable.race(this.__onClose, this.__onFail));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChildProcess.prototype, "stderr", {
        get: function () {
            return rxjs_1.Observable.from(this.__onStderrData).map(function (eventData) { return eventData.data; })
                .takeUntil(rxjs_1.Observable.race(this.__onClose, this.__onFail));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChildProcess.prototype, "stream", {
        get: function () {
            var _this = this;
            return rxjs_1.Observable.merge(this.__onStdoutData.map(function (event) {
                return { stdout: event.data };
            }), this.__onStderrData.map(function (event) {
                _this.__lastError = event.data.toString('utf8');
                return { stderr: event.data };
            }))
                .takeUntil(rxjs_1.Observable.merge(this.__onClose.flatMap(function (event) { return event.code
                ? rxjs_1.Observable.throw(Error("Finished with code " + event.code + ". Last Error: " + _this.__lastError))
                : rxjs_1.Observable.of(true); }), this.__onFail.flatMap(function (error) { return rxjs_1.Observable.throw(error); })));
        },
        enumerable: true,
        configurable: true
    });
    ChildProcess.prototype.bindChildProcess = function () {
        this.__onFail = rxjs_1.Observable.fromEvent(this.ref, 'error', function (error) { return ({ error: error }); });
        this.__onClose = rxjs_1.Observable.fromEvent(this.ref, 'close', function (code, signal) { return ({ code: code, signal: signal }); });
        this.__onStdoutData = rxjs_1.Observable.fromEvent(this.ref.stdout, 'data', function (data) { return ({ data: data }); });
        this.__onStderrData = rxjs_1.Observable.fromEvent(this.ref.stderr, 'data', function (data) { return ({ data: data }); });
    };
    return ChildProcess;
}());
exports.ChildProcess = ChildProcess;
//# sourceMappingURL=ChildProcess.class.js.map