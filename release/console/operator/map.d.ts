import { LogOperatorPlugin, LogOperator, LogWriter } from '../interfaces';
export interface LogWriterMap extends LogWriter {
    (item: any, idx?: number, list?: any): any;
}
export interface LogOperatorMap extends LogOperator {
    (label?: string, total?: number): LogWriterMap;
}
export declare const operator: LogOperatorPlugin;
export default operator;
