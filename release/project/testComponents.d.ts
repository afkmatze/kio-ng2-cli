import { Observable } from 'rxjs';
import { CLICommandArgsTestComponents } from './interfaces';
export declare const testComponents: (projectPath: string) => (args: CLICommandArgsTestComponents) => Observable<{}>;
