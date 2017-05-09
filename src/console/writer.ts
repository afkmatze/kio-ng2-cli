import * as chalk from 'chalk'
import * as path from 'path'
import * as readline from 'readline'
import { RequestCallback } from './interfaces'
import { formatter } from './format'

export const writer = ( prefix:string ) => ( format:string, ...args:any[] ):void => {
  const out = formatter.printf(format,...args)
  //console.log ( chalk.dim(prefix) + format, ...args )  
  console.log ( chalk.dim(prefix) + out )  
}