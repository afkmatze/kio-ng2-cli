import { ValueTypeSimple, FormatArg, FormatParam } from '../interfaces';
export interface FormatValueMapper<T extends ValueTypeSimple> {
    typeName: string;
    checkType(value: any): boolean;
    render(formatArg: FormatArg<T>, idx?: number): string;
}
export declare function instanceOfFormatValueMapper<T>(other: any): boolean;
export declare type FormatValueMappers = FormatValueMapper<ValueTypeSimple>[];
export declare function instanceOfFormatParam<T>(other: any): boolean;
export interface FormatMappingArg<T extends ValueTypeSimple> extends FormatArg<T> {
    formatMapper: FormatValueMapper<T>;
}
export interface FormatMappingArgValue<T extends ValueTypeSimple> extends FormatParam<T>, FormatMappingArg<T> {
}
export declare function instanceOfFormatMappingArg<T extends ValueTypeSimple>(other: any): other is FormatMappingArgValue<T>;
