import { Observable } from 'rxjs';
import { CLICommandArgsBuildIndexes, CLICommandArgsTestComponents, CLICommandArgsCreateComponent } from './interfaces';
import * as files from './files';
import * as templates from './templates';
export declare const buildIndexes: (args?: CLICommandArgsBuildIndexes) => Observable<string>;
export declare const createComponent: (args: CLICommandArgsCreateComponent) => Observable<{}>;
export declare const testComponents: (args: CLICommandArgsTestComponents) => Observable<[string, string][]>;
export { templates, files };
