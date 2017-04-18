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
var env = require("../../env");
var exec_1 = require("./exec");
exports.yargs = {
    command: 'buildIndexes',
    aliases: ['index'],
    describe: 'Updates index files in ' + env.KIO_PATHS.root,
    builder: function (argv) {
        return argv
            .usage('Usage: $0 index [publication|structure|fixture|criteria]')
            .option('no-cache', {
            type: 'boolean',
            default: false,
            describe: 'prevent reading from cache'
        })
            .option('filter', {
            alias: 'f',
            choices: ['publication', 'navigation', 'structure', 'fixture', 'criteria'],
            default: ['publication', 'navigation', 'structure', 'fixture', 'criteria'],
            demand: true
        });
    },
    handler: function (args) {
        var command = args._[0];
        env.config.update(__assign({}, args, { command: command }));
        var subscr = exec_1.default(args).subscribe(function (indexFile) {
            console_1.log('updated "%s"', indexFile);
        }, function (error) {
            console.log('failed with "%s"', error);
            console.error(error);
        }, function () {
            if (subscr) {
                subscr.unsubscribe();
                subscr = null;
            }
        });
        /*args.filter.forEach ( filterValue => {
          api.writeIndex(filterValue,args["no-cache"]===false)
          //writeComponentsToIndex(path.join(env.KIO_PROJECT_ROOT,env.KIO_PATHS.root),stringUtils.classify(filterValue+'Components'),files)
        } )*/
        //console.log('files',args)
    }
};
//# sourceMappingURL=yargs.js.map