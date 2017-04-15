import { TemplateFiles, TemplateFile } from './interfaces'
import * as env from '../env'
import { find, cat } from 'shelljs'

export const getTemplateFiles = ( template:TemplateFiles|string ):TemplateFile[] => {
  if ( 'string' === typeof template )
  {
    return find(env.path.join(env.TEMPLATES,template))
      .filter ( filepath => !!env.path.extname(filepath) )
      .map ( filepath => {
        const relfilepath = env.path.relative(env.TEMPLATES,filepath)
        return {
          filename: relfilepath
        }
      } )
  }
  return getTemplateFiles(template.templateName)  
}

export const readTemplateFile = ( template:TemplateFiles, templateFile:TemplateFile ):TemplateFile => {
  templateFile.source = cat(env.path.resolve(env.TEMPLATES,templateFile.filename)).toString()
  return templateFile
}
