import { TemplateDataMapper, TemplatePlugin } from '../interfaces'
import { mapTemplateData, , mapTemplateFile } from './map'
import { createTemplate, createTemplateSource, createTemplateByName } from './create'

export const indexPlugin:TemplatePlugin = {
  mapTemplateData,
  createTemplate, 
  createTemplateSource,
  createTemplateByName
}