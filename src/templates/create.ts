import { Template, TemplateFile, TemplateData, TemplateName, TemplateSource } from './interfaces'
import { Types } from './types'

import { resolveTargetWithName } from './resolveTarget'
import { findTemplateSourceFiles } from './files'

export const createTemplateSource = ( name:TemplateName, files?:TemplateFile[] ):TemplateSource => {
  const type = Types[name]
  return {
    name ,
    files: files || findTemplateSourceFiles(name)
  }
}

export const createTemplateByName = ( templateName:TemplateName ):Template => {

  const type = Types[templateName]

  const template:Template = {
    source: createTemplateSource(templateName),
    targetRoot: resolveTargetWithName(templateName)
  }

  return template
}

export const createTemplate = ( source:TemplateSource, data:TemplateData, targetRoot:string ) => {
  const template:Template = {
    source,
    data,
    targetRoot
  }
  return template
}
