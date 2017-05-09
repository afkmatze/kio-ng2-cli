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
var project = require("../project");
exports.createComponentCommand = {
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
        var sub = project.createComponent(__assign({}, args, { name: componentName })).subscribe(function (value) { }, function (error) {
            console.error(error);
        }, function () {
            if (sub) {
                sub.unsubscribe();
            }
        });
    }
};
//# sourceMappingURL=createComponent.js.map