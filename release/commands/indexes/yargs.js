"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env = require("../../env/constants");
var api = require("../../api");
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
        args.filter.forEach(function (filterValue) {
            api.writeIndex(filterValue, args["no-cache"] === false);
            //writeComponentsToIndex(path.join(env.KIO_PROJECT_ROOT,env.KIO_PATHS.root),stringUtils.classify(filterValue+'Components'),files)
        });
        //console.log('files',args)
    }
};
//# sourceMappingURL=yargs.js.map