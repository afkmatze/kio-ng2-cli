import { Observable, Scheduler } from 'rxjs'
import * as rxshell from 'rxshell'
import * as rxfs from 'rxfs'
import * as path from 'path'
import * as shelljs from 'shelljs'

export const evalTsFile = ( filepath:string ) => {
  const cp = shelljs.exec(`ts-node "${filepath}"`)
  if ( cp.stderr )
  {
    console.error(cp.stderr)
  }
  //console.log('ts result','\n----\n',cp.stdout,'\n----')
  return JSON.parse(cp.stdout)
}

export const req = <T>( filepath:string ):T => {
  const cp = shelljs.exec(`tsc "${filepath}"`)
  const transpiledFilepath = filepath.replace(/ts$/,'js')
  const data = require(transpiledFilepath)
  shelljs.rm(transpiledFilepath)
  return data
}

export interface SourceFile<T> {
  key:string
  filepath:string
  data?:T
}

const tmpFilename = (suffix:string='.ts'):string => {
  return [
    'tmp',
    Date.now(),
    Math.floor(Math.random()*1000)
  ].join('_')+suffix
}

export const evalSource = <T>( source:string ):Observable<T> => {
  //const tmpDir = 'tmp_'+Date.now()
  //const tmpDirSrc = path.join(tmpDir,'src')
  //const tmpDirOut = path.join(tmpDir,'out')
  //shelljs.mkdir(tmpDir)
  //shelljs.mkdir(tmpDirSrc)
  //shelljs.mkdir(tmpDirOut)

  //const tmpFile = path.join(tmpDirSrc,tmpFilename())
  const tmpFile = tmpFilename() 

  //console.log('write tmp file: "%s"',tmpFile,'\n',source)

  return rxfs.writeFile(tmpFile,Observable.of(new Buffer(source)),'utf8')
    .map ( success => evalTsFile(tmpFile) )
    .map ( data => {
        shelljs.rm(tmpFile)
        //console.log('removed tmp file: "%s"',tmpFile,'\n---\n',data)
        return data
      } )
  /*return rxfs.writeFile(tmpFile,Observable.of(new Buffer(source)),'utf8')
      .flatMap ( success => {
        return Observable.of(req ( tmpFile ))
      } )
      .map ( data => {
        shelljs.rm(tmpFile)
        console.log('removed tmp file: "%s"',tmpFile)
        return data
      } )*/
}

export const renderSourceGroup = <T>( sourceFiles:SourceFile<T>[] ):string => {

  const sourceImports = sourceFiles.map ( sourceFile => `import * as ${sourceFile.key} from '${sourceFile.filepath.replace(/\.ts$/,'')}';` ).join('\n')
  const sourceExportsKeys = sourceFiles.map ( sourceFile => sourceFile.key )

  return `${sourceImports}
console.log(JSON.stringify({${sourceExportsKeys.join(',')}}))
`
}

export interface Group<T> {
  [key:string]: T
}

export const reqGroup = <T>( filepaths:string[] ):Observable<T[]> => {
  const sourceFiles:SourceFile<T>[] = filepaths.map ( (filepath,idx) => {
    const key = 'item' + idx
    return {
      key ,
      filepath
    }
  })
  return evalSource<Group<T>>(renderSourceGroup(sourceFiles))
    .map ( sourceData => {
      return sourceFiles.map ( (sourceFile,idx):T => {
        const sourceKey = 'item' + idx
        return sourceData[sourceKey]
      } )
    } )
}
/*
export const reqAsync = <T>( filepath:string ):Observable<T> => {
  return rxshell.exec('tsc ' + filepath).flatMap ( data => {
    if ( data.stdout ) 
    { 
      console.log('stdout::%s',data.stdout)
      return Observable.of(data.stdout.toString('utf8')) 
    }
    else { 
      console.error('failed to require async: %s',filepath)
      Observable.throw(Error(data.stderr.toString('utf8')))
    }  
  }).map ( rows => {
    const transpiledFilepath = filepath.replace(/ts$/,'js')
    const data = require(transpiledFilepath)
    shelljs.rm(transpiledFilepath)
    return data
  } )
}*/