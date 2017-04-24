import { Observable } from 'rxjs';
export declare const dasherize: (str: string) => string;
export declare const decamelize: (str: string) => string;
export declare const camelize: (str: string) => string;
export declare const classify: (str: string) => string;
export declare const underscore: (str: string) => string;
export declare const capitalize: (str: string) => string;
export declare const diff: (...stringValues: string[]) => Observable<{}>;
