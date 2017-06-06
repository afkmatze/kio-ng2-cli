import { Observable } from 'rxjs';
import { KioFolderSettingArg, KioFileFilter } from '../../env';
import { IndexTypes } from '../interfaces';
export declare const resolveRootByIndexType: (indexType: IndexTypes) => string;
export declare const filepathFilter: (filter: string | RegExp | KioFileFilter[], include?: boolean) => any;
export declare const list: (sourcePath: KioFolderSettingArg) => Observable<string>;
export declare const kioFiles: (projectPath: string) => (kioPathType: string) => Observable<string>;
export declare const publicationComponents: (projectPath: string) => () => Observable<string>;
export declare const publicationComponentFiles: (projectPath: string) => () => Observable<string[]>;
export declare const filesForIndexType: (projectPath: string) => (indexType: IndexTypes) => Observable<string>;
declare const _default: (projectPath?: string) => {
    filesForIndexType: (indexType: IndexTypes) => Observable<string>;
    kioFiles: (kioPathType: string) => Observable<string>;
    publicationComponentFiles: () => Observable<string[]>;
    publicationComponents: () => Observable<string>;
};
export default _default;
