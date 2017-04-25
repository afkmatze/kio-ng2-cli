export interface SimCommand {
    name: string;
    args?: any[];
}
export declare const sim: (simOpts?: any) => void;
