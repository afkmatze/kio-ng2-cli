import { KIO_PROJECT_CACHE, KIO_PROJECT_ROOT, KIO_PATHS } from '../env/constants'
import { CachePath } from './interfaces'
import { ensure, resolve } from './store'
import { createComponentsCache } from './types/components'

export const createCache = ( cacheType:CachePath ) => {
  const cachePath = ensure(cacheType)
  return createComponentsCache(cachePath)
}

export default createCache