import { Observable, Scheduler } from 'rxjs'

export interface ComponentTest {
  name:string;
  criteria:any;
  fixture:any;
}


export class TestRunner {

  constructor(){

  }

  componentTests:ComponentTest[]=[]

  addTest(componentTest:ComponentTest):ComponentTest{
    this.componentTests.push(componentTest)
    return componentTest
  }

  protected runTest ( componentTest:ComponentTest ):Observable<string> {
    return Observable.of(`running test ${componentTest.name}`)
  }

  run():Observable<string> {
    return Observable.from(this.componentTests, Scheduler.queue )
        .flatMap ( componentTest => {
          return this.runTest ( componentTest )
        } )
  }

}