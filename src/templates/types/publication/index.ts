import { TemplateDataMapper, TemplatePlugin } from '../interfaces'
import { mapComponentData as mapTemplateData, mapDataKey as mapTemplateDataKey } from './map'
import { createTemplate, createTemplateSource, createTemplateByName } from './create'

export { mapTemplateData, mapTemplateDataKey }
export { createTemplate, createTemplateSource, createTemplateByName}

export const plugin:any = {
  mapTemplateData, mapTemplateDataKey,
  createTemplate, createTemplateSource, createTemplateByName
}