import { IndexType, IndexName } from './interfaces'
import { Observable } from 'rxjs'
import { readdir } from '../utils/rx/fs'
import * as env from '../env'

import { components } from '../components'


export const IndexNames:Observable<string> = Observable.from(Object.keys(IndexType))
  .map ( value => {
    console.log('value: %s',IndexType[value])
    return IndexType[value]
  } ).filter ( value => 'string' === typeof value )
  

export interface StreamFilter {
  (item:any):boolean
}

export const filterStream = ( indexName:IndexName ):StreamFilter => {
  switch (indexName) {
    case "structure":
      return (component)=>env.path.resolve(component.dir,'..') === env.path.resolve(env.KIO_PATHS.components.structure)

    case "fixture":
    case "criteria":
    case "publication":
      return (component)=>env.path.resolve(component.dir,'../..') === env.path.resolve(env.KIO_PATHS.components.publication)
    
    case "navigation":
      return (component)=>env.path.resolve(component.dir,'..') === env.path.resolve(env.KIO_PATHS.components.navigation)
  }
}


