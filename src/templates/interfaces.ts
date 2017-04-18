import { KioContentType } from 'kio-ng2'
import { TemplateType } from './types.enum'
//import { TemplateName } from './names.enum'

export * from './types.enum'
//export * from './names.enum'

export type TemplateDataType = 'publication'|'index'

export interface TemplateData {
  [key:string]: any;
}

export type TemplateName = "index"|KioContentType

export interface TemplateFile {
  filename:string;
  source?:string;
  absoluteFilepath:string;
}

export interface TemplateSource {
  name:TemplateName;
  files?:TemplateFile[];
}

export interface Template {
  /*source:TemplateSource;
  data?:TemplateData;
  targetRoot:string; */
}

export interface PublicationTemplate extends Template {
  [key:string]: any;
}

export interface IndexTemplate extends Template {
  [key:string]: any;
}


export interface IndexFileNameMapper {
  ( templateFile:TemplateFile ): TemplateFile
}