import { Observable, Scheduler } from 'rxjs'
import { Project, ProjectEnv } from './interfaces'
import { files } from './files'
import { cache, ComponentCacheFileContent, ComponentFixture } from './cache'
import * as _ from 'lodash'

export default ( projectEnv:ProjectEnv ) => {
  
  return {
    files: files(projectEnv),
    cache: cache(projectEnv)
  }

}