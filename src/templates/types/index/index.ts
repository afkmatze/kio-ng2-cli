import { TemplateDataMapper, TemplatePlugin, IndexTemplate, IndexTemplateData, TemplateData } from '../interfaces'
import { TemplateFile, TemplateSource } from '../../interfaces'
import { mapTemplateData, mapTemplateFile } from './map'
import { ComponentIndex } from '../../../indexes'
import { createTemplate, createTemplateSource, createTemplateByName } from './create'

export const indexPlugin:any = {
  mapTemplateData,
  createTemplate, 
  createTemplateSource,
  createTemplateByName
}