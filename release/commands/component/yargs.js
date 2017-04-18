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
var console_1 = require("../../console");
var chalk = require("chalk");
var path = require("path");
var env = require("../../env");
var exec_1 = require("./exec");
var exec_2 = require("../indexes/exec");
exports.yargs = {
    command: 'createComponent',
    aliases: ['create'],
    describe: 'Creates a new publication component',
    builder: function (argv) {
        return argv
            .usage('Usage: $0 <command> <ComponentName>')
            .demand(1)
            .option('contentType', {
            alias: 't',
            choices: ['txt', 'src', 'fragment'],
            demand: true
        })
            .option('modifiers', {
            alias: 'm',
            type: 'array',
            describe: 'list of modifiers'
        })
            .option('childTypes', {
            alias: 'c',
            describe: 'child type content types',
            type: 'array'
        });
    },
    handler: function (args) {
        var _a = args._, command = _a[0], componentName = _a[1];
        env.config.update(__assign({}, args, { command: command, componentName: componentName }));
        exec_1.default(env.config.data).toPromise()
            .then(function (result) {
            console_1.log('created %s at %s', chalk.blue.bold("" + result), path.relative(env.KIO_PATHS.root, result.dir));
            return exec_2.default().toPromise().then(function (files) {
                console_1.log('wrote %s index files', files.length);
            });
        })
            .catch(console.error);
    }
};
//# sourceMappingURL=yargs.js.map