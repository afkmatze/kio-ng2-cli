import expect from 'ceylon';

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


export default expect