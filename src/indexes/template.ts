import { IndexName, IndexType, ComponentIndex } from './interfaces'
import { IndexTemplateData, ComponentImport } from '../template'
import { ComponentModel } from '../components'
import * as stringUtils from '../utils/string'
import * as env from '../env/constants'

// TODO: map fixture and criteria

const mapComponentToComponentImport = ( component:ComponentModel ):ComponentImport => {
  const componentImport:ComponentImport = {
    importName: component.name,
    importPath: env.relative(component.getFile("component"))
  }
  return componentImport
}

export const dataForIndex = ( componentIndex:ComponentIndex ):IndexTemplateData => {
  console.log('dataForIndex',componentIndex)
  const data:IndexTemplateData = {
    exportName: stringUtils.classify([componentIndex.name,'components'].join('-')),
    components: componentIndex.components.map ( mapComponentToComponentImport )
  }
  return data
}