import 'mocha'
import * as env from './constants'
import * as path from 'path'
import expect, { assertExists } from '../assert';
import assertFs from '../assert/fs';


describe('test env',function(){

  describe('cli not installed',function(){

    describe('constants',function(){

      it(`KIO_PROJECT_ROOT "${env.KIO_PROJECT_ROOT}"`,()=>{

        expect(env.KIO_PROJECT_ROOT).toExist()

      })


    })

  })

})
