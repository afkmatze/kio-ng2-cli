import { Observable, Scheduler } from 'rxjs'
import * as cache from './cache'
import * as env from './env/constants'
import * as path from 'path'
import * as fs from 'fs'
import { KioComponentFilter, KioComponentType, findComponents, PublicationComponent, Component } from './components'
import { IndexName, IndexType, ComponentIndex } from './indexes/interfaces'
import { dataForIndex } from './indexes/template'
import { dataForTemplate } from './components/template'
import { componentFilterForIndexType, IndexFileMap, getIndexFilePath, getIndex, getIndexData } from './indexes'
import { filterStream } from './indexes/stream'
import { template, TemplateName } from './templates'
import * as logger from './console'
import { ComponentModel, getComponents } from './components'
export { ComponentModel, getComponents }


export const targetDirForTemplate = ( templateName:"index"|"src"|"fragment"|"txt" ) => {
  if ( templateName === "index" )
  {
    return env.KIO_PATHS.root
  }
  return path.join(env.KIO_PATHS.components.publication,templateName)
}



export const components = ( components:Observable<ComponentModel> ) => {
  return {
    renderTemplate: ( templateName:TemplateName, indexName?:IndexName ) => {
      const indexTemplate = template(templateName)
      if ( templateName === 'index' )
      {
        cache.cachedComponents().filter(filterStream(indexName)).subscribe((value)=>{
          throw Error("Weiter hier")
        })
      }
    }
  }
}