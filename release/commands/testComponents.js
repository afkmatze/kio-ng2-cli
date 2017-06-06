"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var project_1 = require("../project");
var logger = require("../console");
exports.testComponentsCommand = function () { return ({
    command: 'testComponents',
    aliases: ['test'],
    describe: 'Tests criteria matching for components',
    handler: function (args) {
        var command = args._[0];
        logger.log('Running component tests');
        var t = setInterval(function () {
            console.log('check interval');
        }, 1000);
        return project_1.default().testComponents(args)
            .catch(function (error) {
            console.error(error);
            return rxjs_1.Observable.throw(error);
        })
            .toPromise()
            .then(function (result) {
            console.log('tests finished', result);
            clearInterval(t);
        });
    }
}); };
//# sourceMappingURL=testComponents.js.map