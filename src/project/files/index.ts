import { Observable, Scheduler } from 'rxjs'
import * as rxfs from '../../utils/rx/fs'
import * as env from '../../env'
import * as path from 'path'
import { ProjectEnv, IndexTypes, IndexType } from '../interfaces'
import { filterByIndexType } from './filter'

export const resolveRootByIndexType = ( indexType:IndexType ) => {
  switch (indexType) {
    
    case IndexTypes.publication:
    case IndexTypes.fixture:
    case IndexTypes.criteria:
      return env.KIO_PATHS.components.publication
    
    case IndexTypes.structure:
      return env.KIO_PATHS.components.structure
    
    case IndexTypes.navigation:
      return env.KIO_PATHS.components.navigation
    
  }
}
/*
interface matcher {
  (str:string):boolean
}

const logComponent = ( m:matcher ) => {

  return ( label:string ) => {
    return ( sourcePath:string, index?:number ) => {
      if ( m (sourcePath) )
      {
        console.log('-----\n%s - %s source path\n%s', label, index||'' , sourcePath)
      }
      return sourcePath
    }
  }
}

const logImage = logComponent(val => /simple\-image/.test(val))*/

let prevFile
const assertFile = ( file:string, idx:number ) => {
  if ( !rxfs.existsSync(file) )
  {
    console.log('prevFile: ', prevFile)
    throw Error(`${file} does not exist`)
  }
  //console.log('file #%s', idx, file )
  prevFile = file
  return file
}

export const list = ( sourcePath:string='' ):Observable<string> => {
  if ( !path.isAbsolute(sourcePath) )
  {
    sourcePath = env.resolve ( sourcePath )
  }
  return rxfs.find(sourcePath, 1)
      .map ( assertFile )
      .filter ( filename => /\..+$/.test(filename) )
      //.map ( filename => './'+path.relative(env.KIO_PROJECT_ROOT,filename) )
}

export const publicationComponents = ( ):Observable<string> => {
  return list ( env.KIO_PATHS.components.publication )
        .filter ( filename => /.*\.component\.ts$/.test ( filename ) )
}

export const structureComponents = ( ):Observable<string> => {
  return list ( env.KIO_PATHS.components.structure )
        .filter ( filename => /.*\.component\.ts$/.test ( filename ) )
}

export const navigationComponents = ( ):Observable<string> => {
  return list ( env.KIO_PATHS.components.navigation )
        .filter ( filename => /.*\.component\.ts$/.test ( filename ) )
}

export const publicationComponentFiles = ( ):Observable<string[]> => {
  return publicationComponents()
        .map ( filename => {
          return path.dirname(filename)
        } )
        .distinct()
        .flatMap ( dirpath => list( dirpath ).toArray() )

}

export const publicationComponentFixtures = ( ):Observable<string> => {
  return list ( env.KIO_PATHS.components.publication )
        .filter ( filename => /.*\.component\.fixture\.ts$/.test ( filename ) )
}

export const publicationComponentCriterias = ( ):Observable<string> => {
  return list ( env.KIO_PATHS.components.publication )
        .filter ( filename => /.*\.component\.criteria\.ts$/.test ( filename ) )
}

export const filesForIndexType = ( indexType:IndexType ) => {
  return list ( resolveRootByIndexType(indexType) )
          .filter ( filterByIndexType(indexType) )
          //.map ( logImage('after filter') )
}
