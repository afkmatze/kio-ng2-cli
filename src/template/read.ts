import { find, cat } from 'shelljs'
import { TEMPLATES } from '../env/constants'
import * as path from 'path'

const resolveTemplate = ( ...args:string[] ) => path.join(TEMPLATES,...args)

export const getFiles = ( templateName:string ) => find(resolveTemplate(templateName)).filter(item=>!!path.extname(item))

export const readFile = ( templateName:string, templateFile:string ) => {
  if ( !path.isAbsolute (templateFile) )
    templateFile = resolveTemplate(templateName,templateFile)
  return cat(templateFile)
}