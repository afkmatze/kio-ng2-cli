import * as env from '../env/constants'
import * as cmd_indexes from './indexes'
import * as cmd_component from './component'
import * as path from 'path'
import { log, logError, banner } from '../console'
import * as yargs from 'yargs'

export const BUILD_INDEXES:string = "indexes"
export const CREATE_COMPONENT:string = "component"

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

  const argv = yargs
    .usage('Usage: $0 <command>')
    .command(cmd_component.yargs)
    .command(cmd_indexes.yargs)
    .demand(1)
    .help()
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