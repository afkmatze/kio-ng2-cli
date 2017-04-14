import { KIO_PROJECT_CACHE, KIO_PROJECT_ROOT, KIO_PATHS } from '../env/constants'
import { CachePath } from './interfaces'
import * as logger from '../console'
import { ensure, resolve } from './store'
import { createWithData, Component, PublicationComponent, ComponentModel } from '../components'
import { find, cat } from 'shelljs'
import * as path from 'path'
import { readComponentsCache } from './types/components'

const isJSON = ( filename:string ) => /\.json$/i.test(filename)

export const readCache = ( cacheType:CachePath, ...pathNames:string[] ):ComponentModel[] => {
  const cachePath = ensure(cacheType,...pathNames)
  return readComponentsCache(cachePath)
}