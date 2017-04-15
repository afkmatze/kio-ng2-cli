import { TemplateDataMapper, TemplateData, IndexTemplateData, IndexTemplateDataItem } from '../interfaces'
import { TemplateFile } from '../../interfaces'
import { IndexType, ComponentIndex } from '../../../indexes/interfaces'
import { resolveTargetWithName } from '../../resolveTarget'
import * as path from 'path'

export const mapTemplateData = ( indexData:ComponentIndex ):IndexTemplateData => {
  const data:IndexTemplateData = {
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
  const filename = file.filename.replace(/\_\_(\w+)\_\_/gm,(src:string,key:string) => {
    if ( key === 'path' )
      return data.dasherizedComponentName
    if ( key === 'name' )
      return data.dasherizedComponentName
    return src
  })
  return {
    filename,
    absoluteFilepath: path.join(root,filename)
  }
}
