import * as rxfs from '../../utils/rx/fs'
import * as path from 'path'
import { Observable } from 'rxjs'
import { ProjectEnv } from '../interfaces'
export { ComponentFixture, QueryableAnnotation } from 'kio-ng2-component-routing'
export { KioContentType } from 'kio-ng2'

import { ComponentCacheFileContent, PublicationComponentCacheFileContent, PublicationComponentMetaCacheFileContent } from './interfaces'

export const cache = (projectEnv:ProjectEnv) => {

  const componentsCacheRoot = path.join(projectEnv.KIO_PROJECT_CACHE,'components' )
  const list = ():Observable<string> => {
    return rxfs.findFiles ( componentsCacheRoot, /\.json$/ )
              .map ( filename => './'+path.relative(componentsCacheRoot,filename) )
  }

  const readFile = <T extends ComponentCacheFileContent>( filepath:string ):Observable<T> => {
    const fullFilepath = path.join(componentsCacheRoot,filepath)
    return rxfs.readfileFull(fullFilepath).toArray().map ( contents => {
      return JSON.parse(contents.join('\n'))
    } )
          .catch((error, caught) => {
            const msg = `failed reading cache from "${fullFilepath}"`
            return Observable.throw(msg)
          })
  }

  return {
    list,
    readFile
  }

}