export declare type ListItem<T> = T | T[];
export declare const flatten: <T>(list: T | T[] | ListItem<T>[]) => T[];
export declare const parseList: (list: string | string[]) => string[];
