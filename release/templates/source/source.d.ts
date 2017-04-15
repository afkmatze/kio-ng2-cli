import { PublicationTemplate, IndexTemplate, TemplateFile, TemplateSource, TemplateData } from '../interfaces';
export declare const createTemplateSource: (name: "fragment" | "txt" | "src" | "index", files?: TemplateFile[]) => TemplateSource;
export declare const createTemplateByName: (templateName: "fragment" | "txt" | "src" | "index") => PublicationTemplate;
export declare type TemplateDataRef = TemplateData<"publication"> | TemplateData<"index">;
export declare const createTemplate: (source: TemplateSource, data: TemplateDataRef, targetRoot: string) => PublicationTemplate | IndexTemplate;
