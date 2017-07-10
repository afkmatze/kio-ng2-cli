import { Observable } from 'rxjs';
export * from './create';
export * from './interfaces';
export * from './templates';
export * from './components';
export * from './config';
import * as templates from './templates';
import { PublicationComponentTemplateData } from './templates/publicationComponent';
import { CLICommandArgsBuildIndexes, IndexTypes } from './interfaces';
export { templates };
declare const _default: (projectPath?: string) => {
    createComponent: (data: PublicationComponentTemplateData) => Observable<{}>;
    buildIndexes: (args?: CLICommandArgsBuildIndexes) => Observable<string>;
    files: {
        filesForIndexType: (indexType: IndexTypes) => Observable<string>;
        kioFiles: (kioPathType: string) => Observable<string>;
        publicationComponentFiles: () => Observable<string[]>;
        publicationComponents: () => Observable<string>;
    };
};
export default _default;
