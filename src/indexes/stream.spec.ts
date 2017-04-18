import 'mocha'
import expect, { assertExists } from '../assert';
import { Observable } from 'rxjs'

import * as logger from '../console'

import * as stream from './stream'
import { cachedComponents } from '../cache'
import * as compCache from '../cache/types/components'

import { logObserver } from '../utils/rx/log'

describe('test index stream',()=>{
  it('is observable',(done)=>{
    expect(stream.IndexNames).toBeAn(Observable)
    stream.IndexNames.subscribe(
        ( value ) => {
          logger.log('IndexName: %s', value)
        },
        ( error ) => done(error),
        done
      )
  })
})

export interface Done {
  (error?:any):void
}

const assertObs = (obs:Observable<any>,done:Done) => {
  const subs = obs.subscribe((v)=>{

  },(e)=>{
    done(e)
  },()=>{
    subs && subs.unsubscribe()
    done()
  })
  return subs
}

describe('cachedComponents',function(){
  this.timeout(10*1000)

  it('observable',(done)=>{

    const obs = compCache.Components()
    logObserver(obs)
    return obs.subscribe((value)=>{
        //console.log('value %s',value)
      },
      (error)=>{
        logger.logError(error)
      },
      ()=>done())

  })

  it('filters',(done)=>{
    const obs = compCache.Components().filter(stream.filterStream("criteria"))
    logObserver(obs)
    return assertObs(obs,done)
  })
})