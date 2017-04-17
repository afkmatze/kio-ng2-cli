import { Observable } from 'rxjs';
import { TemplateFile, TemplateData } from '../../interfaces';
export declare const renderTemplateFileWithData: (templateFile: TemplateFile, data: TemplateData) => Observable<string>;
