import * as indexes from './indexes';
import * as publicationComponent from './publicationComponent';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
export { indexes, publicationComponent };
export declare const shouldUpdateFile: (targetFilepath: string, contents: string) => Observable<boolean>;
export declare const replaceFile: (targetFilepath: string, contents: string) => Observable<boolean> | ErrorObservable;
export declare const renderTemplateWithData: (templateName: string, data: any) => Observable<{
    file: string;
    content: string;
}>;
