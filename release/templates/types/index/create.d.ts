import { IndexTemplate, TemplateFile, TemplateSource, TemplateData } from '../../interfaces';
export declare const createTemplateSource: (name: "fragment" | "txt" | "src" | "index", files?: TemplateFile[]) => TemplateSource;
export declare const createTemplateByName: (templateName: "fragment" | "txt" | "src" | "index") => IndexTemplate;
export declare const createTemplate: (source: TemplateSource, data: TemplateData<"index">, targetRoot: string) => IndexTemplate;
