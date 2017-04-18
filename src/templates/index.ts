export * from './resolveTarget'
export * from './interfaces'
import { find } from 'shelljs'

import { TemplateType } from './types.enum'
import { Template, TemplateFile, TemplateData, TemplateName, TemplateSource } from './interfaces'
import { TemplatePlugin } from './types/interfaces'
import * as env from '../env'
import * as fs from 'fs'
import * as index from './types/index/index'
import * as publication from './types/publication'
import { Types } from './types'
export * from './types'
export * from './files'
export * from './types.enum'


export const template = ( templateName:TemplateName ):TemplatePlugin => {
  if ( templateName === "index" )
  {
    return Types.index
  }
  return Types.publication
}

export const getType = ( typeValue:any ):TemplateType => {
  if ( 'string' === typeof typeValue )
  {
    switch (typeValue.toLowerCase()) {
      case "index":
        return TemplateType.Index

      case "publication":
      case "publicationcomponent":
        return TemplateType.PublicationComponent
    }
  }
  return typeValue
}


export const byType = ( templateType:TemplateType ) => {
  if ( 'string' === typeof templateType )
  {
    templateType = getType(templateType)
  }

  switch (templateType) {
    case TemplateType.Index:
      return index
    
    case TemplateType.PublicationComponent:
      return publication
  }
}