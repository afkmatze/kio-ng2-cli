import { writer } from '../writer'

export interface DebuggerOptions {
  debugKey?:string
  envKey?:string
}

export const DebuggerOptionsDefault = {
  debugKey: 'debug',
  envKey: 'KIO_CLI_ENV'
}

export function createDebugger( opts?:DebuggerOptions ){
  const {
    debugKey=DebuggerOptionsDefault.debugKey,
    envKey=DebuggerOptionsDefault.envKey
  } = opts || {}
  const envValue = process.env[envKey]
  const envExpression = new RegExp(debugKey)
  if ( envExpression.test(envValue) )
  {
    const debugWriter = writer(`[${debugKey}:${envKey}]`)
    debugWriter('INITIALIZED DEBUGGER')
    return debugWriter
  }
  return ( ...args:any[] ) => {}
}