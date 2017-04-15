export declare const banner: () => void;
export declare const log: (format: string, ...args: any[]) => void;
export declare const logError: (error: Error, exit?: boolean) => void;
export declare const getStack: () => {
    name: string;
    alias: string;
    filepath: string;
    line: string;
    column: string;
    toString(): string;
}[];
export declare const trace: (label?: string, ...args: any[]) => void;
export declare const printStackItem: (item?: {
    name: string;
    alias: string;
    filepath: string;
    line: string;
    column: string;
    toString(): string;
}, short?: boolean) => string;
export declare const debug: (format: string, ...args: any[]) => void;
export interface RequestCallback {
    (answer: string): string;
}
export declare const request: (message: string, callback: RequestCallback) => Promise<any>;
