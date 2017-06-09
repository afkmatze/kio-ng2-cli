import 'mocha'
import expect, { assertExists } from '../../assert'

import * as path from 'path'
import { Observable, Scheduler } from 'rxjs'

import { TestRunner } from './Runner.class'
import { 
  NamedComponent
} from 'kio-ng2-component-routing'

const envData = require(path.join(process.env.KIO_NG2_PROJECT,path.basename(process.env.KIO_NG2_PROJECT)+'.json'))
let components:NamedComponent[]=envData.components

describe('test TestRunner',function(){

  const testRunner = new TestRunner(components)

  this.timeout(30 * 1000)

  it('reads fixtures',(done)=>{

    testRunner.fixtures.subscribe ( fixtures => {
      console.log('fixtures',JSON.stringify(fixtures,null,'  '))
    }, done, done )

  })

})