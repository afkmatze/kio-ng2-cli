/// <reference types="node" />
export declare type ValueTypeSimple = string | number | Date | boolean | Buffer;
export declare type ValueType = ValueTypeSimple | ValueTypeSimple[];
export interface ValueFormatter<T> {
    formatValue(value: T, ...args: any[]): string;
}
export interface TypeMatcher {
    (value: any, ...args: any[]): boolean;
}
export interface ValueMatcher<T> {
    (value?: T, ...args: any[]): boolean;
}
export declare type ValueTypeMatcher = ValueMatcher<ValueType>;
export declare type ValueTypeFormatter = ValueFormatter<ValueType>;
