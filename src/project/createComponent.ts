import { Observable } from 'rxjs'
import { 
  Project, ProjectEnv,
  CLICommandArgs, CLICommandArgsBuildIndexes, CLICommandArgsTestComponents, CLICommandArgsCreateComponent,
  IndexType, IndexTypes
} from './interfaces'
import { ListQuery } from 'kio-ng2-component-routing'
import { KioNodeType, KioPrimitiveContentType, NamedComponentStructure, NamedFragmentComponentStructure } from 'kio-ng2'
import * as templates from './templates'
import { PublicationComponentTemplateData } from './templates/publicationComponent'
import * as env from '../env'
import * as path from 'path'
import * as files from './files'
import { buildIndexes } from './buildIndexes'

export const createComponentWithCLIArgs = (projectPath:string) => ( args:CLICommandArgsCreateComponent ) => {
  const {
    name ,
    contentType,
    childTypes,
    modifiers
  } = args

  const templateData = templates.publicationComponent.mapCLIArgsToTemplateData(args)
  return createComponent ( projectPath ) ( templateData )
}

export const createComponent = (projectPath:string) => ( data:PublicationComponentTemplateData ) => {
  return templates.publicationComponent.render(data)
        .flatMap ( (template,idx) => {
          const targetFile = path.join(env.resolveKioPath('publication'),template.filepath)
          return templates.replaceFile(targetFile,template.content)
        } )
        .toArray()
        .flatMap ( list => {
          return list.indexOf(true) > -1 ? buildIndexes(projectPath)({}).toPromise() : Observable.empty()
        } )
}
