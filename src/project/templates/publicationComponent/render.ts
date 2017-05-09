import { Observable } from 'rxjs'
import * as rxfs from 'rxfs'
import * as env from '../../../env'
import * as stringUtils from '../../../utils/string'
import * as path from 'path'
import * as ejs from 'ejs'

import { PublicationComponentTemplateData } from './interfaces'
import { CLICommandArgsCreateComponent } from '../../interfaces'

const TEMPLATE_DIR = path.resolve(__dirname,'../../../../templates')

const replaceFilepath = ( filepath:string, data:PublicationComponentTemplateData ) => {
  filepath = filepath.replace('__path__',stringUtils.dasherize(data.name))
  return filepath.replace('__name__',stringUtils.dasherize(data.name))
}

export const mapCLIArgsToTemplateData = ( args:CLICommandArgsCreateComponent ):PublicationComponentTemplateData => {
  const parentName = 'kio-abstract-' + args.contentType
  const componentRoot = path.resolve(env.KIO_PROJECT_ROOT,env.KIO_PATHS.components.publication,args.contentType)
  return {
    ...args,
    styles: path.relative(path.join(componentRoot,args.name),path.join(env.KIO_PROJECT_ROOT,'src','scss')),
    selector: 'publication-' + stringUtils.dasherize(args.name),
    classifiedModuleName: stringUtils.classify(args.name),
    dasherizedModuleName: stringUtils.dasherize(args.name),
    classifiedParentComponentName: stringUtils.classify(parentName) + 'Component',
    dasherizedParentComponentPath: stringUtils.dasherize(parentName),
    pathToStructureComponents: '../../../components/' 
  }
}

export const render = ( data:PublicationComponentTemplateData ) => {

  return rxfs.find(['-type','file'],path.join(TEMPLATE_DIR,data.contentType))
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