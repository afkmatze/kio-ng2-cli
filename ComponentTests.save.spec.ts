import 'mocha'
import { Observable, Scheduler } from 'rxjs'
import expect from 'ceylon'
import * as kio from 'kio-ng2-component-routing'

import { PublicationFixtures } from './test_target/src/app/kio/PublicationFixtures.generated'
import { PublicationCriterias } from './test_target/src/app/kio/PublicationCriterias.generated'




const assertComponent = ( componentName:string ) => {

  describe(componentName,()=>{

    let fixture
    let criteria

    before(()=>{
      const storeItem = kio.store.find(item => item.componentName === componentName )
      fixture = storeItem.fixture
      criteria = storeItem.criteria
    })

    it ( 'has fixture', () => {
      expect(fixture).toExist()
    } )

    it ( 'has criteria', () => {
      expect(fixture).toExist()
    } )

    it ( 'they match', () =>{
      const assertions:string[] = kio.assertComponent(criteria)(fixture)
      expect(assertions).toNotExist()
    } )

    describe('testing interference',()=>{

      kio.store.eachItem((otherItem,idx)=>{

        const otherFixture = PublicationFixtures[idx]
        const otherCriteria = otherItem.criteria
        const otherComponentName = otherItem.componentName

        if ( otherComponentName !== componentName )
        {
          it(`\x1b[0;2;1m${otherComponentName}\x1b[0;2m fixture does \x1b[0;1mnot\x1b[0;2m match criteria`,()=>{
            const result = kio.assertComponent(criteria)(otherFixture)
             expect(result).toExist()
          })
        }

      })

    })

  })

}

describe('testing components',function(){

  let allTests:any[]

  before(()=>{
    return Observable.zip(
        Observable.from(PublicationFixtures),
        Observable.from(PublicationCriterias)
      )
    .map ( ([fixture,criteria]) => {
      return ({
        fixture,
        criteria
      })
    } )
    .toArray()
    .toPromise()
    .then ( testData => {
      allTests = testData
    } )

  })

  assertComponent('BigPic')


})