import { Observable } from 'rxjs'
import * as rxfs from 'rxfs'
import * as env from '../../../env'
import * as stringUtils from '../../../utils/string'
import * as path from 'path'
import * as ejs from 'ejs'
import * as logger from '../../../console'

import { PublicationComponentTemplateData } from './interfaces'
import { CLICommandArgsCreateComponent } from '../../interfaces'

const TEMPLATE_DIR = path.resolve(__dirname,'../../../../templates')

import { NamedComponentStructure, NamedFragmentComponentStructure, KioNodeType, KioPrimitiveContentType } from 'kio-ng2-data'


const replaceFilepath = ( filepath:string, data:PublicationComponentTemplateData ) => {
  filepath = filepath.replace('__path__',stringUtils.dasherize(data.name))
  return filepath.replace('__name__',stringUtils.dasherize(data.name))
}

export const mapCLIArgsToTemplateData = (  args:CLICommandArgsCreateComponent ):PublicationComponentTemplateData => {
  const parentName = 'kio-abstract-' + args.contentType
  return undefined
}

export const render = (  data:PublicationComponentTemplateData ) => {

  const templateDir = path.join(TEMPLATE_DIR,KioNodeType[data.type])

  const templateData = {
    ...data ,
    contentType: KioNodeType[data.type],
    modifiers: JSON.stringify(data.modifiers,null,'  '),
    childTypes: JSON.stringify(data.childTypes,null,'  ')
  }

  logger.log('template data', templateData)

  return rxfs.find(['-type','file'],templateDir).map ( data => `${data}` )
            .map ( (filepath:string) => path.join(templateDir, filepath) )
            //.filter ( filepath => !/\.\w+$/.test(filepath) )
            .flatMap ( 
              filename => {
                return rxfs.readFile(filename,'utf8').toArray().map ( rows => rows.join('\n') )
                          .map(content => ({
                                content: ejs.render(content.toString(),templateData),
                                filepath: path.relative ( TEMPLATE_DIR, filename )
                              }) 
                          )
              } 
            )
            .map ( ({filepath,content}) => {

              filepath = replaceFilepath(filepath,data)

              //logger.log('render "%s"', filepath , '\n---------\n', content, '\n--------\n')

              return ({
                filepath,
                content
              })


            } )
}