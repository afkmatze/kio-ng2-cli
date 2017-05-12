import * as yargs from 'yargs'
import * as project from '../project'
import * as env from '../env'

export const createProjectCommand = ():yargs.CommandModule => ({
  command: 'createProject',
  aliases: ['new'],
  describe: 'Creates a new kio digitorial project with angular 2',
  builder: ( argv ) => {
    return argv
      .usage('Usage: $0 <command> <ProjectName>')
      .demand(1)      
  },  
  handler: (args:any|env.CommandConfigCreateComponent) => {
    const [ command, projectName ] = args._ 
    const sub = project.createProject({
      name: projectName
    }).subscribe(value=> {}, error=>{
      console.error(error)
    },()=>{
      if ( sub )
      {
        sub.unsubscribe()
      }
    })
      
  }
})
