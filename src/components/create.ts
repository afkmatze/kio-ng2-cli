import * as ComponentInterfaces from './interfaces'
import { KIO_PATHS, KIO_PROJECT_ROOT, KIO_PROJECT_PACKAGE } from '../env/constants'
import * as path from 'path'
import * as logger from '../console'

import { Component } from './classes/Component.class'
import { PublicationComponent } from './classes/PublicationComponent.class'

const PATH_TO_PUBLICATION = path.join(KIO_PATHS.components.publication)
const PATH_TO_STRUCTURE = path.join(KIO_PATHS.components.structure)
const PATH_TO_NAVIGATION = path.join(KIO_PATHS.components.navigation)

export const getComponentTypeForPath = ( dir:string ):ComponentInterfaces.KioComponentType => {
  if ( dir.indexOf(PATH_TO_PUBLICATION) > -1 )
  {
    return ComponentInterfaces.KioComponentType.PublicationComponent
  }
  else if ( dir.indexOf(PATH_TO_STRUCTURE) > -1 )
  {
    return ComponentInterfaces.KioComponentType.StructureComponent
  }
  else if ( dir.indexOf(PATH_TO_NAVIGATION) > -1 )
  {
    return ComponentInterfaces.KioComponentType.NavigationComponent
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

export const createWithData = ( data:ComponentInterfaces.KioPublicationComponent|ComponentInterfaces.KioComponent ) => {
  if ( data.componentType === ComponentInterfaces.KioComponentType.PublicationComponent )
    return new PublicationComponent(<ComponentInterfaces.KioPublicationComponent>data)
  return new Component(data)
}

/**
 * @brief      Creates a Component with path.
 *
 * @param      dir   The component`s directory
 *
 * @return     Component
 */
export const createWithPath = ( dir:string ):Component => {
  logger.debug('create with path "%s"' , dir)
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
    return new PublicationComponent(data)
  }else if ( componentType === ComponentInterfaces.KioComponentType.StructureComponent )
  {    
    const data:ComponentInterfaces.KioStructureComponent = {
      dir ,
      componentType ,
      name: path.basename(dir)
    }
    return new Component(data)
  }else if ( componentType === ComponentInterfaces.KioComponentType.NavigationComponent )
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