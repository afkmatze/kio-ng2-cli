import { KIO_PROJECT_CACHE, KIO_PROJECT_ROOT, KIO_PATHS } from '../env/constants'
import { CachePath } from './interfaces'
import { ensure, resolve } from './store'
import * as logger from '../console'
import { rm } from 'shelljs'
import { createComponentsCache } from './types/components'


export const clearCache = (cacheName?:CachePath) => {
  const cachePath = resolve(cacheName||'')
  logger.debug('clear cache',cachePath)
  rm('-rf',cachePath)
}

export default clearCache