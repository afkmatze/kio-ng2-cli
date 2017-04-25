/// <reference types="node" />
export * from './interfaces';
export * from './command';
export * from './ChildProcess.class';
import { Observable } from 'rxjs';
import { ChildProcessOptions, StreamData } from './interfaces';
export declare const spawn: (commandOptions: string | ChildProcessOptions, opts?: any) => Observable<StreamData<Buffer>>;
export declare const createChildProcess: (commandOptions: string | ChildProcessOptions, opts?: any) => any;
