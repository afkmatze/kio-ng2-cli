import { find, cat } from 'shelljs'
import { TEMPLATES } from '../env/constants'
import * as path from 'path'
import { TemplateFiles, TemplateFile } from './interfaces'

const resolveTemplate = ( ...args:string[] ) => path.join(TEMPLATES,...args)

export const getFiles = ( templateName:string ):TemplateFile[] => {
  const files:TemplateFile[] = find(resolveTemplate(templateName)).filter(item=>!!path.extname(item)).map(item=>{
    return {
      filename: item
    }
  })
  return files
}

export const readTemplateFile = ( templateFiles:TemplateFiles, templateFile:TemplateFile ) => {
  if ( !path.isAbsolute (templateFile.filename) )
    templateFile.filename = resolveTemplate(templateFiles.templateName,templateFile.filename)
  templateFile.source = cat(templateFile.filename)  
}

export const readFile = ( templateName:string, templateFile:string ) => {
  if ( !path.isAbsolute (templateFile) )
    templateFile = resolveTemplate(templateName,templateFile)
  return cat(templateFile)
}