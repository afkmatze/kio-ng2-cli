"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
require("../assert/chai");
var chai_1 = require("chai");
var store = require("./store");
describe('test cache store', function () {
    it('inits', function () {
        var p = store.resolve("components");
        console.log('p', p);
        chai_1.expect(p).to.be.a.directory();
    });
});
//# sourceMappingURL=store.spec.js.map