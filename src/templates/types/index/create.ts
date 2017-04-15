import { IndexTemplate, TemplateName, TemplateFile, TemplateSource, Template, TemplateData } from '../../interfaces'
import { Types } from '../../types'
import { resolveTargetWithName } from '../../resolveTarget'
import { findTemplateSourceFiles } from '../../files'

export const createTemplateSource = ( name:TemplateName, files?:TemplateFile[] ):TemplateSource => {
  const type = Types[name]
  return {
    name ,
    files: files || findTemplateSourceFiles(name)
  }
}

export const createTemplateByName = ( templateName:TemplateName ):IndexTemplate => {

  const type = Types[templateName]

  const template:IndexTemplate = {
    source: createTemplateSource(templateName),
    targetRoot: resolveTargetWithName(templateName)
  }

  return template
}

export const createTemplate = ( source:TemplateSource, data:TemplateData<"index">, targetRoot:string ):IndexTemplate => {
  const template:IndexTemplate = {
    source,
    data,
    targetRoot
  }
  return template
}
