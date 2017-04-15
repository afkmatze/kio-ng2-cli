import { TemplateFile, TemplateSource } from './interfaces';
export declare const readTemplateFile: (templateFile: TemplateFile) => string;
export declare const renderTemplateFile: (templateFile: TemplateFile, templateData: any) => string;
export declare const renderTemplateSource: (source: TemplateSource, data: any, targetRoot: string) => void;
export declare const renderTemplate: (template: any) => void;
