"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var readline = require("readline");
var pckg = require('../../package.json');
exports.banner = function () {
    console.log('%s v%s', chalk.yellow(pckg.name), pckg.version);
};
exports.log = function (format) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    console.log.apply(console, [chalk.dim('[kio-ng2-cli]') + format].concat(args));
};
exports.logError = function (error, exit) {
    if (exit === void 0) { exit = true; }
    console.log(chalk.red(error.toString()));
    //console.log ( error.stack.replace(/.*\n/,'') ) 
    if (exit) {
        process.exit(1);
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