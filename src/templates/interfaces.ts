import { TemplateData, TemplateDataType } from './source/interfaces'

export { TemplateData, TemplateDataType }

export type TemplateName = "index"|"fragment"|"src"|"txt"

export interface TemplateFile {
  filename:string;
  source?:string;
  absoluteFilepath:string;
}

export interface TemplateSource {
  name:TemplateName;
  files?:TemplateFile[];
}

export interface Template<TemplateDataType> {
  source:TemplateSource;
  data?:TemplateData<TemplateDataType>;
  targetRoot:string; 
}

export interface PublicationTemplate extends Template<"publication"> {}
export interface IndexTemplate extends Template<"index"> {}