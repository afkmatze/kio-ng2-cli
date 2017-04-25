/// <reference types="node" />
import { Observable } from 'rxjs';
import { ExecData } from './interfaces';
import { ExecOptions } from 'child_process';
declare const execChildProcess: (command: string, opts?: any) => Observable<any>;
export { execChildProcess as exec };
export declare const evalJS: (filepath: string, opts?: ExecOptions) => Observable<any>;
export declare const evalTS: (filepath: string, opts?: ExecOptions) => Observable<ExecData>;
