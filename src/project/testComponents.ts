import { Observable, Scheduler } from 'rxjs'
import * as path from 'path'
import { ExecData } from 'rxfs'
import { 
  Project, ProjectEnv,
  CLICommandArgs, CLICommandArgsBuildIndexes, CLICommandArgsTestComponents, CLICommandArgsCreateComponent,
  IndexType, IndexTypes
} from './interfaces'
import testRunner, { ComponentTest, renderTests, execTestAt } from './testing'


export const testComponents = ( args:CLICommandArgsTestComponents ) => {
  const targetFilepath = path.join(path.resolve('./'),'ComponentTests.spec.ts')
  console.log('writing spec file at "%s"', targetFilepath )
  return renderTests(targetFilepath)
          .map( (row,idx) => {
            console.log('item %s\n----\n', idx, row, '\n----\n')
            return row
          } ).flatMap(
            row => execTestAt(targetFilepath)
          )

  /*return Observable.zip(
      files.filesForIndexType(IndexTypes.fixture),
      files.filesForIndexType(IndexTypes.criteria)
    ).toArray()
  */
  
}
