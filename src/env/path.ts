export * from 'path'
import * as path from 'path'
import * as fs from 'fs'
import { KioPath } from './interfaces'

const readSymlink = ( filepath:string ):string => {
  let outpath:string
  try{
    outpath = fs.readlinkSync(filepath)
  }catch(e){}

  return outpath || filepath
}

function pathJoin ( ...args:string[] ) {
  return create(this.toString(),...args)
}

export const create = ( ...args:string[] ) => {
  const out = path.join(...args)
  return <KioPath>Object.assign(out,{
    join: pathJoin.bind(out)
  })
}


export const resolveFull = ( filepath:string, parts?:string[] ):string => {

  if ( !path.isAbsolute(filepath) )
  {
    filepath = path.resolve(filepath)
  }

  if ( !parts )
  {
    return resolveFull ( path.resolve('/') , filepath.split('/') )
  }

  if ( parts.length > 0 )
  {
    const [ nextPart, ...restParts ] = parts
    const nextPath = path.join(filepath,nextPart)
    let nextLinkPath = readSymlink(nextPath)
    if ( nextPath !== nextLinkPath )
    {
      if ( !path.isAbsolute(nextLinkPath) )
        nextLinkPath = path.resolve(filepath,nextLinkPath)

      return resolveFull ( path.join(resolveFull(nextLinkPath),...restParts) )
    }
    else {
      return resolveFull ( nextPath, restParts )
    }
  }
  else 
  {
    return filepath
  }

}