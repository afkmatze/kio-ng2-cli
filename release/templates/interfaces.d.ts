import { KioContentType } from 'kio-ng2';
export * from './types.enum';
export declare type TemplateDataType = 'publication' | 'index';
export interface TemplateData {
    [key: string]: any;
}
export declare type TemplateName = "index" | KioContentType;
export interface TemplateFile {
    filename: string;
    source?: string;
    absoluteFilepath: string;
}
export interface TemplateSource {
    name: TemplateName;
    files?: TemplateFile[];
}
export interface Template {
}
export interface PublicationTemplate extends Template {
    [key: string]: any;
}
export interface IndexTemplate extends Template {
    [key: string]: any;
}
export interface IndexFileNameMapper {
    (templateFile: TemplateFile): TemplateFile;
}
