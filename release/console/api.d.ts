import { RequestCallback } from './interfaces';
export declare const banner: () => void;
export declare const log: (format: string, ...args: any[]) => void;
export declare const logError: (error: string | Error, exit?: boolean) => void;
export declare const getStack: () => any[];
export declare const trace: (label?: string, ...args: any[]) => void;
export declare const printStackItem: (item?: any, short?: boolean) => string;
export declare const debug: (format: string, ...args: any[]) => void;
export declare const request: (message: string, callback: RequestCallback) => Promise<any>;