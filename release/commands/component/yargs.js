"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kio_component_1 = require("../../interfaces/kio-component");
var path = require("path");
var env = require("../../env/constants");
var stringUtils = require("../../utils/string");
var render_1 = require("./render");
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
        var options = {
            componentType: kio_component_1.KioComponentType.PublicationComponent,
            contentType: args.contentType,
            name: componentName,
            modifiers: args.modifiers || [],
            childTypes: args.childTypes || [],
            dir: path.join(env.KIO_PATHS.components.publication, args.contentType, stringUtils.dasherize(componentName || ''))
        };
        render_1.renderType(options);
    }
};
//# sourceMappingURL=yargs.js.map