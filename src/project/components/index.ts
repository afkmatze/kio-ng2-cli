import { 
  NamedComponent, NamedComponentStructure, NamedFragmentComponentStructure   
} from 'kio-ng2-component-routing'
import {  KioNodeType, KioPrimitiveContentType, nodeType } from 'kio-ng2'
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

export const dataForNamedFragmentComponent = ( namedComponent:NamedFragmentComponentStructure ):PublicationComponentTemplateData => {
  const contentType = KioNodeType[KioNodeType.fragment]
  return {
    name: namedComponent.name,
    styles: '../../',
    contentType,
    type: KioNodeType.fragment,
    selector: 'kio-'+dasherize(namedComponent.name),
    modifiers: namedComponent.modifiers,
    childTypes: namedComponent.childTypes,
    classifiedModuleName: classify(namedComponent.name),
    dasherizedModuleName: dasherize(namedComponent.name),
    classifiedParentComponentName: classify(contentType+'-component')
  }
}

export const dataForNamedComponent = <T extends KioPrimitiveContentType> ( namedComponent:NamedComponentStructure<T> ):PublicationComponentTemplateData => {
  const contentType = KioNodeType[<number>namedComponent.type]
  return {
    name: namedComponent.name,
    type: namedComponent.type,
    contentType,
    styles: '../../',
    selector: 'kio-'+dasherize(namedComponent.name),
    modifiers: namedComponent.modifiers,
    childTypes: [],
    classifiedModuleName: classify(namedComponent.name),
    dasherizedModuleName: dasherize(namedComponent.name),
    classifiedParentComponentName: classify(contentType+'-content-component')
  }
}

export const namedComponentExists = ( namedComponent:NamedComponent ) => {
  const publicationPath = env.resolveKioPath('publication')
  return existsSync ( path.join(publicationPath,pathForNamedComponent(namedComponent.type,namedComponent.name)) )
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
  
  return Observable.merge(
      exists(targetFolder).switchMap( exists => exists ? Observable.empty() : mkdir(targetFolder) ),
      templates.publicationComponent.render(componentData).flatMap ( info => {
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
    ).takeLast(1)
}