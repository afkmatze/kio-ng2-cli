import { PublicationTemplate, Template, TemplateSource, TemplateName, IndexTemplate, TemplateData, TemplateFile } from '../interfaces';
import { DataKeyType as IndexDataKeyType, DataKeys as IndexDataKeys } from './index/keys';
import { DataKeyType as PublicationDataKeyType, DataKeys as PublicationDataKeys } from './publication/keys';
import { PublicationComponent } from '../../components';
export { TemplateData, PublicationTemplate, IndexTemplate };
export { IndexDataKeyType, IndexDataKeys, PublicationDataKeyType, PublicationDataKeys };
export interface TemplateDataMapper {
    mapTemplateData(data: any): TemplateData;
    mapTemplateFile(file: TemplateFile, data: TemplateData): TemplateFile;
    mapTemplateFile(file: TemplateFile, data: TemplateData, replaceRoot: string): TemplateFile;
}
export interface TemplateValueMapper {
    (dataKey: string, data: any): any;
}
export interface TemplateFactory {
    createTemplate(source: TemplateSource, data: Template, targetRoot: string): IndexTemplate;
    createTemplate(source: TemplateSource, data: Template, targetRoot: string): PublicationTemplate;
    createTemplateSource(templateName: TemplateName, files?: TemplateFile[]): TemplateSource;
    createTemplateByName(templateName: TemplateName, files?: TemplateFile[]): TemplateData;
}
export interface TemplateMapper {
    mapTemplateData(data: any): IndexTemplateData;
    mapTemplateDataKey?(key: string, data: any): IndexTemplateData;
    mapTemplateData(data: PublicationComponent): PublicationComponentTemplateData;
    mapTemplateDataKey?(key: string, data: PublicationComponent): PublicationComponentTemplateData;
}
export interface TemplatePlugin extends TemplateFactory, TemplateMapper {
}
export interface TemplatePluginMap {
    [key: string]: TemplatePlugin;
}
export interface TemplateTypeMapper {
    [key: string]: TemplateDataMapper;
}
export interface PublicationTemplateDataMapper extends TemplateDataMapper {
}
export interface IndexTemplateDataMapper extends TemplateDataMapper {
}
export interface PublicationComponentTemplateDataItem {
    importName: string;
    importAlias?: string;
    importPath: string;
}
export interface PublicationComponentTemplateData extends PublicationTemplate {
    exportName: string;
    basename: string;
    classifiedComponentName: string;
    dasherizedComponentName: string;
    classifiedParentComponentName: string;
    dasherizedParentComponentName: string;
}
export interface IndexTemplateDataItem {
    importName: string;
    importAlias?: string;
    importPath: string;
}
export interface IndexTemplateData extends IndexTemplate {
    exportName: string;
    indexItems: IndexTemplateDataItem[];
}
