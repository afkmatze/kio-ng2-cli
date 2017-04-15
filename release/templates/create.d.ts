import { TemplateFile, TemplateSource } from './interfaces';
export declare const createTemplateSource: (name: "fragment" | "txt" | "src" | "index", files?: TemplateFile[]) => TemplateSource;
export declare const createTemplateByName: (templateName: "fragment" | "txt" | "src" | "index") => any;
export declare const createTemplate: (source: TemplateSource, data: any, targetRoot: string) => any;
