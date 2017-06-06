import 'mocha'
import * as path from 'path'
import { KioNodeType } from 'kio-ng2'

import { Observable, Scheduler } from 'rxjs'

import expect, { assertExists } from '../assert'
import { resolveKioPath, resolveRoot } from '../env'
import * as stringUtil from '../utils/string'
import assertFs from '../assert/fs';

import { env as kioEnv, EnvStore, Project } from 'kio-ng2-env'
import { 
  ComponentStructure, ComponentFragmentStructure, 
  isComponentFragmentStructure, isComponentStructure,
  NamedComponent, NamedComponentStructure, NamedFragmentComponentStructure,
  isNamedFragmentComponentStructure, isNamedComponentStructure ,
  Query, isQueryableAnnotation, isQueryableFragmentAnnotation
} from 'kio-ng2-component-routing'

import * as testComponents from './testComponents'


const PUBLICATION_COMPONENT_PATH = resolveRoot(resolveKioPath('publication'))

let projectEnv:EnvStore<Project>
const envData = require(path.join(process.env.KIO_NG2_PROJECT,path.basename(process.env.KIO_NG2_PROJECT)+'.json'))
let components:NamedComponent[]=envData.components

const getStore = ( ) => {
  if ( projectEnv )
  {
    return Promise.resolve(projectEnv)
  }
  return kioEnv().toPromise()
}

const assertComponent = ( component:NamedComponent ) => {

  describe(component.name,()=>{

    const componentName = component.name
    const componentNameDasherized = stringUtil.dasherize(componentName)

    it('has type',()=>{ expect(component).toIncludeKey('type') })
    it('has modifiers',()=>{ expect(component).toIncludeKey('modifiers') })
    component.type === 'fragment' && it('has childTypes',()=>{ expect(component).toIncludeKey('childTypes') })


    describe('query test',()=>{

      let componentTypePath:string = path.join(PUBLICATION_COMPONENT_PATH,component.type)
      let componentFilePath:string = path.join(componentTypePath,stringUtil.dasherize(component.name))

      let componentCriteriaFile = testComponents.resolveComponentFile(component,'criteria')
      let componentFixtureFile = testComponents.resolveComponentFile(component,'fixture')

      let componentFixture = testComponents.componentFixture(component)

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

  })

}

describe('test component testing', () => {

  before(()=>{
    return getStore().then( store => {
      projectEnv = store
    } )
  })

  describe('component reading',()=>{

    describe('kioEnv',()=>{

      it('has globalStore',()=>{
        expect(projectEnv).toExist()
      })

      it('has components',()=>{
        expect(projectEnv.hasKey('components')).toEqual(true)
      })

      it('components',()=>{
        const components = projectEnv.get('components')
        expect(Array.isArray(components)).toEqual(true)
      })

    })   

    describe('resolving',()=>{

      const TEST_COMPONENT:NamedComponent = {
        name: 'TestList',
        type: 'fragment',
        modifiers: [ 'list' ],
        childTypes: ['src','txt']
      }

      it(`resolves folder name "${stringUtil.dasherize(TEST_COMPONENT.name)}"`,()=>{
        const folderName = testComponents.componentFolderName(TEST_COMPONENT)
        expect(folderName).toEqual(stringUtil.dasherize(TEST_COMPONENT.name))
      })


    })

  })

 before(()=>{
    return getStore().then ( store => {
      components = store.get('components')
    } )
  })

  describe(components.length+' components',async()=>{

    components.forEach ( (component:NamedComponent) => {

      assertComponent(component)

    } )

  })
})

