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
var env = require("../env");
var path = require("path");
var console_1 = require("../console");
var yargs = require("yargs");
var project = require("../project");
exports.BUILD_INDEXES = "indexes";
exports.CREATE_COMPONENT = "component";
/** CREATE COMPONENT */
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
        return project.createComponent(__assign({}, args, { name: componentName })).toPromise()
            .catch(function (error) {
            console.error(error);
        });
    }
};
exports.buildIndexesCommand = {
    command: 'buildIndexes',
    aliases: ['index'],
    describe: 'Updates index files in ' + env.KIO_PATHS.root,
    builder: function (argv) {
        return argv
            .usage('Usage: $0 index [publication|structure|fixture|criteria]')
            .option('filter', {
            alias: 'f',
            choices: ['publication', 'navigation', 'structure', 'fixture', 'criteria'],
            default: ['publication', 'navigation', 'structure', 'fixture', 'criteria'],
            demand: true
        });
    },
    handler: function (args) {
        var command = args._[0];
        return project.buildIndexes(args).toPromise()
            .catch(function (error) {
            console.error(error);
        });
    }
};
exports.exec = function (command) {
    console_1.banner();
    if (!env.KIO_PROJECT_ROOT || path.basename(env.KIO_PROJECT_ROOT) === 'kio-ng2-cli') {
        console_1.logError(Error("kio-ng2-cli must be run as an installed module."));
    }
    if (!env.KIO_PROJECT_PACKAGE || !env.KIO_PROJECT_PACKAGE.kio) {
        console_1.logError(Error("package.json is missing config at prop 'kio'"));
    }
    /*
      if(!command) {
        logError(Error("Command required."))
      }*/
    var all_filter = ['publication', 'navigation', 'structure'];
    var argv = yargs
        .usage('Usage: $0 <command> [options]')
        .options('config-file', {
        type: 'string',
        description: 'cli config file',
        default: path.resolve('kio-ng2.config.json')
    })
        .command(exports.createComponentCommand)
        .command(exports.buildIndexesCommand)
        .demand(1)
        .help('h')
        .argv;
    //console.log('argv', argv)
    /*switch (command) {
      case BUILD_INDEXES:
        return cmd_indexes.main ( env )
        break;
  
      case CREATE_COMPONENT:
        return cmd_component.main ( env )
        break;
      
      default:
        throw Error("Unknown command \"" + command + "\"")
        break;
    }*/
};
//# sourceMappingURL=index.js.map