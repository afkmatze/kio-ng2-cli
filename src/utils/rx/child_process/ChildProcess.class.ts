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
import * as cp from 'child_process'



export class ChildProcess {

  constructor(options:ChildProcessOptions)
  {
    this.options = options
  }

  options:ChildProcessOptions

  pid:number

  private ref:cp.ChildProcess

  /**
   * spawn child process and return pid
   * @return {Promise<number>} [description]
   */
  spawn():Promise<Observable<StreamData<Buffer>>>{
    return new Promise((resolve,reject) => {
      const command = parseCommand(this.options.command)
      const cwd = this.options.cwd || process.cwd()
      console.log('spawn command:', command, cwd )
      this.ref = cp.spawn(command.commandName,command.args,{
        cwd
      })
      this.bindChildProcess()
      process.nextTick(()=>resolve(this.stream))
    })
  }

  private __onFail:Observable<ChildProcessFailEvent>
  private __onClose:Observable<ChildProcessCloseEvent>
  private __onStdoutData:Observable<ChildProcessStdoutDataEvent>
  private __onStderrData:Observable<ChildProcessStderrDataEvent>
  
  private __lastError:string

  get end():Observable<number>{
    return this.__onClose.map(e=>e.code)
  }

  get stdout():Observable<Buffer>{
    return Observable.from(this.__onStdoutData).map( eventData => eventData.data )
      .takeUntil(
          Observable.race(this.__onClose,this.__onFail)
        )
  }
  
  get stderr():Observable<Buffer>{
    return Observable.from(this.__onStderrData).map( eventData => eventData.data )
      .takeUntil(
          Observable.race(this.__onClose,this.__onFail)
        )
  }

  get stream():Observable<StreamData<Buffer>>{
    return Observable.merge(
      this.__onStdoutData.map(event => {
        return {stdout: event.data} 
      }),
      this.__onStderrData.map(event => {
        this.__lastError = event.data.toString('utf8')
        return {stderr: event.data} 
      })
    )
    .takeUntil(
      Observable.merge(
        this.__onClose.flatMap(
          event => event.code 
          ? Observable.throw(Error(`Finished with code ${event.code}. Last Error: ${this.__lastError}` )) 
          : Observable.of(true) 
        ),
        this.__onFail.flatMap((error) => Observable.throw(error))
      )
    )
  }

  protected bindChildProcess(){
    this.__onFail = Observable.fromEvent(this.ref,'error',(error:Error)=>({error}))
    this.__onClose = Observable.fromEvent(this.ref,'close',(code:number,signal:string)=>({code,signal}))
    this.__onStdoutData = Observable.fromEvent(this.ref.stdout,'data',(data:Buffer)=>({data}))
    this.__onStderrData = Observable.fromEvent(this.ref.stderr,'data',(data:Buffer)=>({data}))
  }

}
