export * from './interfaces'
export * from './command'
export * from './ChildProcess.class'

import { Observable, Scheduler } from 'rxjs'
import { 
  CommandParams, ChildProcessOptions, ExecCallback,
  ChildProcessData, ChildProcessBuffer, ChildProcessError,
  StreamData,
  ChildProcessEventName,
  ChildProcessEvent, 
  ChildProcessFailEvent, ChildProcessCloseEvent,
  ChildProcessDataEvent, ChildProcessStderrDataEvent, ChildProcessStdoutDataEvent
} from './interfaces'
import { parseCommand  } from './command'

import { ChildProcess } from './ChildProcess.class'


export const spawn = ( commandOptions:ChildProcessOptions|string, opts?:any ):Observable<StreamData<Buffer>> => {
  if ( 'string' === typeof commandOptions )
  {
    return spawn({
      command: parseCommand(commandOptions),
      ...opts
    })
  }
  console.log('commandOptions',commandOptions)
  const cp = new ChildProcess(commandOptions)
  
  return Observable.from(cp.spawn()).concatMap( stream => stream )
}

export const createChildProcess = ( commandOptions:ChildProcessOptions|string, opts?:any ) => {
  if ( 'string' === typeof commandOptions )
  {
    return createChildProcess({
      command: parseCommand(commandOptions),
      ...opts
    })
  }
  return new ChildProcess(commandOptions)
}