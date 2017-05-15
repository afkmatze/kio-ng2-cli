import { Observable } from 'rxjs';
import { ExecData } from 'rxfs';
import { CLICommandArgsTestComponents } from './interfaces';
export declare const testComponents: (projectPath: string) => (args: CLICommandArgsTestComponents) => Observable<ExecData>;
