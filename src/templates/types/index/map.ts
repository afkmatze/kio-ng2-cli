import { TemplateDataMapper, TemplateData, IndexTemplateData, IndexTemplateDataItem } from '../interfaces'
import { TemplateFile } from '../../interfaces'
import { IndexType, ComponentIndex } from '../../../indexes/interfaces'
import { resolveTargetWithName } from '../../resolveTarget'
import * as path from 'path'

export const mapTemplateData = ( indexData:ComponentIndex ):IndexTemplateData => {
  const data:IndexTemplateData = {
    source: undefined,
    targetRoot: resolveTargetWithName("index"),
    exportName: indexData.name,
    indexItems: indexData.components.map(comp=>{
      return {
        importName: comp.name,
        importPath: comp.relativeFrom(resolveTargetWithName("index"))
      }
    })
  }
  return data
}

export const mapTemplateFile = ( file:TemplateFile, data:IndexTemplateData ):TemplateFile => {
  const root = file.absoluteFilepath.replace(file.filename,'')
  console.log('index template file',file.filename)
  return {
    filename: file.filename,
    absoluteFilepath: path.join(root,file.filename)
  }
}
