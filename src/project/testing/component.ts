import 'mocha'
import { Observable } from 'rxjs'
import expect, { assertExists } from '../../assert'
import assertFs from '../../assert/fs';
import { it, describe } from '../../assert/reporting';
import * as path from 'path'
import { env as kioEnv, EnvStore, Project } from 'kio-ng2-env'
import { 
  Query, isQueryableAnnotation, isQueryableFragmentAnnotation
} from 'kio-ng2-component-routing'
import { NamedComponent, ComponentStructure, ComponentFragmentStructure, ComponentFixture, isNamedComponentStructure, isNamedFragmentComponentStructure } from 'kio-ng2-data'

import { resolveKioPath, resolveRoot } from '../../env'
import { EnvFile } from '../../env/file.class'

import * as stringUtil from '../../utils/string'
import { resolveComponentFile, getComponentFixture } from './resolve'

const PUBLICATION_COMPONENT_PATH = resolveRoot(resolveKioPath('publication'))

export interface ComponentTestPaths {
  projectRoot:string
  publicationComponents:string
}

export class ComponentTests {

  constructor(readonly projectPath:string)
  {
    if ( !projectPath )
    {
      throw Error ('project path is undefined.' )
    }
    this.env = EnvFile.FromProjectPath (projectPath)
    this.components = Observable.from(this.env.components)
  }
  
  protected env:EnvFile

  components:Observable<NamedComponent>

  assertComponent( component:NamedComponent ) {

    const otherComponents = this.env.components

    describe(component.name,()=>{

      const componentName = component.name
      const componentNameDasherized = stringUtil.dasherize(componentName)

      it('has type',()=>{ expect(component).toIncludeKey('type') })
      it('has modifiers',()=>{ expect(component).toIncludeKey('modifiers') })
      component.type === 'fragment' && it('has childTypes',()=>{ expect(component).toIncludeKey('childTypes') })


      describe('query test',()=>{

        let componentTypePath:string = path.join(PUBLICATION_COMPONENT_PATH,component.type)
        let componentFilePath:string = path.join(componentTypePath,stringUtil.dasherize(component.name))

        let componentCriteriaFile = resolveComponentFile(component,'criteria')
        let componentFixtureFile = resolveComponentFile(component,'fixture')

        let componentFixture = getComponentFixture(component)

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

          const queryResult = Query.assertComponent(component)(<any>componentFixture)
          expect(queryResult).toNotExist(queryResult ? queryResult.join('\n') : undefined)

        })

      })

      otherComponents && describe('interference tests',()=>{

        let componentFixture = <any>getComponentFixture(component)

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

    })

  }

}