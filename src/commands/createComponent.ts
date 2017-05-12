import * as yargs from 'yargs'
import * as project from '../project'
import * as env from '../env'


export const createComponentCommand = ():yargs.CommandModule => ({
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
)