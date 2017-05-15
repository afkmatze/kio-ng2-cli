"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var project = require("../project");
var env = require("../env");
var parseArgs_1 = require("./parseArgs");
exports.buildIndexesCommand = function () { return ({
    command: 'buildIndexes',
    aliases: ['index'],
    describe: 'Updates index files in ' + env.resolveKioPath(),
    builder: function (argv) {
        return argv
            .usage('Usage: $0 index [publication|structure|fixture|criteria]')
            .option('filter', {
            alias: 'f',
            choices: ['publication', /*'navigation','structure',*/ 'fixture', 'criteria'],
            default: ['publication', /*'navigation','structure',*/ 'fixture', 'criteria'],
            coerce: parseArgs_1.parseList,
            demand: true
        });
    },
    handler: function (args) {
        var command = args._[0];
        console.log('filter', args.filter);
        return project.buildIndexes(args).toPromise()
            .catch(function (error) {
            console.error(error);
        });
    }
}); };
//# sourceMappingURL=buildIndexes.js.map