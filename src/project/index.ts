import { Observable } from 'rxjs'
export * from './create'
export * from './interfaces'
export * from './templates'
export * from './components'
export * from './config'

import files from './files'
import * as templates from './templates'
import { PublicationComponentTemplateData } from './templates/publicationComponent'

import { ExecData } from 'rxfs'
import { 
  CLICommandArgsTestComponents, CLICommandArgs, CLICommandArgsBuildIndexes, CLICommandArgsCreateComponent,
  IndexType, IndexTypes  
} from './interfaces'
import { buildIndexes } from './buildIndexes'
import { createComponent } from './createComponent'
import { testComponents } from './testComponents'
import { api } from 'kio-ng2-env'

export { templates }

export default ( projectPath:string=api.modules.resolve.rootPath() ) => { 
  return {
    createComponent: createComponent(projectPath),
    testComponents: testComponents(projectPath),
    buildIndexes: buildIndexes(projectPath),
    files: files(projectPath)
  }
}
