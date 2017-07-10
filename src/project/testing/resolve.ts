import { Observable } from 'rxjs'
import { resolveKioPath, resolveRoot } from '../../env'
import { req, reqGroup } from './tsc'
import { env as kioEnv, EnvStore, Project } from 'kio-ng2-env'
import * as path from 'path'
import * as stringUtil from '../../utils/string'
import { 
  NamedComponent, ComponentAnnotation, ComponentStructure, ComponentFragmentStructure, isComponentStructure, isComponentFragmentStructure
} from 'kio-ng2-data'

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

export const getComponentFixture = ( component:NamedComponent ):ComponentStructure => {
  const fixtureFile = resolveComponentFile(component,'fixture')
  const fixtureModule = req<{Fixture:ComponentStructure}>(resolveRoot(fixtureFile))
  return fixtureModule.Fixture
}

export const getComponentFixtures = ( components:NamedComponent[] ):Observable<ComponentStructure[]> => {
  return reqGroup(components.map ( component => {
    const fixtureFile = resolveComponentFile(component,'fixture')
    return resolveRoot(fixtureFile)
  } )).map ( contents => contents.map ( content => content.Fixture ) )
}

export const listComponents = ( ):Observable<NamedComponent[]> => {
  return kioEnv().map ( store => store.get('components') )
}

export const getComponentFixtureFile = ( component:NamedComponent ) => resolveComponentFile(component, 'fixture')
