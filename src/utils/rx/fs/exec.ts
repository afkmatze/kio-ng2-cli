import { Observable } from 'rxjs'
import { path, KIO_PROJECT_ROOT, KIO_PROJECT_CACHE, KIO_PATHS } from '../../../env'
import { ExecData } from './interfaces'
import { ExecOptions, exec } from 'child_process'
import { fromReadable } from './from'
import * as logger from '../../../console'

import { ChildProcessOptions, StreamData, spawn, ChildProcess, CommandParams, ExecCallback } from '../child_process'


const execChildProcess = ( command:string, opts?:ExecOptions|any ) => {
  return spawn({
    command,
    ...opts
  }).catch(error => {
    console.error(error)
    return Observable.throw(error)
  })
  /*.map ( data => {
    const {
      stderr,
      stdout
    } = data
    return {
      stderr: stderr.toString('utf8'),
      stdout: stdout.toString('utf8')
    }
  } )*/
}

const execObserve = ( command:string, opts?:ExecOptions ):Observable<ExecData> => {
  const cwd = (opts||{cwd: process.cwd()}).cwd
  const commandLog = `command: "${command}"`

  opts = opts || {
    cwd
  }

  //console.log(commandLog)
  const cp = exec(command,opts,(error,out)=>{
    //console.log('[%s] %s - end', new Date() , out , '\n---\nerror\n', error )
  })

  const obs = fromReadable(cp.stdout).map( stdout => ({stdout}) )
  const obsErr = fromReadable(cp.stderr).map( stderr => ({stderr}) )
  return Observable.merge(obs,obsErr)
}

export { execChildProcess as exec }


export const evalJS = ( filepath:string, opts?:ExecOptions ) => {
  const data = require(filepath)
  return Observable.of(data)
}


export const evalTS = ( filepath:string, opts?:ExecOptions ) => {
  const execRoot = opts && opts.cwd ? opts.cwd : KIO_PROJECT_ROOT
  const relFilepath = path.relative(execRoot,filepath)

  return execObserve ( `ts-node -e 'require("./${relFilepath}")'`, {cwd: execRoot} )
}
