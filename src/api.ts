import * as cache from './cache'
import * as env from './env/constants'
import * as path from 'path'
import * as fs from 'fs'
import { KioComponentFilter, KioComponentType, findComponents, PublicationComponent, Component } from './components'
import { IndexName, IndexType, ComponentIndex } from './indexes/interfaces'
import { dataForIndex } from './indexes/template'
import * as template from './template'

import * as logger from './console'

const componentTypeForFilter = ( filter:KioComponentFilter ) => {
  if ( filter === "structure" )
    return KioComponentType.StructureComponent
  if ( filter === "publication" )
    return KioComponentType.PublicationComponent
  if ( filter === "navigation" )
    return KioComponentType.NavigationComponent
  return undefined
}

export type ComponentModel = PublicationComponent|Component

export const getComponents = ( filter:KioComponentFilter, fromCache:boolean=true ) => {
  let components:ComponentModel[]

  if ( fromCache )
  {
    const componentType = componentTypeForFilter(filter)
    components = cache.readCache("components",filter)//.filter(component=>component.data.componentType === componentType )
  }
  else
  {
    components = findComponents(filter)
  }

  return components
}


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

export const getIndexFilePath = ( indexName:IndexName ) => IndexFileMap.get(indexName)

export const getIndex = ( indexName:IndexName, fromCache:boolean=true ):ComponentIndex => {
  const indexType:IndexType = IndexType[indexName]
  const filter = componentFilterForIndexType(indexType)
  return {
    name: indexName,
    components: getComponents(filter,fromCache)
  }
}

export const renderIndex = ( indexName:IndexName, fromCache:boolean=true ):string => {
  const componentIndex:ComponentIndex = getIndex(indexName,fromCache)
  const indexData = dataForIndex(componentIndex)
  return template.renderIndex(indexData)[0]
}

export const writeIndex = ( indexName:IndexName, fromCache:boolean=true ) => {
  const source = renderIndex(indexName,fromCache)
  const filename = getIndexFilePath(indexName)
  return fs.writeFileSync(filename,source,{encoding: 'utf8'})
}