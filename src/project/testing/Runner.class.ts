import { Observable, Scheduler } from 'rxjs'
import expect, { assertExists } from '../../assert'
import assertFs from '../../assert/fs';
import { it, describe } from '../../assert/reporting';
import { 
  ComponentFixture, NamedComponent, 
  isQueryableAnnotation, isQueryableFragmentAnnotation,
  Query
} from 'kio-ng2-component-routing'
import { env as kioEnv, EnvStore, Project } from 'kio-ng2-env'
import * as path from 'path'

import { getComponentFixtures } from './resolve'
import { resolveKioPath, resolveRoot } from '../../env'
import { EnvFile } from '../../env/file.class'

import * as stringUtil from '../../utils/string'
import { resolveComponentFile, getComponentFixture } from './resolve'
import * as logger from '../../console'

const PUBLICATION_COMPONENT_PATH = resolveRoot(resolveKioPath('publication'))

export interface ComponentTest {
  component:NamedComponent
  fixture:ComponentFixture;
}

export interface TestFixture {
  componentName:string
  fixture:ComponentFixture
}


export class TestRunner {

  constructor(protected components:NamedComponent[]){}

  private _components:ComponentTest[]
  private _fixtures:TestFixture[]


  get fixtures():Observable<TestFixture> {
    if ( this._fixtures )
    {
      return Observable.from(this._fixtures)
    }
    return getComponentFixtures(this.components).map ( fixtures => {
      this._fixtures = fixtures.map ( (fixture:ComponentFixture,idx) => ({
        componentName: this.components[idx].name,
        fixture
      }) )
      return this._fixtures
    } )
    .concatMap( fixtures => Observable.from(fixtures) )
  }

  getComponentForFixture ( fixture:TestFixture ) {
    return this.components.find ( c => c.name === fixture.componentName )
  }

  mapFixtureToTest ( testFixture:TestFixture ):ComponentTest {
    return {
      component: this.getComponentForFixture(testFixture),
      fixture: testFixture.fixture
    }
  }

  get componentTests():Observable<ComponentTest> {
    return this.fixtures.map ( (testFixture) => this.mapFixtureToTest(testFixture) )
  }

  testComponent ( component:NamedComponent ) {
    logger.log( 'Testing component "%s"', component.name )

  }

  run ():Observable<string> {
    return this.fixtures.toArray()
        .map ( testFixtures => {
          return `${testFixtures.length} test fixtures`
        } )
  }


  assertComponent( component:NamedComponent ) {

    const otherComponents = this.components

    logger.log('Asserting component "%s"', component.name)

    const componentFixtureTest = this._fixtures.find ( (fixture:TestFixture) => fixture.componentName === component.name )
    const componentFixture = componentFixtureTest.fixture
    console.log('fixture',componentFixture)

    describe(component.name,()=>{
      const componentName = component.name
      const componentNameDasherized = stringUtil.dasherize(componentName)

      it('has type',()=>{ expect(component).toIncludeKey('type') })
      it('has modifiers',()=>{ expect(component).toIncludeKey('modifiers') })
      component.type === 'fragment' && it('has childTypes',()=>{ expect(component).toIncludeKey('childTypes') })

      let componentTypePath:string = path.join(PUBLICATION_COMPONENT_PATH,component.type)
      let componentFilePath:string = path.join(componentTypePath,stringUtil.dasherize(component.name))

      let componentCriteriaFile = resolveComponentFile(component,'criteria')
      let componentFixtureFile = resolveComponentFile(component,'fixture')


      describe('query test',()=>{

        it('is queryable',()=>{
          expect ( isQueryableAnnotation(component) || isQueryableFragmentAnnotation(component) ).toEqual(true)
        })

        it(`criteria exists "${componentCriteriaFile}"`,()=>{
          assertFs(resolveRoot(componentCriteriaFile)).toExist()
        })

        it(`fixture exists "${componentFixtureFile}"`,()=>{
          assertFs(resolveRoot(componentFixtureFile)).toExist()
        })

        it(`can resolve fixture at "${componentFixtureFile}"`,()=>{

          expect(componentFixture).toExist()

        })

        it('fixture matches criteria',()=>{
          console.log('componentFixture',componentFixture)
          console.log('component',component)
          const queryResult = Query.assertComponent(component)(<any>componentFixture)
          expect(queryResult).toNotExist(queryResult ? queryResult.join('\n') : undefined)

        })

      })
/*
      otherComponents && describe('interference tests',()=>{

        otherComponents.forEach ( otherComponent => {
          if ( otherComponent !== component )
          {
            it(`does not interfere with "${otherComponent.name}"`, () => {            
              
              const queryResult = Query.assertComponent(otherComponent)(componentFixture)
              expect(Array.isArray(queryResult)).toBeTrue('queryResult should be an array.')
            })
          }
        } )

      })
*/
    })

  }

}