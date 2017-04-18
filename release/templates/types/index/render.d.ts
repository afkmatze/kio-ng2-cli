import { Observable } from 'rxjs';
import { TemplateFile, TemplateData } from '../../interfaces';
export declare const renderFilesIndex: (data: any) => Observable<string>;
export declare const renderTemplateFileWithData: (templateFile: TemplateFile, data: TemplateData) => Observable<string>;
