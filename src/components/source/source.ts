import { Observable, Scheduler } from 'rxjs'
import { ComponentSource, PublicationComponent, Component, ComponentModel } from './interfaces'

import { trace } from '../../console'
import tscStream from './tsc/stream'
import cacheStream from './cache/stream'

export const getSource = ( sourceType:'cache'|'tsc' ):Observable<Component> => {

  if ( sourceType === 'cache' )
  {
    return cacheStream.fetch()
  }
  return tscStream.fetch()
}

export { tscStream , cacheStream }