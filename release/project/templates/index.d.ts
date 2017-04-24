import * as indexes from './indexes';
import * as publicationComponent from './publicationComponent';
import { Observable } from 'rxjs';
export { indexes, publicationComponent };
export declare const shouldUpdateFile: (targetFilepath: string, contents: string) => Observable<{}>;
export declare const replaceFile: (targetFilepath: string, contents: string) => Observable<boolean>;
