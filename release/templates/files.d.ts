import { Observable } from 'rxjs';
import { TemplateFile, TemplateType, IndexFileNameMapper } from './interfaces';
export declare const findTemplateSourceFiles: (templateName: string) => TemplateFile[];
export declare const templateFiles: (templateName: string | TemplateType, mapper?: IndexFileNameMapper) => Observable<TemplateFile>;
