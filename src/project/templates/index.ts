import * as ejs from 'ejs'
import * as path from 'path'
import * as files from '../files'
import * as indexes from './indexes'
import * as logger from '../../console'
import * as publicationComponent from './publicationComponent'
import { Observable } from 'rxjs'
import * as rxfs from 'rxfs'

const TEMPLATES_ROOT = path.resolve(__dirname,'../../../templates')

export { indexes, publicationComponent }

const logUpdateReason = ( reason:string, targetFilepath:string ) => {
  logger.log('update %s for reason: %s ', path.basename(targetFilepath), reason )
}

export const shouldUpdateFile = ( targetFilepath:string, contents:string ):Observable<boolean> => {
  if ( !rxfs.existsSync(targetFilepath) )
  {
    logUpdateReason('does not exist', targetFilepath)
    return Observable.of(true)
  }

  return rxfs.readFile(targetFilepath).toArray().map(rows => rows.join('\n')).flatMap ( currentContents => {
    if ( currentContents.length !== contents.length )
    {
      logUpdateReason(`different size. current size: ${currentContents.length}, next size: ${contents.length} `, targetFilepath)
      return Observable.of<boolean>(true)
    }

    if ( currentContents === contents )
    {
      return <Observable<boolean>>Observable.empty()
    }
    
    return <Observable<boolean>>rxfs.diff({},contents, targetFilepath).map ( diffs => {
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
    .mkdir(targetDirpath)
    .flatMap( dir => {
      return shouldUpdateFile(targetFilepath,contents)
        .flatMap ( (result) => {
          
          return result ? rxfs.writeFile ( targetFilepath, Observable.of(new Buffer(contents)) ).map(()=>true) : Observable.of(false)
        } )
    })
}


export const renderTemplateWithData = ( templateName:string, data:any ) => {
  const TEMPLATE_DIR = path.join(TEMPLATES_ROOT,templateName)
  return files.list(TEMPLATE_DIR)
       .flatMap( file => {
         return rxfs.readFile<string>(file, 'utf8')
         .map ( (content:Buffer|string) => ({ 
           file: path.relative(TEMPLATE_DIR, file),
           content: ( content instanceof Buffer ) ? content.toString('utf8') : content
         }))
       } )
       .map( ({file,content},idx) => {
         content = ejs.render(content,data)
         return {
           file,
           content
         }
       } )
}