import { PublicationTemplate, TemplateName, TemplateFile, TemplateSource, Template, TemplateData } from '../../interfaces'
import { PublicationComponentTemplateData } from '../interfaces'
import { Types } from '../../types'
import { resolveTargetWithName } from '../../resolveTarget'
import { findTemplateSourceFiles } from '../../files'


export type ComponentDataKey = "contentType"|"styles"|"modifiers"|"childTypes"|"dasherizedModuleName"|"classifiedModuleName"|"classifiedParentComponentName"|"pathToStructureComponents"|"dasherizedParentComponentPath"|"selector"|"dasherizedModuleName"
export const DataKeys:ComponentDataKey[] = [
  "contentType",
  "styles",
  "modifiers",
  "childTypes",
  "dasherizedModuleName",
  "classifiedModuleName",
  "classifiedParentComponentName",
  "pathToStructureComponents",
  "dasherizedParentComponentPath",
  "selector",
  "dasherizedModuleName"
]

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
    targetRoot: resolveTargetWithName(templateName),
    name: 'publication'
  }

  return template
}

export const createTemplate = ( source:TemplateSource, data:PublicationComponentTemplateData, targetRoot:string ) => {
  const template:PublicationTemplate = {
    source,
    data,
    targetRoot
  }
  return template
}
