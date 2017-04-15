"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var path = require("path");
var readline = require("readline");
var format_1 = require("./format");
var pckg = require('../../package.json');
var ROOT_PATH = path.resolve(__dirname, '../../');
exports.banner = function () {
    console.log('%s v%s', chalk.yellow(pckg.name), pckg.version);
};
var writer = function (prefix) { return function (format) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var out = format_1.formatter.printf.apply(format_1.formatter, [format].concat(args));
    //console.log ( chalk.dim(prefix) + format, ...args )  
    console.log(chalk.dim(prefix) + out);
}; };
exports.log = writer('[kio-ng2-cli] ');
exports.logError = function (error, exit) {
    if (exit === void 0) { exit = true; }
    console.log(chalk.red(error.toString()));
    //console.log ( error.stack.replace(/.*\n/,'') ) 
    if (exit) {
        process.exit(1);
    }
};
exports.getStack = function () {
    var err = null;
    try {
        err = Error();
    }
    catch (e) { }
    return err.stack.split('\n').slice(2).map(function (traceRoute) {
        var rx_name = /at\ ([\w|\.]+)/;
        var rx_alias = /as\ (\w+)/;
        var rx_filepath = /\(([\w|\D]+)\:(\d+)\:(\d+)\)$/;
        var _a = traceRoute.match(rx_name) || [], _b = _a[0], name_src = _b === void 0 ? undefined : _b, _c = _a[1], name = _c === void 0 ? undefined : _c;
        var _d = traceRoute.match(rx_alias) || [], _e = _d[0], alias_src = _e === void 0 ? undefined : _e, _f = _d[1], alias = _f === void 0 ? undefined : _f;
        var _g = traceRoute.match(rx_filepath) || [], _h = _g[0], filepath_src = _h === void 0 ? undefined : _h, _j = _g[1], filepath = _j === void 0 ? undefined : _j, _k = _g[2], line = _k === void 0 ? undefined : _k, _l = _g[3], column = _l === void 0 ? undefined : _l;
        return {
            name: name,
            alias: alias,
            filepath: filepath,
            line: line,
            column: column,
            toString: function () {
                return "at " + name + " " + (alias ? "[as " + alias + "] " : '') + ("(" + filepath + ":" + line + ":" + column + ")");
            }
        };
    });
};
exports.trace = function (label) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var stack = exports.getStack().slice(1);
    if (label) {
        exports.log.apply(void 0, [chalk.bold(label)].concat(args));
    }
    stack.forEach(function (item) { return exports.log(exports.printStackItem(item)); });
};
exports.printStackItem = function (item, short) {
    if (item === void 0) { item = exports.getStack()[0]; }
    if (short === void 0) { short = true; }
    return "(./" + (item.filepath ? path.relative(ROOT_PATH, item.filepath) : '') + ":" + item.line + ":" + item.column + ")";
};
exports.debug = process.env.NODE_ENV === 'debug' ? writer("[DEBUG:kio-ng2-cli] ") : function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
};
exports.request = function (message, callback) {
    var options = {
        input: process.stdin,
        output: process.stdout,
        terminal: true
    };
    var rl = readline.createInterface(options);
    return new Promise(function (resolve, reject) {
        var validateAnswer = function (answer) {
            var error = callback(answer);
            if (!error) {
                resolve(answer);
            }
            else {
                exports.logError(Error(error), false);
                rl.question(message, validateAnswer);
            }
        };
        rl.question(message, validateAnswer);
    });
};
//# sourceMappingURL=index.js.map