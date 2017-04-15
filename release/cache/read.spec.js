"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var assert_1 = require("../assert");
var fs = require("fs");
var store_1 = require("./store");
var read_1 = require("./read");
var NUM_PUBLICATION_COMPONENTS = fs.readdirSync(store_1.resolve('components', 'publication')).filter(function (item) { return /^\./.test(item) === false; }).length;
describe('read cache', function () {
    it('reads cache for publication', function () {
        var comps = read_1.readCache("components", "publication");
        assert_1.default(comps).toBeAn(Array);
        assert_1.default(comps).toHaveLength(NUM_PUBLICATION_COMPONENTS, "got " + comps.length);
    });
});
//# sourceMappingURL=read.spec.js.map