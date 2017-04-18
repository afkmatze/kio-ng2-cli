import * as path from 'path'
import * as env from '../env'
export * from './interfaces'

import * as stream from './stream'

export { stream }

import { IndexName, IndexType, ComponentIndex } from './interfaces'
import { KioComponentFilter, KioComponentType, findComponents, PublicationComponent, getComponents, Component } from '../components'
import { dataForIndex } from './template'


export const componentFilterForIndexType = ( indexType:IndexType ):KioComponentFilter => {
  switch (indexType) {
    case IndexType.publication:
    case IndexType.fixture:
    case IndexType.criteria:
      return "publication"
    
    case IndexType.navigation:
      return "navigation"

    case IndexType.structure:
      return "structure"
  }

  return undefined
} 

export const IndexFileMap:Map<IndexName,string> = new Map()

IndexFileMap.set("publication",path.join(env.KIO_PATHS.root,"PublicationComponents.generated.ts"))
IndexFileMap.set("navigation",path.join(env.KIO_PATHS.root,"NavigationComponents.generated.ts"))
IndexFileMap.set("structure",path.join(env.KIO_PATHS.root,"StructureComponents.generated.ts"))
IndexFileMap.set("fixture",path.join(env.KIO_PATHS.root,"PublicationFixtures.generated.ts"))
IndexFileMap.set("criteria",path.join(env.KIO_PATHS.root,"PublicationCriterias.generated.ts"))

export const IndexFilenames:IndexName[] = Array.from(IndexFileMap.keys())

export const getIndexFilePath = ( indexName:IndexName ) => IndexFileMap.get(indexName)

export const getIndex = ( indexName:IndexName, fromCache:boolean=true ):ComponentIndex => {
  const indexType:IndexType = IndexType[indexName]
  const filter = componentFilterForIndexType(indexType)
  return {
    name: indexName,
    indexType: indexType,
    components: getComponents(filter,fromCache)
  }
}

export const getIndexByType = ( indexType:IndexType, fromCache:boolean=true ):ComponentIndex => {
  const filter = componentFilterForIndexType(indexType)
  return {
    indexType,
    name: IndexType[indexType],
    components: getComponents(filter,fromCache)
  } 
}

export const getIndexData = ( indexName:IndexName, fromCache:boolean=true ):any => {
  const index = getIndex(indexName,fromCache)
  return dataForIndex(index)
}