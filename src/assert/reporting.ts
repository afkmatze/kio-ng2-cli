import { Observable } from 'rxjs'

export type HookCallbackResult<T> = Promise<T>|Observable<T>|void

export interface HookCallback {
  <T>():HookCallbackResult<T>
  (done:{(error?):void}):void
}

export interface SpecHook {
  callback:HookCallback
  //parent?:SpecHook
}

export interface LabeledSpecHook extends SpecHook {
  label:string
}

export interface TestScope {
  hook:LabeledSpecHook
  childScopes?:TestScope[]
}

export type HookType = 'it'|'describe'

export class TestContext {

  constructor(
    readonly type:HookType,
    readonly label:string,
    readonly callback:HookCallback,
    readonly parent?:TestContext
  ){}

  children:TestContext[]=[]

  addHook ( type:HookType, hook:LabeledSpecHook ) {
    const childContext = new TestContext(type, hook.label, hook.callback, this)
    this.children.push ( childContext )
  }

  describe ( label:string, callback:HookCallback ) {
    this.addHook ( 'describe', {label, callback} )
  }

  it ( label:string, callback:HookCallback ) {
    this.addHook ( 'it', {label, callback} )
  }

}

export const describe = ( label:string, callback:HookCallback ) => {
  console.log(label)
  callback()
}

export const it = ( label:string, callback:HookCallback ) => {
  console.log(label)
  let error
  try{
    callback()
  }catch(e){
    error = e
  }
  if ( error )
  {
    console.error(error)
  }  
}
