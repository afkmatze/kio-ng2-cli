import { 
  TemplatePlugin, TemplatePluginMap, TemplateDataMapper, TemplateData, IndexTemplateData, IndexTemplateDataItem ,
  PublicationComponentTemplateData, PublicationComponentTemplateDataItem
} from './interfaces'

export * from './interfaces'

import * as indexType from './index/index'
import {plugin as publicationType} from './publication'

export const Types:any = {
  "index": indexType,
  "publication": publicationType
}
