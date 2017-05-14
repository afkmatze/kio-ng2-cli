import { 
  NamedComponent, NamedComponentStructure, NamedFragmentComponentStructure   
} from 'kio-ng2-component-routing'
import {  KioNodeType } from 'kio-ng2'
import { dasherize, classify } from '../../utils/string'

import * as env from '../../env'
import * as path from 'path'
import { existsSync } from 'rxfs'
import * as templates from '../templates'


export const isNamedFragmentComponentStructure = ( other:any ):other is NamedFragmentComponentStructure => {
  return (
      'modifiers' in other
      &&
      'childTypes' in other
    )
}

export const writeNamedComponent = <T extends KioNodeType>( namedComponent:NamedComponent ) => {

  const typeName = KioNodeType[namedComponent.type]

  const targetParentDir = path.join(env.resolveKioPath('publication'),typeName)
  const targetName = dasherize(namedComponent.name)
  const targetDir = path.join(targetParentDir,targetName)
  if ( existsSync(targetDir) )
  {
    throw Error ( `target "${targetDir}" already exists.` )
  }

  throw "TODO: Typings for rendering";
  
  const parentComponent = classify(typeName)+(typeName==='fragment'?'':'Content')+'Component'

  templates.publicationComponent.render({
    name: namedComponent.name,
    childTypes: (isNamedFragmentComponentStructure(namedComponent) ? namedComponent.childTypes : []),
    modifiers: namedComponent.modifiers,
    contentType: <T>namedComponent.type,
    selector: 'kio-' + targetName,
    classifiedModuleName: classify(namedComponent.name),
    dasherizedModuleName: targetName,
    classifiedParentComponentName: classify(parentComponent),
    dasherizedParentComponentPath: dasherize(parentComponent)
  })

}