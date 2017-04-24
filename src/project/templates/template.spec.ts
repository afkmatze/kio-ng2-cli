import 'mocha'
import expect, { assert } from 'ceylon'
import assertFs from '../../assert/fs'
import { Observable, Scheduler } from 'rxjs'
import * as rxfs from '../../utils/rx/fs'

import * as template from './'

const randomInt = (max:number=100,min:number=0) => {
  return Math.floor(Math.random()*(max-min))+min
}

const renderTestContent = () => {
  return `Hello World

This is a bit ${randomInt(100000,1000)} different
`
}

describe('test template',function(){

  describe('replacing',()=>{

    const defaultContent = renderTestContent()

    let sourceFileDefault

    before((done)=>{
      rxfs.tmp.file(defaultContent)
          .toPromise()
          .then ( filename => {
            sourceFileDefault = filename
            done()
          } )
          .catch(done)
    })

    it('does not replace equal content',function(){

      return template.shouldUpdateFile(sourceFileDefault,defaultContent)
        .toPromise()
        .then ( result => {
          expect(result).toNotExist()
        } )

    })


    it('does replace unequal content',function(){

      return template.shouldUpdateFile(sourceFileDefault,renderTestContent())
        .toPromise()
        .then ( result => {
          expect(result).toExist()
        } )

    })


    it('does not updates file with equal content',function(){
      this.timeout(10000)
      const ts = new Date()

      return Observable
          .of(sourceFileDefault).delay(1000)
          .flatMap ( ()=>{
            return template.replaceFile(sourceFileDefault,defaultContent)
              .toPromise()
              .then ( result => {
                assertFs(sourceFileDefault).toNotBeNewerThan(ts)
              } )
          } )
            

    })

    it('does replace unequal content and updates file',function(){
      const ts = new Date()

      return template.replaceFile(sourceFileDefault,renderTestContent())
        .toPromise()
        .then ( result => {
          assertFs(sourceFileDefault).toBeNewerThan(ts)
        } )

    })

  })
  

})