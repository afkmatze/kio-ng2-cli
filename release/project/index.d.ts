import { Observable } from 'rxjs';
import { ExecData } from 'rxfs';
import { CLICommandArgsBuildIndexes, CLICommandArgsTestComponents, CLICommandArgsCreateComponent } from './interfaces';
import * as files from './files';
import * as templates from './templates';
export declare const buildIndexes: (args?: CLICommandArgsBuildIndexes) => Observable<string>;
export declare const createComponent: (args: CLICommandArgsCreateComponent) => Observable<{}>;
export declare const testComponents: (args: CLICommandArgsTestComponents) => Observable<ExecData>;
export { templates, files };
