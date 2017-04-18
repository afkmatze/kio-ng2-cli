import { find } from 'shelljs'
import * as path from 'path'
import * as logger from '../console'

import { KioContentType } from 'kio-ng2'
import { KioComponentType, isKioContentType, isKioComponentType } from './interfaces'

import { KIO_PROJECT_ROOT, KIO_PATHS } from '../env/constants'

import { Component } from './classes/Component.class'
import { createWithPath } from './create'

import { KioComponentFilter } from './interfaces'

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

export const findComponents = ( filter?:KioComponentFilter ):Component[] => {
  let searchRoot = KIO_PATHS.components[filter]
  logger.debug('KIO_PROJECT_ROOT',KIO_PROJECT_ROOT)
  logger.debug ( 'search root:' , searchRoot )
  const allFiles = find(searchRoot).filter( filterFiles )
  return allFiles.map ( createWithPath )
}