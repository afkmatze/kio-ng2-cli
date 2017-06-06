import { FormatVariable } from './variables/interfaces';
export declare type ValueTypeSimple = string | number | boolean | object;
export declare type ValueTypeSimpleNames = "string" | "number" | "boolean" | "object";
export declare type ValueType = ValueTypeSimple | ValueTypeSimple[];
export declare const checkValueType: <T extends ValueTypeSimple, U extends ValueTypeSimpleNames>(value: T, valueTypeName: U) => value is T;
export interface FormatterFunction<T extends ValueTypeSimple> {
    (value: T, ...args: any[]): string;
}
export interface ValueFormatter<T extends ValueType> {
}
export interface TypeMatcher {
    (value: any, ...args: any[]): boolean;
}
export interface ValueMatcher<T extends ValueType> {
    (value?: T, ...args: any[]): boolean;
}
export declare type ValueTypeMatcher = ValueMatcher<ValueType>;
export declare type ValueTypeFormatter = ValueFormatter<ValueType>;
export interface TypeFormat<T extends ValueTypeSimple> {
    matcher: ValueMatcher<T>;
    formatter: ValueFormatter<T>;
}
export interface FormatSource {
    source: string;
}
export declare function instanceOfFormatSource(other: any): other is FormatSource;
export interface Param<T extends any> {
    value: T;
}
export declare function instanceOfParam<T>(other: any): other is Param<T>;
export interface FormatChunk extends FormatSource {
    index?: number;
    length: number;
}
export declare function instanceOfFormatChunk(other: any): other is FormatChunk;
/**
 * formatting param matching a variable
 */
export interface FormatParam<T extends any> extends Param<T>, FormatVariable {
    typeName: string;
    flag: string[1];
    paramArgs?: string;
}
export declare function instanceOfFormatParam<T>(other: any): other is FormatParam<T>;
export interface FormatArg<T extends ValueTypeSimple> extends FormatParam<T> {
    value: T;
}
export declare function instanceOfFormatArg<T extends ValueTypeSimple>(other: any): other is FormatArg<T>;
export declare const isInstanceOf: {
    FormatSource: (other: any) => other is FormatSource;
    Param: <T>(other: any) => other is Param<T>;
    FormatChunk: (other: any) => other is FormatChunk;
    FormatParam: <T>(other: any) => other is FormatParam<T>;
    FormatArg: <T extends ValueTypeSimple>(other: any) => other is FormatArg<T>;
};
