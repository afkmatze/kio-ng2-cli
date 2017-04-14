import * as cache from './cache'
import * as env from './env/constants'
import { KioComponentFilter, KioComponentType, findComponents, PublicationComponent, Component } from './components'
import { IndexName, IndexType, ComponentIndex } from './indexes/interfaces'
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

export const getIndex = ( indexName:IndexName, fromCache:boolean=true ):ComponentIndex => {
  const indexType:IndexType = IndexType[indexName]
  const filter = componentFilterForIndexType(indexType)
  return {
    name: indexName,
    components: getComponents(filter,fromCache)
  }
}

export const writeComponents = ( components:ComponentModel[] ) => {

}