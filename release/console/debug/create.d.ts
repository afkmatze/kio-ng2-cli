export interface DebuggerOptions {
    debugKey?: string;
    envKey?: string;
}
export declare const DebuggerOptionsDefault: {
    debugKey: string;
    envKey: string;
};
export declare function createDebugger(opts?: DebuggerOptions): (format: string, ...args: any[]) => void;
