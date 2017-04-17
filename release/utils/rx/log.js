"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getT = function (prev) {
    return process.hrtime(prev);
};
var t0 = getT();
var logTs = function (format) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var td = getT(t0);
    console.log.apply(console, ['\x1b[1m[%s]\x1b[0m | ' + format, td].concat(args));
};
var logStart = function (key) {
    var t0 = getT();
    var log = function (format) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var td = getT(t0);
        console.log.apply(console, ['\x1b[1m[%s : %s]\x1b[0m | ' + format, key, td].concat(args));
    };
    log('start');
    return {
        log: log
    };
};
var rand = function () {
    return Math.floor(Math.random() * 10000000) + "_" + getT();
};
var cnt = 0;
exports.logObserver = function (obs) {
    var t = logStart('observer ' + (cnt++));
    var sub = obs.subscribe(function (value) {
        t.log('next: \x1b[2m%s\x1b[0m', JSON.stringify(value, null, '  '));
    }, function (error) {
        t.log('error');
    }, function () {
        t.log('done');
        sub && sub.unsubscribe();
    });
    return obs;
};
//# sourceMappingURL=log.js.map