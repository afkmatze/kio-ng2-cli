import * as rxfs from 'rxfs'
import * as shelljs from 'shelljs'

export const req = ( filepath:string ) => {
  const cp = shelljs.exec(`tsc "${filepath}"`)
  const transpiledFilepath = filepath.replace(/ts$/,'js')
  const data = require(transpiledFilepath)
  shelljs.rm(transpiledFilepath)
  return data
}