import { Observable } from 'rxjs'
import * as rxfs from 'rxfs'
import * as env from '../../../env'
import * as stringUtils from '../../../utils/string'
import * as path from 'path'
import * as ejs from 'ejs'

import { PublicationComponentTemplateData } from './interfaces'
import { CLICommandArgsCreateComponent } from '../../interfaces'

const TEMPLATE_DIR = path.resolve(__dirname,'../../../../templates')

import { KioNodeType, nodeType, KioPrimitiveContentType } from 'kio-ng2'
import { ListQuery,  NamedComponentStructure, NamedFragmentComponentStructure } from 'kio-ng2-component-routing'


const replaceFilepath = <T extends KioPrimitiveContentType, P extends NamedComponentStructure<T>|NamedFragmentComponentStructure>( filepath:string, data:PublicationComponentTemplateData<T,P> ) => {
  filepath = filepath.replace('__path__',stringUtils.dasherize(data.name))
  return filepath.replace('__name__',stringUtils.dasherize(data.name))
}

export const mapCLIArgsToTemplateData = <T extends KioPrimitiveContentType, P extends NamedComponentStructure<T>|NamedFragmentComponentStructure>(  args:CLICommandArgsCreateComponent ):PublicationComponentTemplateData<T,P> => {
  const parentName = 'kio-abstract-' + args.contentType
  return undefined
}

export const render = <T extends KioPrimitiveContentType, P extends NamedComponentStructure<T>|NamedFragmentComponentStructure>(  data:PublicationComponentTemplateData<T,P> ) => {

  return rxfs.find(['-type','file'],path.join(TEMPLATE_DIR,KioNodeType[<number>data.contentType]))
            .map ( streamData => streamData.stdout.toString('utf8') )
            //.filter ( filepath => !/\.\w+$/.test(filepath) )
            .flatMap ( 
              filename => rxfs.readFile<string>(filename).toArray().map ( rows => rows.join('\n') )
                          .map(content => ({
                                content: ejs.render(content.toString(),data),
                                filepath: path.relative ( TEMPLATE_DIR, filename )
                              }) 
                          ) 
            )
            .map ( ({filepath,content}) => {

              filepath = replaceFilepath(filepath,data)

              //console.log('render "%s"', filepath , '\n---------\n', content, '\n--------\n')

              return ({
                filepath,
                content
              })


            } )
}