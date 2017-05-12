"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var project = require("../project");
exports.createProjectCommand = function () { return ({
    command: 'createProject',
    aliases: ['new'],
    describe: 'Creates a new kio digitorial project with angular 2',
    builder: function (argv) {
        return argv
            .usage('Usage: $0 <command> <ProjectName>')
            .demand(1);
    },
    handler: function (args) {
        var _a = args._, command = _a[0], projectName = _a[1];
        var sub = project.createProject({
            name: projectName
        }).subscribe(function (value) { }, function (error) {
            console.error(error);
        }, function () {
            if (sub) {
                sub.unsubscribe();
            }
        });
    }
}); };
//# sourceMappingURL=createProject.js.map