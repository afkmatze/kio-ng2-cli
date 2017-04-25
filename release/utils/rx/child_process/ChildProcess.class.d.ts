/// <reference types="node" />
import { Observable } from 'rxjs';
import { ChildProcessOptions, StreamData } from './interfaces';
export declare class ChildProcess {
    constructor(options: ChildProcessOptions);
    options: ChildProcessOptions;
    pid: number;
    private ref;
    /**
     * spawn child process and return pid
     * @return {Promise<number>} [description]
     */
    spawn(): Promise<Observable<StreamData<Buffer>>>;
    private __onFail;
    private __onClose;
    private __onStdoutData;
    private __onStderrData;
    private __lastError;
    readonly end: Observable<number>;
    readonly stdout: Observable<Buffer>;
    readonly stderr: Observable<Buffer>;
    readonly stream: Observable<StreamData<Buffer>>;
    protected bindChildProcess(): void;
}
