import { 
  PublicationComponentTemplateData, PublicationComponentTemplateDataItem, TemplateDataMapper, TemplateData , TemplateFile 
} from '../../types/interfaces'
import { readTemplateFiles } from '../../types/common'
import { PublicationComponent } from '../../../components/classes'
import * as stringUtils from '../../../utils/string'
import * as env from '../../../env'
import * as path from 'path'

export type DataKey = "contentType"|"styles"|"modifiers"|"childTypes"|"dasherizedModuleName"|"classifiedModuleName"|"classifiedParentComponentName"|"pathToStructureComponents"|"dasherizedParentComponentPath"|"selector"|"dasherizedModuleName"

export const DataKeys:DataKey[] = [
  "contentType",
  "styles",
  "modifiers",
  "childTypes",
  "dasherizedModuleName",
  "classifiedModuleName",
  "classifiedParentComponentName",
  "pathToStructureComponents",
  "dasherizedParentComponentPath",
  "selector",
  "dasherizedModuleName"
]

export const mapDataKey = ( key:DataKey, component:PublicationComponent ):any => {
  switch (key) {
    case "contentType":
      return component.contentType

    case "styles":
      return component.relativeFrom(path.join(env.KIO_PROJECT_ROOT,'src','scss'))

    case "modifiers":
        return component.modifiers

    case "childTypes":
        return component.childTypes

    case "dasherizedModuleName":
        return stringUtils.dasherize(component.name)

    case "classifiedModuleName":
        return stringUtils.classify(component.name)

    case "classifiedParentComponentName":
        return stringUtils.classify(['kio','abstract',component.contentType].join('-'))

    case "pathToStructureComponents":
        return component.relativeTo(env.KIO_PATHS.components.structure)

    case "dasherizedParentComponentPath":
        return stringUtils.dasherize(['kio','abstract',component.contentType].join('-'))

    case "selector":
        return 'publication-'+stringUtils.dasherize(component.name)

    case "dasherizedModuleName":
        return stringUtils.dasherize(component.name)

    default:
      return undefined
  }
}

export const mapComponentData = ( componentData:PublicationComponent ):PublicationComponentTemplateData => {
  const data:any = {}
  DataKeys.forEach((dataKey:DataKey)=>{
    data[dataKey] = mapDataKey(dataKey,componentData)
  })
  return data
}