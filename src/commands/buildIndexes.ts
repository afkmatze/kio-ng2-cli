import * as yargs from 'yargs'
import * as project from '../project'
import * as env from '../env'


export const buildIndexesCommand = ():yargs.CommandModule => ({
  command: 'buildIndexes',
  aliases: ['index'],
  describe: 'Updates index files in ' + env.resolveKioPath(),
  builder: ( argv ) => {
    return argv
      .usage('Usage: $0 index [publication|structure|fixture|criteria]')
      .option('filter',{
        alias: 'f',
        choices: ['publication',/*'navigation','structure',*/'fixture','criteria'],
        default: ['publication',/*'navigation','structure',*/'fixture','criteria'],
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
})