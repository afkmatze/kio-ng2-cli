import { 
  TemplateDataMapper, TemplateData, TemplateValueMapper, IndexTemplateData
} from '../../types/interfaces'
import { readTemplateFiles } from '../../types/common'
import { 
  ComponentIndex, IndexType, IndexName 
} from '../../../indexes'
import * as stringUtils from '../../../utils/string'
import * as env from '../../../env'
import * as path from 'path'

export type DataKey = "indexItems"|"exportName"

export const DataKeys:DataKey[] = [
  "indexItems",
  "exportName"
]

export const IndexMap:Map<IndexName,TemplateValueMapper> = new Map()

const defaultMapper = ( key:DataKey, indexData:ComponentIndex ):any => {
  return indexData[key]
}

const addIndexMap = ( indexName:IndexName ) => {  
  const indexMap:TemplateValueMapper = (key:DataKey, indexData:ComponentIndex ):any => {
    const capName = indexName.substr(0,1).toUpperCase()+indexName.slice(1)
    switch (key) {
      case "indexItems":
        return indexData.components.map(component=>({
          importName: capName,
          importAlias: component.name,
          importPath: component.relativeFrom(env.KIO_PATHS.root)
        }))
       
     case "exportName":
       return capName+'s'
    }
  }
  IndexMap.set(indexName,indexMap)
)

addIndexMap ( 'navigation' )
addIndexMap ( 'structure' )
addIndexMap ( 'publication' )
addIndexMap ( 'criteria' )
addIndexMap ( 'fixture' )

export const mapDataKey = ( key:DataKey, indexData:ComponentIndex ):any => {
  const mapper:TemplateValueMapper = IndexMap.get(indexData.name)
  if ( mapper )
  {
    return mapper(key, indexData)
  }
  return undefined
}

export const mapComponentData = ( componentData:ComponentIndex ):IndexTemplateData => {
  const data:any = {}
  DataKeys.forEach((dataKey:DataKey)=>{
    data[dataKey] = mapDataKey(dataKey,componentData)
  })
  return data
}