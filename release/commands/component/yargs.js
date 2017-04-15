"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var components_1 = require("../../components");
var path = require("path");
var env = require("../../env/constants");
var stringUtils = require("../../utils/string");
var api = require("../../api");
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
            componentType: components_1.KioComponentType.PublicationComponent,
            contentType: args.contentType,
            name: componentName,
            modifiers: args.modifiers || [],
            childTypes: args.childTypes || [],
            dir: path.join(env.KIO_PATHS.components.publication, args.contentType, stringUtils.dasherize(componentName || ''))
        };
        /*
            renderType(options)*/
        var component = components_1.createWithData(options);
        api.renderPublicationComponent(component);
    }
};
//# sourceMappingURL=yargs.js.map