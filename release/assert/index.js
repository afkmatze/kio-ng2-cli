"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var extension_1 = require("./extension");
/*declare global {
  namespace Chai {
    interface Assertion {

    }
  }
}*/
/*
const shellFlag = ( chaiApi:any, utils:any ) => {
  chaiApi.Assertion.addMethod(chaiApi.Assertion.prototype,'shellFlag',function(sf){
    var obj = utils.flag(this,'string')
    new chaiApi.Assertion(shellCheck(sf,obj)).to.be.equal(0)
  })
}

chai.use(shellFlag)

chai.use((chaiApi,utils:any)=>{
  var Assertion = chaiApi.Assertion

  Assertion.addProperty(Assertion.prototype,'directory',function(){
    var obj = utils.flag(this, 'string');
    new Assertion(obj).to.be.shellFlag('-d')
  })
})*/
__export(require("./shell"));
__export(require("./fs"));
__export(require("./extension"));
exports.default = extension_1.expect;
//# sourceMappingURL=index.js.map