import { Observable } from 'rxjs'
import * as yargs from 'yargs'
import project from '../project'
import * as env from '../env'
import * as logger from '../console'
import { ComponentTests } from '../project/testing/component'


export const testComponentsCommand = ():yargs.CommandModule => ({
  command: 'testComponents',
  aliases: ['test'],
  describe: 'Tests criteria matching for components',
  handler: (args:any|env.CommandConfigTestComponents) => {
    const [ command ] = args._    
      
    logger.log('Running component tests')

    const componentTest = new ComponentTests(env.moduleRoot())
    componentTest.components.subscribe ( component => {
      logger.log('Test component: ' + component.name )
      componentTest.assertComponent(component)
    } )
      
  }
})
