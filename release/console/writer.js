"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var format_1 = require("./format");
exports.writer = function (prefix) { return function (format) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var out = format_1.formatter.printf.apply(format_1.formatter, [format].concat(args));
    //console.log ( chalk.dim(prefix) + format, ...args )  
    console.log(chalk.dim(prefix) + out);
}; };
//# sourceMappingURL=writer.js.map