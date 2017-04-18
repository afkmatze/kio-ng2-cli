import { logObserver } from './log'

import * as env from '../../env'
import * as logger from '../../console'

import 'mocha'
import expect from 'ceylon';

import * as rxfs from './fs'


describe('test rxfs',()=>{

  describe('rxfs.findFiles',function(){

    this.timeout(10 * 1000)

    let firstFile

    it('finds files',()=>{
      return rxfs.findFiles(env.KIO_PROJECT_ROOT,/\.ts$/).toPromise().then ( result => {
        console.log('result',result)
        firstFile = result
      } )
    })

    it('gets stat',()=>{
      return logObserver(rxfs.readstats(firstFile)).toPromise()
    })
    
    xit('readdir',()=>{
      const obs = logObserver(rxfs.readdir(env.KIO_PROJECT_ROOT))
      return obs.toPromise().then ( result => {
        console.log('result',result)
      } )
    })

  })

})