import { Observable, Scheduler } from 'rxjs'
import * as env from '../env'
import * as rxfs from '../utils/rx/fs'
import { find } from 'shelljs'
import { Template, TemplateFile, TemplateName, TemplateType, TemplateSource, IndexFileNameMapper } from './interfaces'

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


export const templateFiles = ( templateName:TemplateName|TemplateType, mapper?:IndexFileNameMapper ):Observable<TemplateFile> => {
  const templateRoot = env.path.resolve(env.TEMPLATES,templateName)
  return rxfs.findFiles(templateRoot,/.+\.*$/)
  .filter ( filename => !!env.path.extname(filename) )
  .flatMap ( filename => rxfs.readFile(filename,'utf8').map( source => ({
      source,
      filename: env.path.relative(templateRoot,filename),
      absoluteFilepath: filename
    })) 
  )
  .map ( file => {
    return mapper ? mapper(file) : file
  } )
}