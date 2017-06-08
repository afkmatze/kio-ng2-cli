import { Observable } from 'rxjs';
export declare type HookCallbackResult<T> = Promise<T> | Observable<T> | void;
export interface HookCallback {
    <T>(): HookCallbackResult<T>;
    (done: {
        (error?): void;
    }): void;
}
export interface SpecHook {
    callback: HookCallback;
}
export interface LabeledSpecHook extends SpecHook {
    label: string;
}
export interface TestScope {
    hook: LabeledSpecHook;
    childScopes?: TestScope[];
}
export declare type HookType = 'it' | 'describe';
export declare class TestContext {
    readonly type: HookType;
    readonly label: string;
    readonly callback: HookCallback;
    readonly parent: TestContext;
    constructor(type: HookType, label: string, callback: HookCallback, parent?: TestContext);
    children: TestContext[];
    addHook(type: HookType, hook: LabeledSpecHook): void;
    describe(label: string, callback: HookCallback): void;
    it(label: string, callback: HookCallback): void;
}
export declare const describe: (label: string, callback: HookCallback) => void;
export declare const it: (label: string, callback: HookCallback) => void;
