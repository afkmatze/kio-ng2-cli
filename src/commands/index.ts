import { Observable, Scheduler } from 'rxjs'
import * as env from '../env/constants'
import * as cmd_indexes from './indexes'
import * as cmd_component from './component'
import * as path from 'path'
import { log, logError, banner } from '../console'
import * as logger from '../console'
import { selectSource } from './indexes/exec'
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

  const all_filter = ['publication','navigation','structure']

  const argv = yargs
    .usage('Usage: $0 <command> [options]')
    .options('config-file',{
      type: 'string',
      description: 'cli config file',
      default: path.resolve('kio-ng2.config.json')      
    })
    .command(cmd_component.yargs)
    .command(cmd_indexes.yargs)
    .command("ls","List components",(argv)=>{
      return argv.options({
        filter: {
          alias: 'f',
          type: 'array',
          choices: all_filter,
          default: all_filter
        }
      })
    },(args)=>{
      
      args.filter = args.filter || all_filter
      const filter = args.filter.length > 0 ? args.filter : all_filter
      const indexSourceStream = selectSource(!args.noCache)

      const obs = Observable.concat(filter).flatMap((filterValue:string) => {
        return indexSourceStream.filter(component => component.typeName.toLowerCase().indexOf(filterValue) > -1).toArray ().map ( components => {
          logger.log('%s %s components', components.length, filterValue )
          components.forEach((component,idx) => logger.log('[component:%s/%s]: %s',idx+1,components.length,component))
          return {
            filter,
            components
          }
        } )
      })
      return obs.toPromise()
    })
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