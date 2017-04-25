"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var options = {
    exitCode: 0,
    duration: 1000 * 3,
    errorAfter: 0
};
if (process && process.argv.length > 2) {
    for (var i = 2; i < process.argv.length; i++) {
        var arg = process.argv[i];
        if (arg.startsWith('--')) {
            var opt = arg.slice(2);
            options[opt] = process.argv[++i];
        }
    }
}
setTimeout(function () {
    process.exit(options.exitCode);
}, options.duration);
var randomInt = function (max, min) {
    if (max === void 0) { max = 100; }
    if (min === void 0) { min = 0; }
    return Math.floor(Math.random() * (max - min)) + min;
};
var chr_a = "a".charCodeAt(0);
var chr_z = "z".charCodeAt(0);
var randomChr = function () { return String.fromCharCode(randomInt(chr_z, chr_a)); };
var randomWord = function (length) {
    if (length === void 0) { length = randomInt(23, 2); }
    var out = [];
    while (out.length < length) {
        out.push(randomChr());
    }
    return out.join('');
};
var spawnError = function () {
    throw Error("This is a random Error");
};
var text = function (words) {
    if (words === void 0) { words = randomInt(1000, 300); }
    var cnt = 0;
    var currentRow = [];
    var rows = [currentRow];
    while (cnt++ < words) {
        currentRow.push(randomWord());
        if (cnt % 23 === 0) {
            currentRow = [];
            rows.push(currentRow);
        }
    }
    return rows
        .map(function (row) { return row.join(' '); }).join('\n');
};
exports.sim = function (simOpts) {
    var _a = simOpts || {}, _b = _a.stdout, stdout = _b === void 0 ? process.stdout : _b, _c = _a.stderr, stderr = _c === void 0 ? process.stderr : _c, _d = _a.stdin, stdin = _d === void 0 ? process.stdin : _d, _e = _a.exit, exit = _e === void 0 ? process.exit : _e;
    var MAX_GAP = 300;
    var startTs = Date.now();
    var send = function (data) {
        stdout.write(data);
    };
    var sendError = function (data) {
        stderr.write(data + '\n');
    };
    var errorSent = false;
    var next = function () {
        var now = Date.now();
        var d = now - startTs;
        var t = Math.min(d, MAX_GAP);
        var tNext = randomInt(t, Math.min(t, 100));
        if (d >= options.duration) {
            return exit(options.exitCode);
        }
        if (d > options.errorAfter && randomInt(1000) > 9990) {
            errorSent = true;
            sendError("This is an error");
            spawnError();
        }
        else {
            send(text());
        }
        setTimeout(next, tNext);
    };
    next();
};
exports.sim();
//# sourceMappingURL=sim.proc.js.map