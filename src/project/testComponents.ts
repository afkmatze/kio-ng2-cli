import { Observable, Scheduler } from 'rxjs'
import * as path from 'path'
import { ExecData } from 'rxfs'

import { 
  NamedComponent, NamedComponentStructure, NamedFragmentComponentStructure,
  ComponentFixture
} from 'kio-ng2-component-routing'
import { env as kioEnv, EnvStore, Project } from 'kio-ng2-env'
import { resolveKioPath, resolveRoot } from '../env'
import * as stringUtil from '../utils/string'


import { 
  ProjectEnv,
  CLICommandArgs, CLICommandArgsBuildIndexes, CLICommandArgsTestComponents, CLICommandArgsCreateComponent,
  IndexType, IndexTypes
} from './interfaces'

import testRunner, { ComponentTest, renderTests, execTestAt } from './testing'

/**
 * @brief      resolve component's folder name
 *
 * @param      component  The component
 *
 * @return     dasherized folder name for component
 */
export const componentFolderName = ( component:NamedComponent ):string => {
  return stringUtil.dasherize(component.name)
}

export const resolveComponentPath = ( component:NamedComponent ) => {
  return path.join(resolveKioPath('publication'),component.type,componentFolderName(component))
}

export const resolveComponentFile = ( component:NamedComponent, componentFileType:'fixture'|'criteria'|'component'|'spec'='component' ):string => {
  const baseName = path.join(resolveComponentPath(component),componentFolderName(component))
  if ( componentFileType === 'component' )
  {
    return [baseName,componentFileType,'ts'].join('.')
  }
  return [baseName,'component',componentFileType,'ts'].join('.')
}

export const componentFixture = ( component:NamedComponent ):ComponentFixture => {
  const fixtureFile = resolveComponentFile(component,'fixture')
  const fixtureModule = require(resolveRoot(fixtureFile))
  return fixtureModule.Fixture
}

export const listComponents = ( ):Observable<NamedComponent[]> => {
  return kioEnv().map ( store => store.get('components') )
}

export const getComponentFixture = ( component:NamedComponent ) => resolveComponentFile(component, 'fixture')

export const testComponents = (projectPath:string) => ( args:CLICommandArgsTestComponents ) => {
  const targetFilepath = path.join(path.resolve( projectPath,'./src/app'),'ComponentTests.spec.ts')
  console.log('writing spec file at "%s"', targetFilepath )
  return renderTests(targetFilepath)
          .map( (row,idx) => {
            console.log('item %s\n----\n', idx, row, '\n----\n')
            return row
          } ).flatMap(
            row => execTestAt(targetFilepath)
          )

  /*return Observable.zip(
      files.filesForIndexType(IndexTypes.fixture),
      files.filesForIndexType(IndexTypes.criteria)
    ).toArray()
  */
  
}
