import { IndexName, IndexType, ComponentIndex } from './interfaces'
import { KioComponentFileType } from '../components/interfaces'
import { IndexTemplateData, IndexTemplateDataItem } from '../templates'
import { ComponentModel } from '../components'
import * as stringUtils from '../utils/string'
import * as env from '../env/constants'
import * as path from 'path'

// TODO: map fixture and criteria

const mapIndexNameToFileType:Map<IndexType,KioComponentFileType> = new Map()
mapIndexNameToFileType.set(IndexType.fixture,"fixture")
mapIndexNameToFileType.set(IndexType.criteria,"criteria")
mapIndexNameToFileType.set(IndexType.publication,"component")
mapIndexNameToFileType.set(IndexType.navigation,"component")
mapIndexNameToFileType.set(IndexType.structure,"component")

const mapComponentToComponentImport = (fileType:KioComponentFileType) => ( component:ComponentModel ):IndexTemplateDataItem => {
  const filePath = component.getFile(fileType)
  const componentImport = {
    importName: component.name+'Component',
    importPath: './'+path.relative(env.KIO_PATHS.root,component.getFile(fileType)).replace(/\.\w+$/,'')
  }
  return componentImport
}

export const dataForIndex = ( componentIndex:ComponentIndex ):IndexTemplateData => {
  //console.log('dataForIndex',componentIndex)

  const data:IndexTemplateData = {
    exportName: stringUtils.classify([componentIndex.name,'components'].join('-')),
    source: undefined,
    targetRoot: undefined,
    indexItems: componentIndex.components.map ( mapComponentToComponentImport(mapIndexNameToFileType.get(componentIndex.indexType)))
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