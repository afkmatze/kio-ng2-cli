import 'mocha'
import expect, { shellFlag, assertExists } from '../assert'

import * as path from './path'
import * as constants from './constants'

describe('path',()=>{

  describe('resolveFull',()=>{

    const ABS_HOME_KIO_ROUTER = "/Users/tEErohr/Projects/afkm/kio/digit-pvz/src/app/kio/components/kio-router/kio-router.component.ts"
    const ABS_HOME_KIO = "/Users/tEErohr/Projects/afkm/kio/digit-pvz/src/app/kio"
    const ABS_KIO_ROUTER = "/Volumes/Macintosh HD 2/Development/Projects/afkm/kio/digit-pvz/src/app/kio/components/kio-router/kio-router.component.ts"
    const ABS_KIO = "/Volumes/Macintosh HD 2/Development/Projects/afkm/kio/digit-pvz/src/app/kio"

    it('resolves from home to relative path',()=>{
      const result = path.resolveFull(ABS_HOME_KIO_ROUTER)
      expect(result).toEqual(ABS_KIO_ROUTER)
    })
    
    it('resolves from home to relative path',()=>{
      const result = constants.relative(ABS_HOME_KIO_ROUTER)
      expect(result).toEqual(path.relative(ABS_KIO,ABS_KIO_ROUTER))
    })

  })

})

