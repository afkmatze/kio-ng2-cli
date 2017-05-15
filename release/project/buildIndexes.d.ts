import { Observable } from 'rxjs';
import { CLICommandArgsBuildIndexes } from './interfaces';
export declare const buildIndexes: (projectPath: string) => (args?: CLICommandArgsBuildIndexes) => Observable<string>;
declare var _default: (projectPath: string) => {
    buildIndexes: (args?: CLICommandArgsBuildIndexes) => Observable<string>;
};
export default _default;
