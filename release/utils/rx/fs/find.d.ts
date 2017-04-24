import { Observable } from 'rxjs';
export declare const find: (filepath: string, concurrent?: number) => Observable<string>;
export declare const findFiles: (filepath: string, pattern?: RegExp) => Observable<string>;
