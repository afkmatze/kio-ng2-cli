import { TemplateName } from '../interfaces'
import * as path from 'path'
import * as shelljs from 'shelljs'
import * as env from '../../env'

export const readTemplateFiles = ( templateName:TemplateName ) => {
  const root = path.join(env.TEMPLATES,templateName)
  return shelljs.find(root+'/*.*')
}