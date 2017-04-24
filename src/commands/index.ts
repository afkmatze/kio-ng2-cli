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


export const createComponentCommand:yargs.CommandModule = {
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
    
    const sub = project.createComponent({
      ...args,
      name: componentName
    }).subscribe(value=> {}, error=>{
      console.error(error)
    },()=>{
      if ( sub )
      {
        sub.unsubscribe()
      }
    })
      
  }
}

export const buildIndexesCommand:yargs.CommandModule = {
  command: 'buildIndexes',
  aliases: ['index'],
  describe: 'Updates index files in ' + env.KIO_PATHS.root,
  builder: ( argv ) => {
    return argv
      .usage('Usage: $0 index [publication|structure|fixture|criteria]')
      .option('filter',{
        alias: 'f',
        choices: ['publication','navigation','structure','fixture','criteria'],
        default: ['publication','navigation','structure','fixture','criteria'],
        demand: true
      })
  },  
  handler: (args:any) => {
    const [ command ] = args._
    return project.buildIndexes(args).toPromise()
      .catch(error => {
        console.error(error)
      })
  }
}

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
    .command(createComponentCommand)
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