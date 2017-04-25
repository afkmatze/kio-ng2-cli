import { Observable } from 'rxjs'
import * as path from 'path'
import { existsSync } from './fs'
import { exec } from './exec'

export const find = ( filepath:string, concurrent?:number ):Observable<string> => {
  if ( !existsSync(filepath) )
    return Observable.empty()
  return exec(`find .`,{cwd: filepath})
        /*.catch(error => {
          console.log('cannot exec find. ', error )
          console.error(error)
          return Observable.throw(error)
        })*/
        .map ( value => {
          return value.stdout.toString('utf8').split('\n')
        } )
        /*.flatMap(value => {
          return Observable.of(value)
        })*/
        .flatMap(value => Observable.of(value))
}

export const findFiles = ( filepath:string, pattern:RegExp=/.*/ ):Observable<string> => {
  if ( !existsSync(filepath) )
  {
    return Observable.empty()
  }
  return exec(`find . -type file`,{cwd: filepath})
      .map(value => path.join(filepath,value.stdout.toString('utf8')))
      .filter(value => !path.basename(value).startsWith('.') )
      .filter(filename => pattern.test(filename) )
      .flatMap(value => Observable.of(value)).concat()
}