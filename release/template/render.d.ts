import { ComponentTemplateData, IndexTemplateData } from './interfaces';
export declare const mapTemplateFileName: (filename: string, replacement: string) => string;
export declare const renderComponentTemplates: (data: ComponentTemplateData, sourceDirectory: string, targetDirectory: any) => Promise<string[]>;
export declare const renderComponentTemplate: (data: ComponentTemplateData, templateFile: string, targetFile: string) => Promise<string>;
export declare const renderIndexTemplate: (data: IndexTemplateData, templateFile: string, targetFile: string) => Promise<string>;
