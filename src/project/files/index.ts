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
import { createDebugger } from '../../console'

const debug = createDebugger({
  debugKey: 'files'
})

export const resolveRootByIndexType = ( indexType:IndexType ) => {
  switch (indexType) {
    
    case IndexTypes.publication:
    case IndexTypes.fixture:
    case IndexTypes.criteria:
      return "publication"
    
    case IndexTypes.structure:
      return "structure"
    
    case IndexTypes.navigation:
      return "navigation"
    
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

export const filepathFilter = ( filter:env.KioFileFilter|env.KioFileFilter[], include:boolean=false ) => {
  if ( !Array.isArray(filter) )
    return filepathFilter ( [filter] )

  const filterExpression = ( filter:env.KioFileFilter ):RegExp => {
    if ( 'string' === typeof filter )
      return new RegExp(filter)
    return filter
  }

//  const doDebug = filter.indexOf ( 'abstract' ) > -1

  const match = ( filepathOrName:string ) => {
    const matchingFilter = filter.find ( (filterItem,idx) => {
      const expr = filterExpression(filterItem)
      const result = expr.test ( filepathOrName )
//      doDebug && console.log('expr: %s', idx, expr )
      //include && debug('%s.test(%s) = %s', expr, filepathOrName, (result ? 'true' : 'false'))
      return result
    } )
//    doDebug && console.log('test match for "%s"', filepathOrName )
//    doDebug && console.log('matching: ', matchingFilter )
    return !matchingFilter === include
  }

  //debug('filter: %s', filter )
  return ( filepath:string ) => {
//    doDebug && console.log('filepath', filepath)
    if ( match (filepath) || match ( path.basename(filepath) ) )
    {
      //debug('matched: %s', filepath )
      return false
    }
    //debug('not matched: %s', filepath )
    return true
  }
}

export const list = ( sourcePath:env.KioFolderSettingArg ):Observable<string> => {

  const sourceFolder:env.KioFolderSettings = env.folderSettings(sourcePath)

  if ( !path.isAbsolute(sourceFolder.path) )
  {
    sourceFolder.path = env.resolve ( sourceFolder.path )
  }
  //debug('files at "%s"', sourceFolder.path)
  //console.log('exclude', sourceFolder.exclude)
  const source = rxfs.find(['-type','file'],sourceFolder.path)
      .map ( streamData => streamData.stdout.toString('utf8') )
      .filter ( filepathFilter ( sourceFolder.exclude ) )
      .map ( (filename,idx) => {
        //console.log('file #%s', idx, filename, path.join(sourceFolder.path, filename) )
        return path.join(sourceFolder.path, filename)
      } )      
      .map ( assertFile )
      //.map ( filename => './'+path.relative(env.KIO_PROJECT_ROOT,filename) )
  if ( sourceFolder.include )
  {
    return source.filter ( filepathFilter ( sourceFolder.include, true ) )
  }
  return source
}

export const kioFiles = ( kioPathType:KioComponentsPathType ) => {
  debug('kioFiles for "%s"', kioPathType )  
  const settings = env.resolveKioPathSettings(kioPathType)  
  const pathTypeNames = Object.keys(KioComponentsPathTypes).filter ( isNaN )
  const excludeKeys = pathTypeNames.filter ( key => key !== kioPathType )
  debug('other path type names "%s"', excludeKeys )  

  const excludeFilepaths = excludeKeys
    .map ( key => {
      const p = env.resolveKioPath(key)
      return p
    } )
    .filter ( filepath => {
      return filepath.indexOf(settings.path) !== -1
    } )
    .map ( (filepath:string) => env.resolve(filepath) )
  debug('excludeFilepaths "%s"', excludeFilepaths.join('\n') )  

  settings.exclude = settings.exclude.concat(excludeFilepaths)
  debug('settings - \npath: %s\nexclude: %s', settings.path, settings.exclude )  
  //console.log('exclude filepaths', excludeFilepaths )
  //console.log('settings', settings )

  let listSource = list(settings)
    .filter ( filepath => {
      const fp = excludeFilepaths.find ( excludeFilepath => filepath.indexOf ( excludeFilepath ) !== -1 )
      return !fp
    } ) 
  listSource.share()
    .map(fp => path.relative(process.cwd(),fp) )
    .toArray().subscribe ( files => {
    debug('%s files for \x1b[1;34m%s\x1b[0m', files.length, kioPathType )
  } )

  return listSource
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
  return kioFiles ( resolveRootByIndexType(indexType) )
          .filter ( filterByIndexType(indexType) )
          //.map ( logImage('after filter') )
}
