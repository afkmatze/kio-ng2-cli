import { ExecOptions } from 'child_process'


export interface CommandParams {
  commandName:string
  args:string[]
}

export interface ChildProcessOptions extends ExecOptions {
  command:CommandParams|string;
  cwd?:string;
}

export interface ExecCallback {
  ( exitcode:number, stdout:string, stderr:string ):void
}


export interface ChildProcessData<T> {
  data:T
}

export interface ChildProcessError extends ChildProcessData<string> {
  code:number;
}

export interface ChildProcessBuffer extends ChildProcessData<Buffer> {}

export interface StreamData<T> {
  stdout:T
  stderr:T
}

/** events */

export type ChildProcessEventName = 'fail'|'close'|'stdout'|'stderr'

export interface ChildProcessEvent<ChildProcessEventName> {
  name:ChildProcessEventName  
}

export interface ChildProcessFailEvent extends ChildProcessEvent<'fail'> {
  error:Error
}

export interface ChildProcessCloseEvent extends ChildProcessEvent<'close'> {
  code:number
  signal:string
}

export interface ChildProcessDataEvent<ChildProcessEventName> extends ChildProcessEvent<ChildProcessEventName> {
  data:Buffer
}

export interface ChildProcessStderrDataEvent extends ChildProcessDataEvent<'stderr'> {}

export interface ChildProcessStdoutDataEvent extends ChildProcessDataEvent<'stdout'> {}