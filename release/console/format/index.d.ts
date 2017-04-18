export * from './interfaces';
export * from './Formatter.class';
export * from './formatter';
import { ValueFormatter, ValueMatcher, ValueType } from './interfaces';
export declare const useTypeFormatter: (typeMatcher: ValueMatcher<ValueType>, typeFormatter: ValueFormatter<ValueType>) => void;
