import { Observable, Scheduler } from 'rxjs'
import * as rxfs from 'rxfs'
import * as env from '../../env'
import { 
  KioFolderSettings, KioFolderSettingArg, KioFileFilter, 
  KioComponentsPathType, 
  KioComponentsPathTypes
} from '../../env'
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

export const filepathFilter = ( filter:env.KioFileFilter|env.KioFileFilter[] ) => {
  if ( !Array.isArray(filter) )
    return filepathFilter ( [filter] )

  const filterExpression = ( filter:env.KioFileFilter ):RegExp => {
    if ( 'string' === typeof filter )
      return new RegExp("^"+filter)
    return filter
  }

  const match = ( filepathOrName:string ) => {
    const matchingFilter = filter.find ( filterItem => {
      return filterExpression(filterItem).test ( filepathOrName )
    } )
    return !!matchingFilter
  }
  return ( filepath:string ) => {
    if ( match (filepath) || match ( path.basename(filepath) ) )
    {
      return false
    }
    return true
  }
}

export const list = ( sourcePath:env.KioFolderSettingArg ):Observable<string> => {

  const sourceFolder:env.KioFolderSettings = env.folderSettings(sourcePath)

  if ( !path.isAbsolute(sourceFolder.path) )
  {
    sourceFolder.path = env.resolve ( sourceFolder.path )
  }
  //console.log('files at "%s"', sourceFolder.path)
  //console.log('exclude', sourceFolder.exclude)
  return rxfs.find(['-type','file'],sourceFolder.path)
      .map ( streamData => streamData.stdout.toString('utf8') )
      .filter ( filepathFilter ( sourceFolder.exclude ) )
      .map ( (filename,idx) => {
        //console.log('file #%s', idx, filename, path.join(sourceFolder.path, filename) )
        return path.join(sourceFolder.path, filename)
      } )      
      .map ( assertFile )
      //.map ( filename => './'+path.relative(env.KIO_PROJECT_ROOT,filename) )
}

export const kioFiles = ( kioPathType:KioComponentsPathType ) => {
  //console.log('kioFiles for "%s"', kioPathType )
  
  const settings = env.resolveKioPathSettings(kioPathType)  
  
  const pathTypeNames = Object.keys(KioComponentsPathTypes).filter ( isNaN )
  const excludeFilepaths = pathTypeNames
    .filter ( key => key !== kioPathType )
    .map ( key => {
      const p = env.resolveKioPath(key)
      return p
    } )
    .filter ( filepath => settings.path.indexOf(filepath) === -1 )

  //console.log('exclude filepaths', excludeFilepaths )
  //console.log('settings', settings )

  return list(settings).filter ( filepath => {
    return !excludeFilepaths.find ( excludeFilepath => {
      return filepath.indexOf ( excludeFilepath ) > -1
    } )
  } ) 
}

export const publicationComponents = ( ):Observable<string> => {
  return kioFiles ( "publication" )
        .filter ( filename => /.*\.component\.ts$/.test ( filename ) )
}

export const structureComponents = ( ):Observable<string> => {
  return kioFiles ( "structure" )
        .filter ( filename => /.*\.component\.ts$/.test ( filename ) )
}

export const navigationComponents = ( ):Observable<string> => {
  return kioFiles ( "navigation" )
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
  return kioFiles ( "publication" )
        .filter ( filename => /.*\.component\.fixture\.ts$/.test ( filename ) )
}

export const publicationComponentCriterias = ( ):Observable<string> => {
  return kioFiles ( "publication" )
        .filter ( filename => /.*\.component\.criteria\.ts$/.test ( filename ) )
}

export const filesForIndexType = ( indexType:IndexType ) => {
  return list ( resolveRootByIndexType(indexType) )
          .filter ( filterByIndexType(indexType) )
          //.map ( logImage('after filter') )
}
