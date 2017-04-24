"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var project = require("../project");
var logger = require("../console");
exports.testComponentsCommand = {
    command: 'testComponents',
    aliases: ['test'],
    describe: 'Tests criteria matching for components',
    handler: function (args) {
        var command = args._[0];
        logger.log('Running component tests');
        var t = setInterval(function () {
            console.log('check interval');
        }, 1000);
        return project.testComponents(args)
            .toPromise()
            .then(function (result) {
            console.log('tests finished', result);
            clearInterval(t);
        });
    }
};
//# sourceMappingURL=testComponents.js.map