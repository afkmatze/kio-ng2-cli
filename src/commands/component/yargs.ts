import { KioContentType } from 'kio-ng2'
import { CommandModule } from 'yargs'
import { KioComponentType, KioComponent, KioStructureComponent, KioPublicationComponent, PublicationComponent, createWithData } from '../../components'
import { logError, log } from '../../console'
import * as path from 'path'
import * as env from '../../env/constants'
import * as stringUtils from '../../utils/string'

import { renderType } from './render'
import * as api from '../../api'


export const yargs:CommandModule = {
  command: 'createComponent',
  aliases: ['create'],
  describe: 'Creates a new publication component',
  builder: ( argv ) => {
    return argv
      .usage('Usage: $0 <command> <ComponentName>')
      .demand(1)
      .option('contentType',{
        alias: 't',
        choices: ['txt','src','fragment'],
        demand: true
      })
      .option('modifiers',{
        alias: 'm',
        type: 'array',
        describe: 'list of modifiers'
      })
      .option('childTypes',{
        alias: 'c',
        describe: 'child type content types',
        type: 'array'
      })
  },  
  handler: (args:any) => {
    const [ command, componentName ] = args._
    const options:KioPublicationComponent = {
      componentType: KioComponentType.PublicationComponent,
      contentType: args.contentType,
      name: componentName,
      modifiers: args.modifiers || [],
      childTypes: args.childTypes || [],
      dir: path.join(env.KIO_PATHS.components.publication,args.contentType,stringUtils.dasherize(componentName||''))      
    }
/*
    renderType(options)*/

    const component = createWithData(options)
    api.renderPublicationComponent(<PublicationComponent>component)
  }
}