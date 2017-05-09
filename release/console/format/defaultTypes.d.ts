import { ValueTypeSimple, ValueMatcher, FormatterFunction } from './interfaces';
export declare const defaultMatcher: {
    "string": ValueMatcher<{}>;
    "number": ValueMatcher<{}>;
    "boolean": ValueMatcher<{}>;
    "object": ValueMatcher<{}>;
};
export declare const defaultFormatter: {
    "string": {
        formatValue: FormatterFunction<string>;
    };
    "number": {
        formatValue: FormatterFunction<number>;
    };
    "boolean": {
        formatValue: FormatterFunction<ValueTypeSimple>;
    };
    "object": {
        formatValue: FormatterFunction<object>;
    };
};
