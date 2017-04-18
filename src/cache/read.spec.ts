import 'mocha'
import expect from '../assert'
import * as fs from 'fs'
import { resolve } from './store'

import { CacheType } from './enums'
import { readCache } from './read'

const NUM_PUBLICATION_COMPONENTS = fs.readdirSync(resolve('components','publication')).filter(item=>/^\./.test(item)===false).length

describe('read cache',() => {

  it('reads cache for publication',()=>{
    const comps = readCache("components","publication")
    expect(comps).toBeAn(Array)
    expect(comps).toHaveLength(NUM_PUBLICATION_COMPONENTS,`got ${comps.length}`)
  })

})
