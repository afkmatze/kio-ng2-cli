import * as shelljs from 'shelljs'

export const shellFlag = ( testFlag:string, value:string ):boolean => {
  return shelljs.exec(`[[ ${testFlag} ${value} ]]`).code === 0
}