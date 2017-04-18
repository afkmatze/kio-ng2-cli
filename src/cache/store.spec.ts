import 'mocha'
import expect from '../assert'

import { CacheType } from './enums'
import * as store from './store'

describe('test cache store',() => {

  it('inits',()=>{
    const p = store.ensure("components")
  })

})
