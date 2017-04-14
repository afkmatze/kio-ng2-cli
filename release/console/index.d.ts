export declare const banner: () => void;
export declare const log: (format: string, ...args: any[]) => void;
export declare const logError: (error: Error, exit?: boolean) => void;
export declare const debug: (format: string, ...args: any[]) => void;
export interface RequestCallback {
    (answer: string): string;
}
export declare const request: (message: string, callback: RequestCallback) => Promise<any>;
