import * as path from 'path'
import * as indexes from './indexes'
import * as logger from '../../console'
import * as publicationComponent from './publicationComponent'
import { Observable } from 'rxjs'
import * as rxfs from '../../utils/rx/fs'

export { indexes, publicationComponent }

const logUpdateReason = ( reason:string, targetFilepath:string ) => {
  logger.log('update %s for reason: %s ', path.basename(targetFilepath), reason )
}

export const shouldUpdateFile = ( targetFilepath:string, contents:string ) => {
  if ( !rxfs.existsSync(targetFilepath) )
  {
    logUpdateReason('does not exist', targetFilepath)
    return Observable.of(true)
  }

  return rxfs.readfile(targetFilepath,true).flatMap ( currentContents => {
    if ( currentContents.length !== contents.length )
    {
      logUpdateReason(`different size. current size: ${currentContents.length}, next size: ${contents.length} `, targetFilepath)
      return Observable.of(true)
    }

    if ( currentContents === contents )
    {
      return Observable.empty()
    }
    
    return rxfs.diff({},contents, targetFilepath).map ( diffs => {
      if ( diffs.length > 0 )
      {
        logUpdateReason(`${diffs.length} differences in content`, targetFilepath)
      }
      return diffs.length > 0
    } )
  } )
}

export const replaceFile = ( targetFilepath:string , contents:string ) => {
  const targetDirpath = path.dirname(targetFilepath)
  const targetDirParent = path.dirname(targetDirpath)
  if ( !rxfs.existsSync(targetDirParent) )
    return Observable.throw('Invalid target path. ' + targetDirParent + ' is not a directory.')
  return rxfs
    .mkdir(targetDirpath,true)
    .flatMap( dir => {
      return shouldUpdateFile(targetFilepath,contents)
        .flatMap ( (result) => {
          
          return result ? rxfs.writeFile ( targetFilepath, contents ) : Observable.empty()
        } ).map( () => true )
    })
}