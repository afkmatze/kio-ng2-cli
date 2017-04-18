import { IndexTemplate, TemplateFile, TemplateSource, TemplateData } from '../../interfaces';
import { IndexTemplateData } from '../interfaces';
export declare const createTemplateSource: (name: string, files?: TemplateFile[]) => TemplateSource;
export declare const createTemplateByName: (templateName: string) => IndexTemplate;
export declare const createTemplate: (source: TemplateSource, data: TemplateData | IndexTemplateData, targetRoot: string) => IndexTemplate;
