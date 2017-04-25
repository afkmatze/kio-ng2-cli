/// <reference types="node" />
import { Observable } from 'rxjs';
export interface CommandParams {
    commandName: string;
    args: string[];
}
export interface ChildProcessOptions {
    command: CommandParams | string;
    cwd?: string;
}
export interface ExecCallback {
    (exitcode: number, stdout: string, stderr: string): void;
}
export declare class ChildProcess {
    constructor(options: ChildProcessOptions);
    private __logs;
    protected log(eventName: string, ...args: any[]): void;
    protected printLog(log: any, idx?: number): void;
    protected command: CommandParams;
    protected pwd: string;
    private __stdout;
    private __stderr;
    private __stdout_observer;
    private __stderr_observer;
    readonly stdout: Observable<Buffer>;
    readonly stderr: Observable<Buffer>;
    private __stdout_data;
    private __stderr_data;
    private createObserver(typeName);
    private createObservers();
    private _spawn(callback?);
    private _execCallback;
    exec(callback?: ExecCallback): Observable<{}>;
}
