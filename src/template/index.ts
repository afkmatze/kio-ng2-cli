import * as read from './read'
import * as render from './render'
import { IndexTemplateData, ComponentTemplateData, TemplateFile, TemplateFiles } from './interfaces'
import * as path from 'path'
import * as fs from 'fs'
import * as ejs from 'ejs'
import * as env from '../env'
import { getTemplateFiles, readTemplateFile } from './files'

export * from './read'
export * from './interfaces'
export * from './render'

import { ComponentIndex  } from '../indexes/interfaces'

export const createTemplate = ( templateName:string, targetDir:string ):TemplateFiles => {
  const templateFiles:TemplateFiles = {
    templateName ,
    targetDir ,
    files: getTemplateFiles(templateName)
  }
  return readTemplate(templateFiles)
}

export const readTemplate = ( templateFiles:TemplateFiles ):TemplateFiles => {
  templateFiles.files.forEach( file => {
    readTemplateFile(templateFiles,file)
  })
  return templateFiles
}

export const renderTemplate = ( templateFiles:TemplateFiles, data:IndexTemplateData|ComponentTemplateData ):TemplateFiles => {
  templateFiles.files.forEach( file => {
    file.rendered = ejs.render(file.source,data)
  })
  return templateFiles
}

export const writeTemplate = ( templateFiles:TemplateFiles ):TemplateFiles => {
  templateFiles.files.forEach( file => {
    const target = path.join(env.resolve(templateFiles.targetDir),file.filename)
    console.log('write template to "%s"', target)
  })
  return templateFiles
}

export const renderIndex = ( index:IndexTemplateData ) => {
  return null
  /*const result:TemplateFile[] = read.getFiles('index')
  result.files.forEach( file => {
    read.readTemplateFile(result,file) 
    file.rendered = ejs.render(file.source,index)
  })

  return result.files.map ( file => file.rendered )*/
}


export const renderPublicationComponent = ( data:ComponentTemplateData ) => {
  return null
  /*const result:TemplateFiles = read.getFiles(data.contentType)
  result.files.forEach ( file => {
    read.readTemplateFile(result,file)
    file.rendered = ejs.render(file.source,data)
  } )
  return result.files.map ( file => file.rendered )*/
}