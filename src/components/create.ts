import * as ComponentInterfaces from './interfaces'
import { KIO_PATHS, KIO_PROJECT_ROOT } from '../env/constants'
import * as path from 'path'

import { Component } from './Component.class'

const PATH_TO_PUBLICATION = path.join(KIO_PATHS.components.publication)
const PATH_TO_STRUCTURE = path.join(KIO_PATHS.components.structure)

export const getComponentTypeForPath = ( dir:string ):ComponentInterfaces.KioComponentType => {
  if ( dir.indexOf(PATH_TO_PUBLICATION) > -1 )
  {
    return ComponentInterfaces.KioComponentType.PublicationComponent
  }
  else if ( dir.indexOf(PATH_TO_STRUCTURE) > -1 )
  {
    return ComponentInterfaces.KioComponentType.StructureComponent
  }
  return undefined
}

export const getContentTypeForPath = ( dir:string ) => {
  if ( dir.indexOf(PATH_TO_PUBLICATION) > -1 )
  {
    return dir.replace(PATH_TO_PUBLICATION+'/','').split('/')[0]
  }
  return undefined
}

export const createWithPath = ( dir:string ) => {
  const componentType = getComponentTypeForPath(dir)
  if ( componentType === ComponentInterfaces.KioComponentType.PublicationComponent )
  {
    const contentType = getContentTypeForPath(dir)
    if ( !contentType )
    {
      throw Error('Invalid component type at dir: ' + dir)
    }

    const data:ComponentInterfaces.KioPublicationComponent = {
      dir ,
      componentType ,
      name: path.basename(dir),
      contentType
    }
    return new Component(data)
  }else if ( componentType === ComponentInterfaces.KioComponentType.StructureComponent )
  {    
    const data:ComponentInterfaces.KioStructureComponent = {
      dir ,
      componentType ,
      name: path.basename(dir)
    }
    return new Component(data)
  }
  
  throw Error('Invalid component type at dir: ' + dir)
}