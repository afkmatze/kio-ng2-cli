import { PublicationTemplate, TemplateFile, TemplateSource, TemplateData } from '../interfaces';
export declare type ComponentDataKey = "contentType" | "styles" | "modifiers" | "childTypes" | "dasherizedModuleName" | "classifiedModuleName" | "classifiedParentComponentName" | "pathToStructureComponents" | "dasherizedParentComponentPath" | "selector" | "dasherizedModuleName";
export declare const DataKeys: ComponentDataKey[];
export declare const createTemplateSource: (name: "fragment" | "txt" | "src" | "index", files?: TemplateFile[]) => TemplateSource;
export declare const createTemplateByName: (templateName: "fragment" | "txt" | "src" | "index") => PublicationTemplate;
export declare const createTemplate: (source: TemplateSource, data: TemplateData<"publication">, targetRoot: string) => PublicationTemplate;
