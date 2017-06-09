import { Observable } from 'rxjs';
export declare const evalTsFile: (filepath: string) => any;
export declare const req: <T>(filepath: string) => T;
export interface SourceFile<T> {
    key: string;
    filepath: string;
    data?: T;
}
export declare const evalSource: <T>(source: string) => Observable<T>;
export declare const renderSourceGroup: <T>(sourceFiles: SourceFile<T>[]) => string;
export interface Group<T> {
    [key: string]: T;
}
export declare const reqGroup: <T>(filepaths: string[]) => Observable<T[]>;
