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

const filterFiles = ( file ) => {
  //console.log('\x1b[33m%s\x1b[0m', file)
  if ( path.extname(file) )
  {
    //console.log('extension on', file)
    return false
  }
  if ( /^\./.test(path.basename(file)) )
  {
    //console.log('basename starts with "."')
    return false
  }
  if ( /^(txt|src|fragment)$/.test(path.basename(file)) )
  {
    //console.log('its a txt,src,fragment folder')
    return false
  }
  if ( path.basename(file) === path.basename(KIO_PATHS.components.publication) )
  {
    //console.log('is publication components folder')
    return false
  }
  if ( path.basename(file) === path.basename(KIO_PATHS.components.structure) )
  {
    //console.log('is structure components folder')
    return false
  }

  return true
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

  const allFiles = find(searchRoot).filter ( filterFiles )
  if ( process.env.NODE_ENV === 'debug' )
  {
    console.log ( 'search root:' , searchRoot )
    console.log(allFiles)
  }
  return allFiles.map ( createWithPath )
}