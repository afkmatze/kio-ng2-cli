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
import { createProjectCommand } from './createProject'


export const exec = ( command:string ) => {

  banner()

/*
  if(!command) {
    logError(Error("Command required."))
  }*/

  const all_filter = ['publication','navigation','structure']

  const addCommands = ( yargv:yargs.Argv ) => {
    const isEnv = env.isProjectEnv()
    console.log('is env:', isEnv )
    if ( isEnv )
    {
      return yargv
        .command(createComponentCommand())
        .command(testComponentsCommand())
        .command(buildIndexesCommand())
    }
    else 
    {
      return yargv
        .command(createProjectCommand())
    }
  }

  const argv = yargs
    .usage('Usage: $0 <command> [options]')    

  addCommands(argv)
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