"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var TestRunner = (function () {
    function TestRunner() {
        this.componentTests = [];
    }
    TestRunner.prototype.addTest = function (componentTest) {
        this.componentTests.push(componentTest);
        return componentTest;
    };
    TestRunner.prototype.runTest = function (componentTest) {
        return rxjs_1.Observable.of("running test " + componentTest.name);
    };
    TestRunner.prototype.run = function () {
        var _this = this;
        return rxjs_1.Observable.from(this.componentTests, rxjs_1.Scheduler.queue)
            .flatMap(function (componentTest) {
            return _this.runTest(componentTest);
        });
    };
    return TestRunner;
}());
exports.TestRunner = TestRunner;
//# sourceMappingURL=Runner.class.js.map