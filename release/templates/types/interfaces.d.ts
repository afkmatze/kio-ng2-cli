import { PublicationTemplate, TemplateSource, TemplateName, IndexTemplate, TemplateData, TemplateFile } from '../interfaces';
import { DataKeyType as IndexDataKeyType, DataKeys as IndexDataKeys } from './index/keys';
import { DataKeyType as PublicationDataKeyType, DataKeys as PublicationDataKeys } from './publication/keys';
import { ComponentIndex } from '../../indexes';
import { PublicationComponent } from '../../components';
export { TemplateData, PublicationTemplate, IndexTemplate };
export { IndexDataKeyType, IndexDataKeys, PublicationDataKeyType, PublicationDataKeys };
export interface TemplateDataMapper<T> {
    mapTemplateData(data: any): TemplateData<T>;
    mapTemplateFile(file: TemplateFile, data: TemplateData<T>): TemplateFile;
    mapTemplateFile(file: TemplateFile, data: TemplateData<T>, replaceRoot: string): TemplateFile;
}
export interface TemplateValueMapper {
    (dataKey: string, data: any): any;
}
export interface TemplateFactory {
    createTemplate(source: TemplateSource, data: IndexTemplateData, targetRoot: string): IndexTemplate;
    createTemplate(source: TemplateSource, data: PublicationComponentTemplateData, targetRoot: string): PublicationTemplate;
    createTemplateSource(templateName: TemplateName, files?: TemplateFile[]): TemplateSource;
    createTemplateByName(templateName: TemplateName, files?: TemplateFile[]): TemplateSource;
}
export interface TemplateMapper {
    mapTemplateData(data: ComponentIndex): IndexTemplateData;
    mapTemplateDataKey?(key: string, data: ComponentIndex): IndexTemplateData;
    mapTemplateData(data: PublicationComponent): PublicationComponentTemplateData;
    mapTemplateDataKey?(key: string, data: PublicationComponent): PublicationComponentTemplateData;
}
export interface TemplatePlugin extends TemplateFactory, TemplateMapper {
}
export interface TemplatePluginMap {
    [key: string]: TemplatePlugin;
}
export interface TemplateTypeMapper<T> {
    [key: string]: TemplateDataMapper<T>;
}
export interface PublicationTemplateDataMapper extends TemplateDataMapper<"publication"> {
}
export interface IndexTemplateDataMapper extends TemplateDataMapper<"index"> {
}
export interface PublicationComponentTemplateDataItem extends PublicationTemplate {
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
export interface IndexTemplateDataItem extends IndexTemplate {
    importName: string;
    importAlias?: string;
    importPath: string;
}
export interface IndexTemplateData extends IndexTemplate {
    exportName: string;
    indexItems: IndexTemplateDataItem[];
}
