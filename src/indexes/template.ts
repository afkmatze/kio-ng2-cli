import { IndexName, IndexType, ComponentIndex } from './interfaces'
import { KioComponentFileType } from '../components/interfaces'
import { IndexTemplateData, ComponentImport } from '../template'
import { ComponentModel } from '../components'
import * as stringUtils from '../utils/string'
import * as env from '../env/constants'
import * as path from 'path'

// TODO: map fixture and criteria

const mapIndexNameToFileType:Map<IndexName,KioComponentFileType> = new Map()
mapIndexNameToFileType.set("fixture","fixture")
mapIndexNameToFileType.set("criteria","criteria")
mapIndexNameToFileType.set("publication","component")
mapIndexNameToFileType.set("navigation","component")
mapIndexNameToFileType.set("structure","component")

const mapComponentToComponentImport = (fileType:KioComponentFileType) => ( component:ComponentModel ):ComponentImport => {
  const filePath = component.getFile(fileType)
  const componentImport:ComponentImport = {
    importName: component.name+'Component',
    importPath: './'+path.relative(env.KIO_PATHS.root,component.getFile(fileType)).replace(/\.\w+$/,'')
  }
  return componentImport
}

export const dataForIndex = ( componentIndex:ComponentIndex ):IndexTemplateData => {
  //console.log('dataForIndex',componentIndex)

  const data:IndexTemplateData = {
    exportName: stringUtils.classify([componentIndex.name,'components'].join('-')),
    components: componentIndex.components.map ( mapComponentToComponentImport(mapIndexNameToFileType.get(componentIndex.name)))
  }
  if ( componentIndex.name === "fixture" )
  {
    data.components.forEach ( component => {
      component.importAlias = 'Fixture'
    } )
    data.exportName = 'Fixtures'
  }
  else if ( componentIndex.name === "criteria" )
  {
    data.components.forEach ( component => {
      component.importAlias = 'Criteria'
    } )

    data.exportName = 'Criterias'
  }
  return data
}