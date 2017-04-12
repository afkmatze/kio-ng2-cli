import * as chalk from 'chalk'
import * as readline from 'readline'

const pckg = require('../../package.json')

export const banner = () => {
  console.log( '%s v%s', chalk.yellow(pckg.name), pckg.version )
}

export const log = ( format:string, ...args:any[] ):void => {
  console.log ( chalk.dim('[kio-ng2-cli]') + format, ...args )  
}

export const logError = ( error:Error, exit:boolean=true ) => {
  console.log ( chalk.red(error.toString()) )
  //console.log ( error.stack.replace(/.*\n/,'') ) 
  if ( exit ) { process.exit(1) }
}

export interface RequestCallback {
  (answer:string):string
}

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