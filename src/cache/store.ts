import * as shelljs from 'shelljs'
import * as path from 'path'
import { CacheType } from './enums'
import { CachePath } from './interfaces'

import { KIO_PROJECT_CACHE } from '../env/constants'

export const ensure = ( ...args:string[] ) => {
  const resolvedPath = resolve(...args)
  shelljs.mkdir('-p',resolvedPath)
  return resolvedPath
}

export const resolve = ( ...args:string[] ) => {
  return path.resolve(path.join(KIO_PROJECT_CACHE,...args))
}
