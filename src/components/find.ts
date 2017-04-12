import { find } from 'shelljs'
import * as path from 'path'
import { KioContentType } from 'kio-ng2'
import { KioComponentType, isKioContentType, isKioComponentType } from './interfaces'

import { KIO_PROJECT_ROOT, KIO_PATHS } from '../env/constants'

import { Component } from './Component.class'
import { createWithPath } from './create'

export type ComponentFilter = string|KioContentType|KioComponentType

export interface FilterFunction {
  ( filepath:string ):boolean
}

export const findComponents = ( filter?:ComponentFilter ):Component[] => {
  let searchRoot = KIO_PATHS.components[filter] || KIO_PATHS.root

  /*if ( isKioComponentType(filter) )
  {
    searchRoot = filter === KioComponentType.PublicationComponent ? KIO_PATHS.components.publication : KIO_PATHS.components.structure
  }
  else if ( isKioContentType(filter) )
  {
    searchRoot = path.join(KIO_PATHS.components.publication,<string>filter)
  }
*/
  //console.log('filter searchRoot', searchRoot)

  return find(searchRoot).filter ( item => 
    !path.extname(item) 
    && !/^\./.test(path.basename(item)) 
    && !/txt|src|fragment/.test(path.basename(item))
    && path.basename(item) !== path.basename(KIO_PATHS.components.publication)
    && path.basename(item) !== path.basename(KIO_PATHS.components.structure)
  ).map ( createWithPath )
}