import { ValueType, ValueMatcher } from './interfaces';
export declare const defaultMatcher: {
    "string": ValueMatcher<ValueType>;
    "number": ValueMatcher<ValueType>;
    "boolean": ValueMatcher<ValueType>;
    "object": ValueMatcher<ValueType>;
};
export declare const defaultFormatter: {
    "string": (value: string, ...args: any[]) => string;
    "number": (value: number, dec?: number) => string;
    "boolean": (value: any, ...args: any[]) => string;
    "object": (value: any, ...args: any[]) => string;
};
export declare const defaultTypes: {
    "string": {
        formatter: (value: string, ...args: any[]) => string;
        matcher: ValueMatcher<ValueType>;
    };
    "number": {
        formatter: (value: number, dec?: number) => string;
        matcher: ValueMatcher<ValueType>;
    };
    "boolean": {
        formatter: (value: any, ...args: any[]) => string;
        matcher: ValueMatcher<ValueType>;
    };
    "object": {
        formatter: (value: any, ...args: any[]) => string;
        matcher: ValueMatcher<ValueType>;
    };
};
