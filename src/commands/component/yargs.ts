import { KioContentType } from 'kio-ng2'
import { CommandModule } from 'yargs'
import { KioComponentType, KioComponent, KioStructureComponent, KioPublicationComponent, PublicationComponent, createWithData } from '../../components'
import { logError, log } from '../../console'
import * as chalk from 'chalk'
import * as path from 'path'
import * as env from '../../env'
import * as stringUtils from '../../utils/string'

import cmdCreateComponent from './exec'
import cmdBuildIndexes from '../indexes/exec'

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
  handler: (args:any|env.CommandConfigCreateComponent) => {
    const [ command, componentName ] = args._    
    env.config.update({...args, command, componentName})

    cmdCreateComponent(<any>env.config.data).toPromise()
      .then ( (result:PublicationComponent) => {
        log('created %s at %s', chalk.blue.bold(`${result}`), path.relative(env.KIO_PATHS.root,result.dir) )
        return cmdBuildIndexes().toPromise().then ( files => {
          log('wrote %s index files', files.length)
        } )
      } )
      .catch ( console.error)
  }
}