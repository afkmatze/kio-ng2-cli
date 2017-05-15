import * as yargs from 'yargs'
import project from '../project'
import * as env from '../env'


export const createComponentCommand = ():yargs.CommandModule => ({
  command: 'createComponent',
  aliases: ['create'],
  describe: 'Creates a new publication component',
  builder: ( argv ) => {
    return argv
      .usage('Usage: $0 create <ComponentName>')
      .option('contentType',{
        alias: 't',
        required: false,
        default: '',
        choices: ['txt','src','fragment']
      })
      .option('modifiers',{
        alias: 'm',
        required: false,
        type: 'array',
        default: [],
        describe: 'list of modifiers'
      })
      .option('childTypes',{
        alias: 'c',
        required: false,
        default: [],
        describe: 'child type content types',
        type: 'array'
      })
  },  
  handler: (args:any|env.CommandConfigCreateComponent) => {
    const [ command, componentName ] = args._
    
    const sub = project().createComponent({
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
)