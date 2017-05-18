import * as yargs from 'yargs'
import project from '../project'
import * as env from '../env'
import { parseList } from './parseArgs'


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
        coerce: parseList,
        demand: true
      })
  },  
  handler: (args:any) => {
    const [ command ] = args._
    console.log('filter',args.filter)
    return project().buildIndexes(args).toPromise()
      .catch(error => {
        console.error(error)
      })
  }
})