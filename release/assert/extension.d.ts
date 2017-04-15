export interface ExtendingAssertionOptions {
    assertion: boolean;
    message: string;
    actual?: any;
    expected?: any;
}
export interface ExtendingAssertion {
    (actual: any, ...args: any[]): ExtendingAssertionOptions | void;
}
export interface Extension {
    name: string;
    assertion: ExtendingAssertion;
}
export declare const extensions: Map<string, Set<Extension>>;
export declare const use: (scope: string, extension: Extension) => void;
export { default as expect } from 'ceylon';
