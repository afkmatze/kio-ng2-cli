"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var env = require("./constants");
var assert_1 = require("../assert");
describe('test env', function () {
    describe('cli not installed', function () {
        describe('constants', function () {
            it("KIO_PROJECT_ROOT \"" + env.KIO_PROJECT_ROOT + "\"", function () {
                assert_1.default(env.KIO_PROJECT_ROOT).toExist();
            });
        });
    });
});
//# sourceMappingURL=env.spec.js.map