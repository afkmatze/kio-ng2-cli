import * as yargs from 'yargs'
import * as project from '../project'
import * as env from '../env'
import * as logger from '../console'


export const testComponentsCommand:yargs.CommandModule = {
  command: 'testComponents',
  aliases: ['test'],
  describe: 'Tests criteria matching for components',
  handler: (args:any|env.CommandConfigTestComponents) => {
    const [ command ] = args._    
      
    logger.log('Running component tests')


    let t = setInterval(()=>{
      console.log('check interval')
    },1000)
    return project.testComponents(args)
      .toPromise()
      .then ( result => {
        console.log('tests finished', result)
        clearInterval(t)
      } )
      
  }
}
