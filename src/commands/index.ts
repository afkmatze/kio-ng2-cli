import { Observable, Scheduler } from 'rxjs'
import * as env from '../env'
import * as path from 'path'
import { log, logError, banner } from '../console'
import * as logger from '../console'
import * as yargs from 'yargs'

import * as project from '../project'

export const BUILD_INDEXES:string = "indexes"
export const CREATE_COMPONENT:string = "component"


/** CREATE COMPONENT */

import { createComponentCommand } from './createComponent'
import { buildIndexesCommand } from './buildIndexes'
import { testComponentsCommand } from './testComponents'


export const exec = ( command:"indexes"|string ) => {

  banner()

  if ( !env.KIO_PROJECT_ROOT || path.basename(env.KIO_PROJECT_ROOT) === 'kio-ng2-cli' )
  {
    logError(Error("kio-ng2-cli must be run as an installed module."))
  }
  
  if ( !env.KIO_PROJECT_PACKAGE || !env.KIO_PROJECT_PACKAGE.kio ) {
    logError(Error("package.json is missing config at prop 'kio'"))
  }
/*
  if(!command) {
    logError(Error("Command required."))
  }*/

  const all_filter = ['publication','navigation','structure']

  const argv = yargs
    .usage('Usage: $0 <command> [options]')
    .options('config-file',{
      type: 'string',
      description: 'cli config file',
      default: path.resolve('kio-ng2.config.json'),
      coerce: function ( key ):env.config.ConfigFile {
        const filepath = path.join(process.cwd(),key||'')
        const data = key && env.config.read(filepath)
        return data
      }
    })
    .command(createComponentCommand)
    .command(testComponentsCommand)
    .command(buildIndexesCommand)
    .demand(1)
    .help('h')
    .argv

  //console.log('argv', argv)
  /*switch (command) {
    case BUILD_INDEXES:
      return cmd_indexes.main ( env )
      break;

    case CREATE_COMPONENT:
      return cmd_component.main ( env )
      break;
    
    default:
      throw Error("Unknown command \"" + command + "\"")
      break;
  }*/
}