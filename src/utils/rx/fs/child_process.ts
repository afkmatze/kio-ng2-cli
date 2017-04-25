import * as cp from 'child_process'
import { Observable, Observer, Scheduler, AsyncSubject } from 'rxjs'
import { ExecOptions } from 'child_process'
import { ExecData } from './interfaces'

export interface CommandParams {
  commandName:string
  args:string[]
}

export interface ChildProcessOptions {
  command:CommandParams|string;
  cwd?:string;
}

export interface ExecCallback {
  ( exitcode:number, stdout:string, stderr:string ):void
}

const parseCommand = ( command:CommandParams|string ):CommandParams => {
  if ( 'string' !== typeof command )
  {
    return command
  }

  const [ commandName, ...args ] = command.split(' ') || ['']
  return {
    commandName,
    args
  }
}

const spawnCommand = ( command:CommandParams, spawnOptions?:cp.SpawnOptions ):cp.ChildProcess => {
  return cp.spawn(command.commandName,command.args,spawnOptions)
}


export class ChildProcess {

  constructor(options:ChildProcessOptions)
  {
    this.command = parseCommand(options.command)
    if ( options.cwd )
    {
      this.pwd = options.cwd
    }
  }

  private __logs:any[]=[]

  protected log(eventName:string,...args:any[]){
    const log = {
      t: new Date(),
      eventName,
      args
    }

    this.__logs.push(log)
    this.printLog(log)
  }

  protected printLog(log:any,idx?:number){
    console.log('[%s at %s] %s\t%s', log.eventName, log.t, idx||'', ...log.args)
  }

  protected command:CommandParams;
  protected pwd:string=process.cwd();


  private __stdout:Observable<Buffer>
  private __stderr:Observable<Buffer>

  private __stdout_observer:Observer<Buffer>
  private __stderr_observer:Observer<Buffer>


  get stdout():Observable<Buffer>{
    return this.__stdout
  }

  get stderr():Observable<Buffer>{
    return this.__stderr
  }

  private __stdout_data:string = ''
  private __stderr_data:string = ''


  private createObserver(typeName:'stdout'|'stderr'):Promise<Observer<Buffer>>{
    return new Promise((resolve,reject)=>{
      this.log('create observer: ', typeName)

      switch (typeName) {
        case "stderr":
          this.__stderr = Observable.create((observer:Observer<Buffer>)=>{
            this.log('create __stderr_observer')
            this.__stderr_observer = observer
            resolve(observer)
          })
          break;
        
        case "stdout":
          this.__stdout = Observable.create((observer:Observer<Buffer>)=>{
            this.log('create __stdout_observer')
            this.__stdout_observer = observer
            resolve(observer)
          })
          break;
        
      }
    })
  }


  private createObservers(){
    this.log('create observers')

    return Observable.forkJoin(
        this.createObserver('stdout'),
        this.createObserver('stderr')
      ).toArray()
  } 

  private _spawn(callback?:ExecCallback){
    const stdout = this.__stdout_observer
    const stderr = this.__stderr_observer

    const pushStdout = ( data:Buffer ) => {
      this.__stdout_data += data.toString('utf8')
      stdout.next(data)
    }

    const pushStderr = ( data:Buffer ) => {
      this.__stderr_data += data.toString('utf8')
      stderr.next(data)
    }

    const finish = ( error?:any ) => {
      if ( error )
      {
        stdout.error(error)
        stderr.error(error)
      }
      else
      {
        stdout.complete()
        stderr.complete()
      }
    }

    const child = spawnCommand(this.command,{  
        cwd: this.pwd
      }
    )

    child.on('close',(code:number,signal:string)=>{
      this.log('close',{code,signal})
      finish()
      callback && callback(code,this.__stdout_data,this.__stderr_data)
    })

    child.stdout.on('data',(data:Buffer)=>{
      pushStdout(data)
    })

    child.stderr.on('data',(data:Buffer)=>{
      pushStdout(data)
    })

    child.on('error',(error:Error)=>{
      finish(error)
    })

  }

  private _execCallback:ExecCallback

  exec(callback?:ExecCallback){
    this._execCallback = callback
    return Observable.fromPromise(new Promise((resolve, reject)=>{
        process.nextTick(()=>{
          this.log('will create')
          this.createObservers()
            .flatMap( observers => {
              process.nextTick(()=>{
                this._spawn(callback)
              })
              return Observable.forkJoin(this.__stdout,this.__stderr)
            } )
        })            
    }))
  }

}