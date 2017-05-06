"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var stringUtils = require("./string");
describe('test string utils', function () {
    describe('test diff', function () {
        var diffStrings = [
            'foo\nbar\nbla',
            'foo\nfoo\nbla'
        ];
        it('diffs', function () {
            return stringUtils.diff.apply(stringUtils, diffStrings).toPromise().then(console.log);
        });
    });
});
//# sourceMappingURL=string.spec.js.map