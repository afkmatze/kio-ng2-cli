import * as env from '../env'
import { find } from 'shelljs'
import { Template, TemplateFile, TemplateName, TemplateSource } from './interfaces'

export const findTemplateSourceFiles = ( templateName:TemplateName ):TemplateFile[] => {
  const templateRoot = env.path.join(env.TEMPLATES,templateName)
  return find(templateRoot)
          .filter(item=>!!env.path.extname(item))
          .map(item=>{
            return{
              filename: env.path.relative(templateRoot,item),
              absoluteFilepath: item
            }
          })
}
