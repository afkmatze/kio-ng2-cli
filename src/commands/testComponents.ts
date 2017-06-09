import { Observable } from 'rxjs'
import * as yargs from 'yargs'
import project from '../project'
import * as env from '../env'
import * as logger from '../console'
import { ComponentTests } from '../project/testing/component'
import { TestRunner } from '../project/testing/Runner.class'
import { EnvFile } from '../env/file.class'


export const testComponentsCommand = ():yargs.CommandModule => ({
  command: 'testComponents',
  aliases: ['test'],
  describe: 'Tests criteria matching for components',
  handler: (args:any|env.CommandConfigTestComponents) => {
    const [ command ] = args._    
      
    logger.log('Running component tests')

    const envFile = EnvFile.FromProjectPath (env.moduleRoot())
    //const componentTest = new ComponentTests(env.moduleRoot())
    setTimeout(()=>{
      console.log('timeout')
    },5000)
    const testRunner = new TestRunner(envFile.components)
    testRunner.fixtures.subscribe ( fixture => {
      const componentTest = testRunner.mapFixtureToTest(fixture)
      logger.log('Test component: ' + componentTest.component.name )
      testRunner.assertComponent(componentTest.component)
    }, error => {
      console.error (error)
      process.exit(1)
    }, () => {
      process.exit()
    } )
      
  }
})
