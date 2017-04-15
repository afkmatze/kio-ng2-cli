import 'mocha'
import expect, { shellFlag, assertExists } from '../assert'

import * as constants from './constants'

describe('env constants',()=>{

  it('KIO_PROJECT_ROOT exists at ' + constants.KIO_PROJECT_ROOT,()=>{

    assertExists(constants.KIO_PROJECT_ROOT)

  })

  it('KIO_PROJECT_PACKAGE is valid',()=>{
    expect(constants.KIO_PROJECT_PACKAGE).toExist()    
  })

  it('resolves project path',()=>{
    expect(constants.resolve.bind(constants,'package.json')).toNotThrow()
  })

  it('KIO_PROJECT_CACHE is set',()=>{
    expect(constants).toContainKey('KIO_PROJECT_CACHE')
  })

  it('TEMPLATES is set',()=>{
    expect(constants).toContainKey('TEMPLATES')
  })


  describe('KIO_PATHS',()=>{
    it('KIO_PATHS is set',()=>{
      expect(constants).toContainKey('KIO_PATHS')
    })

    describe('KIO_PATHS.root',()=>{
      it('exists',()=>{
        assertExists(constants.KIO_PATHS.root)
      })

      it('is absolute path',()=>{
        expect(constants.KIO_PATHS.root).toMatch(/^\//)
      })
      
    })

    describe('KIO_PATHS.components.publication',()=>{
      it('exists',()=>{
        assertExists(constants.KIO_PATHS.components.publication)
      })

      it('is absolute path',()=>{
        expect(constants.KIO_PATHS.components.publication).toMatch(/^\//)
      })
      
    })

    describe('KIO_PATHS.components.navigation',()=>{
      it('exists',()=>{
        assertExists(constants.KIO_PATHS.components.navigation)
      })

      it('is absolute path',()=>{
        expect(constants.KIO_PATHS.components.navigation).toMatch(/^\//)
      })
      
    })

    describe('KIO_PATHS.components.structure',()=>{
      it('exists',()=>{
        assertExists(constants.KIO_PATHS.components.structure)
      })

      it('is absolute path',()=>{
        expect(constants.KIO_PATHS.components.structure).toMatch(/^\//)
      })
      
    })
  })

})
