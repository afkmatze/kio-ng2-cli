"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("chai");
var shelljs = require("shelljs");
exports.shellCheck = function (testFlag, value) {
    return shelljs.exec("[[ " + testFlag + " " + value + " ]]").code === 0;
};
/*declare global {
  namespace Chai {
    interface Assertion {

    }
  }
}*/
var shellFlag = function (chaiApi, utils) {
    chaiApi.Assertion.addMethod(chaiApi.Assertion.prototype, 'shellFlag', function (sf) {
        var obj = utils.flag(this, 'string');
        new chaiApi.Assertion(exports.shellCheck(sf, obj)).to.be.equal(0);
    });
};
chai.use(shellFlag);
chai.use(function (chaiApi, utils) {
    var Assertion = chaiApi.Assertion;
    Assertion.addProperty(Assertion.prototype, 'directory', function () {
        var obj = utils.flag(this, 'string');
        new Assertion(obj).to.be.shellFlag('-d');
    });
});
//# sourceMappingURL=chai.js.map