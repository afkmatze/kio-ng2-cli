import * as cache from './cache'
import * as env from './env/constants'
import * as path from 'path'
import * as fs from 'fs'
import { KioComponentFilter, KioComponentType, findComponents, PublicationComponent, Component } from './components'
import { IndexName, IndexType, ComponentIndex } from './indexes/interfaces'
import { dataForIndex } from './indexes/template'
import { dataForTemplate } from './components/template'
import { componentFilterForIndexType, IndexFileMap, getIndexFilePath, getIndex, getIndexData } from './indexes'
import { TemplateFile, TemplateFiles, IndexTemplateData, TemplateName, TemplateData, createTemplate, readTemplate, writeTemplate, renderTemplate } from './template'
import * as template from './template'
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

export type TemplateArg = TemplateFiles|TemplateName

export const render = ( templateName:TemplateArg, data:TemplateData ):TemplateFiles => {
  if ( 'string' === typeof templateName )
  {
    const template:TemplateFiles = createTemplate(templateName,targetDirForTemplate(templateName))
    return render(template,data)
  }
  readTemplate(templateName)
  //renderTemplate(<TemplateFiles>templateName,data)
  return writeTemplate(<TemplateFiles>templateName)
}

export const renderIndex = ( indexName:IndexName, fromCache:boolean=true ):string => {
  const componentIndex:ComponentIndex = getIndex(indexName,fromCache)
  const indexData = dataForIndex(componentIndex)
  return template.renderIndex(indexData)[0]
}

export const writeIndex = ( indexName:IndexName, fromCache:boolean=true ) => {
  const source = renderIndex(indexName,fromCache)
  const filename = getIndexFilePath(indexName)
  return fs.writeFileSync(filename,source,{encoding: 'utf8'})
}

export const renderPublicationComponent = ( publicationComponent:PublicationComponent ):template.TemplateFiles => {
  const tmpl = template.createTemplate("publication",publicationComponent.dir)
  return tmpl
}
