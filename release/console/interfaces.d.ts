export interface LogWriter {
    (format?: string, ...args: any[]): void;
}
export interface LoggerApi {
    banner(): void;
    log(format?: string, ...args: any[]): void;
    log(...args: any[]): void;
    logError(error: Error): void;
    logError(errorMessage: string): void;
    getStack(): any[];
    trace(label?: string, ...args: any[]): void;
    printStackItem(item?: any, short?: boolean): string;
    debug: LogWriter;
    request(message: string, callback: RequestCallback): Promise<any>;
}
export declare type LogOperatorReturnValue = LogWriter | string;
export interface LogOperator {
    (label?: any, ...args: any[]): any;
}
export interface LogOperatorPlugin {
    (logger: LoggerApi): LogOperator;
}
export interface RequestCallback {
    (answer: string): string;
}
