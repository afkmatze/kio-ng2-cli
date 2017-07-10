import {  
  KioNodeType, KioPrimitiveContentType, 
  NamedComponent, NamedComponentStructure, NamedFragmentComponentStructure ,
  isChildContentType,
  KioChildContentType
} from 'kio-ng2-data'
import { Observable } from 'rxjs'
import * as env from '../../env'
import * as path from 'path'
import { existsSync, writeFile, mkdir, exists } from 'rxfs'
import * as templates from '../templates'
import { dasherize, classify, capitalize, camelize } from '../../utils/string'
import { PublicationComponentTemplateData } from '../templates/publicationComponent'


export const isNamedFragmentComponentStructure = ( other:any ):other is NamedFragmentComponentStructure => {
  return (
      'modifiers' in other
      &&
      'childTypes' in other
    )
}

export const pathForNamedComponent = ( type:string|KioNodeType, name:string ) => {
  if ( 'string' === typeof type )
    return pathForNamedComponent(KioNodeType[type],name)
  return path.join(KioNodeType[type],dasherize(name))
}

export const dataForNamedFragmentComponent = ( pathToStructureComponents:string, namedComponent:NamedFragmentComponentStructure ):PublicationComponentTemplateData => {
  const contentType = KioNodeType[KioNodeType.fragment]
  return {
    name: namedComponent.name,
    styles: '../../../',
    contentType,
    type: KioNodeType.fragment,
    selector: 'kio-'+dasherize(namedComponent.name),
    modifiers: namedComponent.modifiers,
    childTypes: namedComponent.childTypes,
    classifiedModuleName: classify(namedComponent.name),
    dasherizedModuleName: dasherize(namedComponent.name),
    classifiedParentComponentName: classify(contentType+'-component'),
    pathToStructureComponents
  }
}

export const dataForNamedComponent = <T extends KioPrimitiveContentType> ( pathToStructureComponents:string, namedComponent:NamedComponentStructure ):PublicationComponentTemplateData => {
  const nodeType:KioNodeType = KioNodeType[namedComponent.type]
  if ( ! isChildContentType(nodeType) )
    return undefined
  
  const contentType:KioChildContentType = nodeType
  const contentTypeName:string = KioNodeType[contentType]
  return {
    name: namedComponent.name,
    type: contentType,
    contentType: contentTypeName,
    styles: '../../../',
    selector: 'kio-'+dasherize(namedComponent.name),
    modifiers: namedComponent.modifiers,
    childTypes: [],
    classifiedModuleName: classify(namedComponent.name),
    dasherizedModuleName: dasherize(namedComponent.name),
    classifiedParentComponentName: classify(contentType+'-content-component'),
    pathToStructureComponents
  }
}

export const resolveComponentPath = ( namedComponent:NamedComponent, targetRoot:string=env.moduleRoot() ) => {
  const kioPath = env.resolveKioPath('publication')
  const componentPath = pathForNamedComponent(namedComponent.type,namedComponent.name)
  return path.join(targetRoot, kioPath, componentPath)
}

export const namedComponentExists = ( namedComponent:NamedComponent ) => {
  const publicationPath = resolveComponentPath(namedComponent)
  return existsSync ( publicationPath )
}

export const writeComponent = ( componentData:PublicationComponentTemplateData, targetRoot:string ) => {
  const kioPath = env.resolveKioPath('publication')
  //console.log('kioPath',kioPath)
  //console.log('targetRoot',targetRoot)
  const componentPath = pathForNamedComponent(componentData.type,componentData.name)
  //console.log('componentPath',componentPath)
  const targetFolder = path.join(targetRoot, kioPath, componentPath)
  //console.log('targetFolder',targetFolder)
  const targetName = dasherize(componentData.name)
  
  return exists(targetFolder).switchMap( exists => 
        exists 
        ? Observable.empty() 
        : mkdir(targetFolder).flatMap( () => {
          return templates.publicationComponent.render(componentData).flatMap ( info => {
            const {
              content
            } = info
            const filepath = path.join(targetRoot, kioPath, info.filepath)
            console.log('write file', filepath)
            return writeFile(filepath,Observable.of(new Buffer(content)),'utf8')
          } ).toArray().map ( () => targetFolder )
          .catch ( error => {
            console.error(error)
            return Observable.throw(error)
          } )
        } )
    )
}