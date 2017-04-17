import { Observable } from 'rxjs'
export type HRTime = [number,number]

const getT = (prev?:HRTime):HRTime => {
  return process.hrtime(prev)
}
const t0=getT()

const logTs = (format:string,...args:any[]) => {
  const td:HRTime = getT(t0)
  console.log('\x1b[1m[%s]\x1b[0m | '+format,td,...args)
}

const logStart = ( key:string ) => {
  const t0 = getT()
  const log = (format:string,...args:any[]) => {
    const td = getT(t0)
    console.log('\x1b[1m[%s : %s]\x1b[0m | '+format,key,td,...args)
  }
  log('start')
  return {
    log
  }
}
const rand = () => {
  return `${Math.floor(Math.random()*10000000)}_${getT()}`
}


let cnt = 0
export const logObserver = ( obs:Observable<any> ) => {

  const t = logStart('observer '+(cnt++))
  const sub = obs.subscribe(
      (value:any) => {
        t.log('next: \x1b[2m%s\x1b[0m',JSON.stringify(value,null,'  '))
      },
      (error:any) => {
        t.log('error')
      },
      () => {
        t.log('done')
        sub && sub.unsubscribe()
      }
    )

  return obs
}
