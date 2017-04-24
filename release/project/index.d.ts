import { Observable } from 'rxjs';
import { CLICommandArgsBuildIndexes, CLICommandArgsCreateComponent } from './interfaces';
import * as files from './files';
import * as templates from './templates';
export declare const buildIndexes: (args?: CLICommandArgsBuildIndexes) => Observable<string>;
export declare const createComponent: (args: CLICommandArgsCreateComponent) => Observable<{}>;
export { templates, files };
