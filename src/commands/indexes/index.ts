import * as env from '../../env/constants'
import * as shelljs from 'shelljs'
import * as path from 'path'

const STRUCTURE_COMPS = path.join(env.KIO_PROJECT_ROOT,env.KIO_PATHS.components.structure)
const PUBLICATION_COMPS = path.join(env.KIO_PROJECT_ROOT,env.KIO_PATHS.components.publication)

const DEFAULT_PATTERN = /.*/

const findFiles = ( sourcePath:string=env.KIO_PATHS.root, pattern:RegExp|string=DEFAULT_PATTERN ) => {
  const patternExp:RegExp = (() => {
    if ( 'string' === typeof pattern )
    {
      return new RegExp(pattern)
    }
    return pattern
  })()
  
  return shelljs.find(path.join(env.KIO_PROJECT_ROOT,sourcePath)).filter ( filename => filename.match ( patternExp ) )
}


export const readExports = ( filepath:string ) => {
  //return ts.preProcessFile(shelljs.cat(filepath),true)
  const rg = /export\ (\w+) (\w+)/g

  return shelljs.cat(filepath).match(rg) || []
}

export const main = ( env:any ) => {
  const allFiles = findFiles(env.KIO_PATHS.components.structure, /\.ts$/ )
  const allExports = allFiles.map ( file => {
      //console.log('read file',file)
      return {
        file,
        exports: readExports(file).map ( val => val.split(' ').pop() )
      }
    } ).filter ( a => a.exports.length > 0 )
  allExports.forEach ( item => {
    console.log('import { %s } from "./%s"', item.exports, path.relative(env.KIO_PATHS.root,item.file) )
  } )
}