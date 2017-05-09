import * as chalk from 'chalk'
import * as path from 'path'
import * as readline from 'readline'
import { RequestCallback } from './interfaces'
import { formatter } from './format'
import { writer } from './writer'
import { createDebugger, DebuggerOptions, DebuggerOptionsDefault } from './debug/create'

const pckg = require('../../package.json')
const ROOT_PATH = path.resolve(__dirname,'../../')

export const banner = () => {
  console.log( '%s v%s', chalk.yellow(pckg.name), pckg.version )
}

export const log = writer('[kio-ng2-cli] ')

export const logError = ( error:Error|string, exit:boolean=true ) => {
  console.log ( chalk.red(error) )
  //console.log ( error.stack.replace(/.*\n/,'') ) 
  if ( exit ) { process.exit(1) }
}

export const getStack = () => {
  let err:Error = null
  try{
    err = Error()    
  }catch(e){}
  return err.stack.split('\n').slice(2).map ( traceRoute => {

    const rx_name = /at\ ([\w|\.]+)/
    const rx_alias = /as\ (\w+)/
    const rx_filepath = /\(([\w|\D]+)\:(\d+)\:(\d+)\)$/
    const [ name_src=undefined, name=undefined ] = traceRoute.match ( rx_name )  || []
    const [ alias_src=undefined, alias=undefined ] = traceRoute.match ( rx_alias ) || []
    const [ filepath_src=undefined, filepath=undefined, line=undefined, column=undefined ] = traceRoute.match ( rx_filepath ) || []
    return {
      name, 
      alias, 
      filepath, 
      line, 
      column,
      toString(){
        return `at ${name} ` + ( alias ? `[as ${alias}] ` : '' ) + `(${filepath}:${line}:${column})`
      }
    }
  } )
}

export const trace = (label?:string,...args:any[]) => {
  const stack = getStack().slice(1)
  if ( label )
  {
    log(chalk.bold(label),...args)
  }
  stack.forEach ( item => log(printStackItem(item)) )
}

export const printStackItem = ( item=getStack()[0], short:boolean=true ) => {
  return `(./${item.filepath ? path.relative(ROOT_PATH,item.filepath) : ''}:${item.line}:${item.column})`
}


export const debug = process.env.NODE_ENV === 'debug' ? writer(`[DEBUG:kio-ng2-cli] `) : ( ...args:any[] )=>{}

export const request = ( message:string, callback:RequestCallback ):Promise<any> => {
  const options:readline.ReadLineOptions = {
    input: process.stdin,
    output: process.stdout,
    terminal: true
  }
  const rl = readline.createInterface(options)

  return new Promise((resolve,reject)=>{

    const validateAnswer = ( answer:string ) => {
      const error = callback(answer)
      if ( !error )
      {
        resolve ( answer )
      }
      else 
      {
        logError ( Error(error), false )
        rl.question(message,validateAnswer)
      }
    }

    rl.question(message,validateAnswer)
  })
}
export { createDebugger }
export default createDebugger