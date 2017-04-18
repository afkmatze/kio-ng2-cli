import { LoggerApi, LogOperatorPlugin, LogOperatorReturnValue, LogOperator, LogWriter } from '../interfaces'
import * as chalk from 'chalk'

export type KeySelector = "*"|string|string[]

export interface LogWriterKeys extends LogWriter {
  ( item:any, idx?:number, list?:any ):any
}

export interface LogOperatorKeys extends LogWriter {
  ( target:any, selector?:KeySelector, format?:string, ...args:any[] ):void
}


const selectKeys = ( target:any, selector:KeySelector="*" ):string[] => {
  if ( 'string' === typeof selector )
  {
    if ( selector === "*" )
      return Object.keys(target)
    return selector.split(/[\|,]/gm)
  }
  return selector.slice()
}


export const operatorKeys:LogOperatorPlugin = ( logger:LoggerApi ):LogOperatorKeys => {
  const op:LogOperatorKeys = ( target:any, selector?:KeySelector, format?:string, ...args:any[] ) => {
    const keys = selectKeys(target,selector)
    logger.log(format || 'keys of ', ...(args.length>0?args:[target]) )
    keys.forEach((key,idx)=>{
      logger.log('[%s]%s => %s',typeof target[key], key, target[key])
    })
  }
  return op
}