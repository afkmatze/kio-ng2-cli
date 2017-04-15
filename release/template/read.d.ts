import { TemplateFiles, TemplateFile } from './interfaces';
export declare const getFiles: (templateName: string) => TemplateFile[];
export declare const readTemplateFile: (templateFiles: TemplateFiles, templateFile: TemplateFile) => void;
export declare const readFile: (templateName: string, templateFile: string) => string;
