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
var project_1 = require("../project");
exports.createComponentCommand = function () { return ({
    command: 'createComponent',
    aliases: ['create'],
    describe: 'Creates a new publication component',
    builder: function (argv) {
        return argv
            .usage('Usage: $0 create <ComponentName>')
            .option('contentType', {
            alias: 't',
            required: false,
            default: '',
            choices: ['txt', 'src', 'fragment']
        })
            .option('modifiers', {
            alias: 'm',
            required: false,
            type: 'array',
            default: [],
            describe: 'list of modifiers'
        })
            .option('childTypes', {
            alias: 'c',
            required: false,
            default: [],
            describe: 'child type content types',
            type: 'array'
        });
    },
    handler: function (args) {
        var _a = args._, command = _a[0], componentName = _a[1];
        var sub = project_1.default().createComponent(__assign({}, args, { name: componentName })).subscribe(function (value) { }, function (error) {
            console.error(error);
        }, function () {
            if (sub) {
                sub.unsubscribe();
            }
        });
    }
}); };
//# sourceMappingURL=createComponent.js.map