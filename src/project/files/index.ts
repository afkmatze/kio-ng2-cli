import { Observable, Scheduler } from 'rxjs'
import * as rxfs from '../../utils/rx/fs'
import * as path from 'path'
import { ProjectEnv } from '../interfaces'


export const files = ( projectEnv:ProjectEnv ) => {
  
  const list = ( sourcePath:string='' ):Observable<string> => {
    if ( !path.isAbsolute(sourcePath) )
    {
      sourcePath = projectEnv.resolve ( sourcePath )
    }
    return rxfs.findFiles(sourcePath).filter ( filename => /\..+$/.test(filename) ).map ( filename => './'+path.relative(projectEnv.KIO_PROJECT_ROOT,filename) )
  }

  const publicationComponents = ( ):Observable<string> => {
    return list ( projectEnv.KIO_PATHS.components.publication )
          .filter ( filename => /.*\.component\.ts$/.test ( filename ) )
  }

  const publicationComponentFiles = ( ):Observable<string[]> => {
    return publicationComponents()
          .map ( filename => {
            return path.dirname(filename)
          } )
          .distinct()
          .flatMap ( dirpath => list( dirpath ).toArray() )

  }

  return {
    list ,
    publicationComponents,
    publicationComponentFiles
  }
}