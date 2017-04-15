import { PublicationTemplate, IndexTemplate, TemplateName, TemplateFile, TemplateSource, Template, TemplateData } from '../interfaces'
import { Types } from '../types'
import { resolveTargetWithName } from '../resolveTarget'
import { findTemplateSourceFiles } from '../files'

import * as index from './index.source'
import * as publication from './publication.source'

export const createTemplateSource = ( name:TemplateName, files?:TemplateFile[] ):TemplateSource => {
  const type = Types[name]
  return {
    name ,
    files: files || findTemplateSourceFiles(name)
  }
}

export const createTemplateByName = ( templateName:TemplateName ):PublicationTemplate => {

  const type = Types[templateName]

  const template:PublicationTemplate = {
    source: createTemplateSource(templateName),
    targetRoot: resolveTargetWithName(templateName)
  }

  return template
}

export type TemplateDataRef = TemplateData<"publication">|TemplateData<"index">

export const createTemplate = ( source:TemplateSource, data:TemplateDataRef, targetRoot:string ) => {
  if ( data.type === "publication" )
    return publication.createTemplate(source,data,targetRoot)
  else if ( data.type === "index" )
    return index.createTemplate(source,data,targetRoot)
}
