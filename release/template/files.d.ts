import { TemplateFiles, TemplateFile } from './interfaces';
export declare const getTemplateFiles: (template: string | TemplateFiles) => TemplateFile[];
export declare const readTemplateFile: (template: TemplateFiles, templateFile: TemplateFile) => TemplateFile;
