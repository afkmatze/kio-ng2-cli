"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var path = require("path");
var Runner_class_1 = require("./Runner.class");
var envData = require(path.join(process.env.KIO_NG2_PROJECT, path.basename(process.env.KIO_NG2_PROJECT) + '.json'));
var components = envData.components;
describe('test TestRunner', function () {
    var testRunner = new Runner_class_1.TestRunner(components);
    this.timeout(30 * 1000);
    it('reads fixtures', function (done) {
        testRunner.fixtures.subscribe(function (fixtures) {
            console.log('fixtures', JSON.stringify(fixtures, null, '  '));
        }, done, done);
    });
});
//# sourceMappingURL=Runner.class.spec.js.map