"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArgs = function (argv) {
    var options = {};
    var args = [];
    for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        if (/^\-\-/.test(arg)) {
            options[arg.replace('--', '')] = args[i + 1];
            i++;
        }
        else {
            args.push(arg);
        }
    }
    return {
        options: options,
        args: args
    };
};
//# sourceMappingURL=index.js.map