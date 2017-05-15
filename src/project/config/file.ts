import { ConfigFile } from './interfaces'

export const read = ( filepath:string ):ConfigFile => {
  return require(filepath)
}