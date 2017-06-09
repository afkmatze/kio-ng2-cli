"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env = require("../env");
var logger = require("../console");
var Runner_class_1 = require("../project/testing/Runner.class");
var file_class_1 = require("../env/file.class");
exports.testComponentsCommand = function () { return ({
    command: 'testComponents',
    aliases: ['test'],
    describe: 'Tests criteria matching for components',
    handler: function (args) {
        var command = args._[0];
        logger.log('Running component tests');
        var envFile = file_class_1.EnvFile.FromProjectPath(env.moduleRoot());
        //const componentTest = new ComponentTests(env.moduleRoot())
        setTimeout(function () {
            console.log('timeout');
        }, 5000);
        var testRunner = new Runner_class_1.TestRunner(envFile.components);
        testRunner.fixtures.subscribe(function (fixture) {
            var componentTest = testRunner.mapFixtureToTest(fixture);
            logger.log('Test component: ' + componentTest.component.name);
            testRunner.assertComponent(componentTest.component);
        }, function (error) {
            console.error(error);
            process.exit(1);
        }, function () {
            process.exit();
        });
    }
}); };
//# sourceMappingURL=testComponents.js.map