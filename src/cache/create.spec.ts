import 'mocha'
import expect from '../assert'

import { CacheType } from './enums'
import { createCache } from './create'

describe('create cache',() => {

  it('creates',()=>{
    return createCache("components")
  })

})
