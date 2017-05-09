"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var project = require("../project");
var env = require("../env");
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
//# sourceMappingURL=buildIndexes.js.map