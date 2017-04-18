import { findComponents } from './find'
import { Observable, Scheduler } from 'rxjs'
import { Component, PublicationComponent } from './classes'
import { components } from './'
import { fetch as fetchFromCache } from './source/cache/stream'
import * as source from './source/source'

import { logObserver } from '../utils/rx/log'

import * as env from '../env'
import * as logger from '../console'

import 'mocha'
import expect from 'ceylon';

describe('test components',() => {

  xdescribe('simple fetch',()=>{
    it('fetchFromCache',( ) => {
      const obs = fetchFromCache()
      obs.subscribe((value)=>{
        console.log('value:')
        console.log(value)
      })
      return obs.toPromise()
    })
  })


  describe('component sources',()=>{

    describe('cache',()=>{

      it ( 'gets stream', ()=>{
        const cacheSource = source.getSource('cache')
        expect(cacheSource).toBeAn(Observable)
      } )

      it ( 'reads stream', ()=>{
        const cacheSource = source.getSource('cache')
        //return logObserver(cacheSource).toPromise()
        return cacheSource.toPromise()
      } )

    })
    
    describe('tsc',function(){
      this.timeout(30*1000)

      it ( 'compiles', ()=>{
        const tsc = source.tscStream.prepare()
        return tsc.toPromise()
      } )

      it ( 'reads stream', ()=>{
        const tscSource = source.getSource('tsc')
        return tscSource.toPromise()
      } )


    })

  })


})
