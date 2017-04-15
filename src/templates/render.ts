import { Template, TemplateFile, TemplateData, TemplateName, TemplateSource } from './interfaces'
import * as shelljs from 'shelljs'
import * as path from 'path'
import * as ejs from 'ejs'
import * as fs from 'fs'
import { Types } from './types'
import * as logger from '../console'
import { createTemplate } from './create'

export const readTemplateFile = ( templateFile:TemplateFile ) => {
  return fs.readFileSync(templateFile.absoluteFilepath,'utf8')
}

export const renderTemplateFile = ( templateFile:TemplateFile, templateData:TemplateData ) => {
  const source = readTemplateFile(templateFile)
  logger.log('writing to "%s"', templateFile.filename, '\n', source )
  return ejs.render(source,templateData)
}

export const renderTemplateSource = ( source:TemplateSource, data:TemplateData, targetRoot:string ) => {
  const template = createTemplate(source,data,targetRoot)
  return renderTemplate(template)
}

export const renderTemplate = ( template:Template ) => {

  const type = Types[template.source.name]

  logger.log('template.targetRoot: %s', template.targetRoot)

  template.source.files.forEach(sourceFile=>{
    const targetFile:TemplateFile = type.mapTemplateFile(sourceFile,template.data,template.targetRoot)
    const content = renderTemplateFile(sourceFile,template.data)
    shelljs.mkdir('-p',path.dirname(targetFile.absoluteFilepath))
    fs.writeFileSync(targetFile.absoluteFilepath,content,'utf8')
  })

}