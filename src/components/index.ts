export * from './interfaces'
export * from './find'
export * from './create'
export * from './classes'
import { Observable, Scheduler } from 'rxjs'
import * as cache from '../cache'
import {PublicationComponent, Component} from './classes'
import { findComponents } from './find'
import { KioComponentFilter, KioComponentType } from './interfaces'

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



export const components = () => Observable.from(cache.cachedComponents(),Scheduler.async).repeat()