import { 
  TemplatePlugin, TemplatePluginMap, TemplateDataMapper, TemplateData, IndexTemplateData, IndexTemplateDataItem ,
  PublicationComponentTemplateData, PublicationComponentTemplateDataItem
} from './interfaces'

import * as indexType from './index/index'
import * as publicationType from './publication'

export const Types:TemplatePluginMap = {
  "index": indexType,
  "publication": publicationType
}
