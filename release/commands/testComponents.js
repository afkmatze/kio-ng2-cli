"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env = require("../env");
var logger = require("../console");
var component_1 = require("../project/testing/component");
exports.testComponentsCommand = function () { return ({
    command: 'testComponents',
    aliases: ['test'],
    describe: 'Tests criteria matching for components',
    handler: function (args) {
        var command = args._[0];
        logger.log('Running component tests');
        var componentTest = new component_1.ComponentTests(env.moduleRoot());
        componentTest.components.subscribe(function (component) {
            logger.log('Test component: ' + component.name);
            componentTest.assertComponent(component);
        });
    }
}); };
//# sourceMappingURL=testComponents.js.map