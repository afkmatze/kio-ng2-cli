//import * as assert from 'assert'
import { assert } from 'ceylon'
import { expect , use } from './extension'
import * as fs from 'fs'
import * as logger from '../console'

const negateMethodName = ( methodName:string ):string => {
  return methodName.replace(/^to/,'toNot')
}

export enum FSTypes {
  file,
  directory,
  block_device,
  character_device,
  symbolic_link,
  fifo,
  socket
}

export type FSType = "file"|"directory"|"socket"
export type FSFlag = "file"|"directory"|"block_device"|"character_device"|"symbolic_link"|"fifo"|"socket"

export const flagMatcher = {
  file: (stats:fs.Stats) => stats.isFile(),
  directory: (stats:fs.Stats) => stats.isDirectory(),
  block_device: (stats:fs.Stats) => stats.isBlockDevice(),
  character_device: (stats:fs.Stats) => stats.isCharacterDevice(),
  symbolic_link: (stats:fs.Stats) => stats.isSymbolicLink(),
  fifo: (stats:fs.Stats) => stats.isFIFO(),
  socket: (stats:fs.Stats) => stats.isSocket()
}

export const isFSType = ( value:fs.Stats, fsType:FSType ) => {
  const matcher = flagMatcher[fsType]
  return matcher ? matcher(value) : false
}

export const getFSTypeForStats = ( value:fs.Stats ) => {
  if ( isFSType(value,"file") )
    return "file"
  
  if ( isFSType(value,"directory") )
    return "directory"
  
  if ( isFSType(value,"socket") )
    return "socket"

  return undefined
}

export interface AssertionCallback {
  ( not:boolean, actual:string, fsType:FSType, message?:string ):void
}

export interface BoundAssertionCallback {
  ( actual:string, expected:string, message?:string ):void
}

export interface FSAssertion {
  [key:string]: AssertionCallback
}

export interface BoundFSAssertion {
  toBeDirectory(filepath:string,message?:string)
  toBeADirectory(filepath:string,message?:string)
  toNotBeDirectory(filepath:string,message?:string)
  toNotBeADirectory(filepath:string,message?:string)
  [key:string]: BoundAssertionCallback
}

export const FileSystemAssertions:FSAssertion = {
  toBeFSType: ( not:boolean=false, actual:string, fsType:FSType, message?:string ) => {
    logger.debug('toBeFSType actual: %s, fsType: %s, message', actual, fsType, message )
    const stats = getStats(actual)
    assert({
      assertion: isFSType(stats,fsType) !== not,
      message: message || `expected ${actual} ${not?'not ':''}to be a ${fsType}`,
      expected: fsType,
      actual: getFSTypeForStats(stats)
    })
  },
  toBeDirectory: ( not:boolean=false, actual:string, message?:string ) => {
    return FileSystemAssertions.toBeFSType ( not, actual, "directory", message )
  },  
  toBeFile: ( not:boolean=false, actual:string, message?:string ) => {
    return FileSystemAssertions.toBeFSType ( not, actual, "file", message )
  }
}

export const emptyStats:fs.Stats = {
  isFile: ()=>false,
  isDirectory: ()=>false,
  isBlockDevice: ()=>false,
  isCharacterDevice: ()=>false,
  isSymbolicLink: ()=>false,
  isFIFO: ()=>false,
  isSocket: ()=>false,
  dev: undefined,
  ino: undefined,
  mode: undefined,
  nlink: undefined,
  uid: undefined,
  gid: undefined,
  rdev: undefined,
  size: undefined,
  blksize: undefined,
  blocks: undefined,
  atime: undefined,
  mtime: undefined,
  ctime: undefined,
  birthtime: undefined
}

export const getStats = ( filepath:string ):fs.Stats => {
  let stats:fs.Stats = emptyStats
  try{
    stats = fs.statSync(filepath)
  }catch(e){}

  return stats
}

export const assertExists = ( filepath:string, message?:string ) => {
  assert({
    assertion: getStats(filepath) !== emptyStats ,
    message: message || `expected ${filepath} to exist`
  })
}

export const expectFile = ( filepath:string ) => {

  const _expect = expect(filepath)
}

export const assertFs = ( filepath:string ):FSAssertion => {

}

export default ( filepath:string ) => {

  const assertionScope = {
    actual: filepath+''
  }

  const assertions = {
    toBeFSType: ( fsType:FSType, message?:string ) => FileSystemAssertions.toBeFSType ( false, filepath, fsType, message||undefined ),
    toBeDirectory: ( message?:string ) => FileSystemAssertions.toBeFSType ( false, filepath, "directory", message||undefined ),
    toBeADirectory: ( message?:string ) => FileSystemAssertions.toBeFSType ( false, filepath, "directory", message||undefined ),
    toBeFile: ( message?:string ) => FileSystemAssertions.toBeFSType ( false, filepath, "file", message||undefined ),
    toBeAFile: ( message?:string ) => FileSystemAssertions.toBeFSType ( false, filepath, "file", message||undefined ),
    toNotBeFSType: ( fsType:FSType, message?:string ) => FileSystemAssertions.toBeFSType ( true, filepath, fsType, message||undefined ),
    toNotBeDirectory: ( message?:string ) => FileSystemAssertions.toBeFSType ( true, filepath, "directory", message||undefined ),
    toNotBeADirectory: ( message?:string ) => FileSystemAssertions.toBeFSType ( true, filepath, "directory", message||undefined ),
    toNotBeFile: ( message?:string ) => FileSystemAssertions.toBeFSType ( true, filepath, "file", message||undefined ),
    toNotBeAFile: ( message?:string ) => FileSystemAssertions.toBeFSType ( true, filepath, "file", message||undefined )
  }
  
  return assertions
  
}