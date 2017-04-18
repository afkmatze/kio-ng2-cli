import { LogOperatorPlugin, LogWriter } from '../interfaces';
export declare type KeySelector = "*" | string | string[];
export interface LogWriterKeys extends LogWriter {
    (item: any, idx?: number, list?: any): any;
}
export interface LogOperatorKeys extends LogWriter {
    (target: any, selector?: KeySelector, format?: string, ...args: any[]): void;
}
export declare const operatorKeys: LogOperatorPlugin;
