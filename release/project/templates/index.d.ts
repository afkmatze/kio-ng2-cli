import * as indexes from './indexes';
import * as publicationComponent from './publicationComponent';
import { Observable } from 'rxjs/Observable';
export { indexes, publicationComponent };
export declare const shouldUpdateFile: (targetFilepath: string, contents: string) => Observable<boolean>;
export declare const replaceFile: (targetFilepath: string, contents: string) => Observable<boolean>;
export declare const renderTemplateWithData: (templateName: string, data: any) => Observable<{
    file: string;
    content: string;
}>;
