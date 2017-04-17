import { LogOperatorPlugin, LogOperatorReturnValue, LogOperator, LogWriter } from '../interfaces'
import * as chalk from 'chalk'

export interface LogWriterMap extends LogWriter {
  ( item:any, idx?:number, list?:any ):any
}

export interface LogOperatorMap extends LogOperator {
  ( label?:string, total?:number ):LogWriterMap
}

export const operator:LogOperatorPlugin = ( logger:any ):LogOperatorMap => {
  const createOperator:LogOperatorMap = ( label:string="item", total?:number ):LogWriterMap => {

    const formatLabel = ( item:any, idx?:number, list?:any[] ):string => {
      if ( typeof total === 'undefined' && !!list )
      {
        total = list.length
      }else {
        total = 0
      }

      if ( total > 0 )
      {
        return `${chalk.green.bold(label)} ${idx}/${total}`
      }
      return `${chalk.green.bold(label)} ${chalk.dim('#')}${idx}`
    }
    const writer:LogWriterMap = ( item:any , idx?:number, list?:any[] ):any => {
      logger.log(formatLabel(item,idx,list)+'\n---\n'+chalk.dim(item)+'\n---')
      return item
    }

    return writer
  }

  return createOperator
}

export default operator