import { PublicationTemplate, TemplateFile, TemplateSource } from '../../interfaces';
import { PublicationComponentTemplateData } from '../interfaces';
export declare type ComponentDataKey = "contentType" | "styles" | "modifiers" | "childTypes" | "dasherizedModuleName" | "classifiedModuleName" | "classifiedParentComponentName" | "pathToStructureComponents" | "dasherizedParentComponentPath" | "selector" | "dasherizedModuleName";
export declare const DataKeys: ComponentDataKey[];
export declare const createTemplateSource: (name: string, files?: TemplateFile[]) => TemplateSource;
export declare const createTemplateByName: (templateName: string) => PublicationTemplate;
export declare const createTemplate: (source: TemplateSource, data: PublicationComponentTemplateData, targetRoot: string) => PublicationTemplate;
