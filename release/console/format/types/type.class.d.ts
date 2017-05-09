import { FormatValueMapper } from './interfaces';
import { ValueTypeSimple, ValueMatcher, FormatterFunction, FormatArg } from '../interfaces';
export declare abstract class FormatValueType<T extends ValueTypeSimple> implements FormatValueMapper<T> {
    abstract typeName: string;
    abstract flag: RegExp;
    typeMatcher: ValueMatcher<T>;
    valueFormatter: FormatterFunction<T>;
    private _expression;
    readonly expression: RegExp;
    isEqual(other: FormatValueType<T>): boolean;
    checkType(value: any): boolean;
    render(formatArg: FormatArg<T>, idx?: number): string;
}
