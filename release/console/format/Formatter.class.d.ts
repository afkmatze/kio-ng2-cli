import { ValueType, ValueFormatter, TypeMatcher, ValueTypeFormatter } from './interfaces';
export declare class Formatter implements ValueFormatter<string>, ValueFormatter<number>, ValueFormatter<Date> {
    private types;
    addType(typeMatcher: TypeMatcher, typeFormatter: ValueTypeFormatter): void;
    getValueFormatter(value: any): ValueFormatter<ValueType>;
    formatValue(value: any): any;
    printf(format: string, ...args: any[]): string;
    formatStringValue(value: string): string;
    formatNumberValue(value: number): string;
    formatDateValue(value: Date): string;
}
