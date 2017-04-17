import { TemplateData } from '../templates'
import { PublicationComponent } from './classes'
import * as path from 'path'
import * as env from '../env/constants'
import * as stringUtils from '../utils/string'

export const dataForTemplate = ( publicationComponent:PublicationComponent ):TemplateData => {
  const moduleName = stringUtils.classify(publicationComponent.name)
  const componentName = stringUtils.classify(publicationComponent.name+'-component')
  const parentModuleName = ['kio','abstract',publicationComponent.contentType].join('-')
  const parentComponentName = parentModuleName+'.component'
  const parentComponentFilepath = publicationComponent.relativeTo(path.join(env.KIO_PATHS.components.structure,parentModuleName,parentComponentName
    ))

  const data:TemplateData = {
    contentType: publicationComponent.contentType,
    modifiers: publicationComponent.modifiers,
    childTypes: publicationComponent.childTypes,
    styles: publicationComponent.relativeTo(path.join(env.KIO_PROJECT_ROOT,'src/scss')),
    classifiedParentComponentName: stringUtils.classify(parentModuleName),
    selector: stringUtils.dasherize(['publication',publicationComponent.name].join('-')),
    pathToStructureComponents: publicationComponent.relativeTo(env.KIO_PATHS.components.structure),
    dasherizedParentComponentPath: parentComponentFilepath,
    classifiedModuleName: stringUtils.classify(moduleName),
    dasherizedModuleName: stringUtils.dasherize(moduleName)
  }
  return data
}