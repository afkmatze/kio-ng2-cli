import { 
  ComponentType, PublicationComponent, IndexTypes, IndexType, CLICommandArgsCreateComponent 
} from '../../interfaces'
import { ListQuery,  NamedComponentStructure, NamedFragmentComponentStructure } from 'kio-ng2-component-routing'
import { KioNodeType, KioPrimitiveContentType } from 'kio-ng2'


export interface PublicationComponentTemplateData <T extends KioPrimitiveContentType, P extends NamedComponentStructure<T>|NamedFragmentComponentStructure> {
  name:string
  contentType:T
  selector:string
  modifiers:ListQuery<string>
  childTypes:ListQuery<P>
  classifiedModuleName:string
  dasherizedModuleName:string
  classifiedParentComponentName:string
  dasherizedParentComponentPath:string
  pathToStructureComponents?:string

}
