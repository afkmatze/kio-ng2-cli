/// <reference types="node" />
import * as fs from 'fs';
export declare enum FSTypes {
    file = 0,
    directory = 1,
    block_device = 2,
    character_device = 3,
    symbolic_link = 4,
    fifo = 5,
    socket = 6,
}
export declare type FSType = "file" | "directory" | "socket";
export declare type FSFlag = "file" | "directory" | "block_device" | "character_device" | "symbolic_link" | "fifo" | "socket";
export declare const flagMatcher: {
    file: (stats: fs.Stats) => boolean;
    directory: (stats: fs.Stats) => boolean;
    block_device: (stats: fs.Stats) => boolean;
    character_device: (stats: fs.Stats) => boolean;
    symbolic_link: (stats: fs.Stats) => boolean;
    fifo: (stats: fs.Stats) => boolean;
    socket: (stats: fs.Stats) => boolean;
};
export declare const isFSType: (value: fs.Stats, fsType: FSType) => boolean;
export declare const getFSTypeForStats: (value: fs.Stats) => "file" | "directory" | "socket";
export interface AssertionCallback {
    (not: boolean, actual: string, fsType?: FSType, message?: string): void;
    (not: boolean, actual: string, message?: string): void;
}
export interface BoundAssertionCallback {
    (actual: string, expected: string, message?: string): void;
}
export interface FSAssertion {
    [key: string]: AssertionCallback;
}
export interface BoundFSAssertion {
    toBeDirectory(filepath: string, message?: string): any;
    toBeADirectory(filepath: string, message?: string): any;
    toNotBeDirectory(filepath: string, message?: string): any;
    toNotBeADirectory(filepath: string, message?: string): any;
    [key: string]: BoundAssertionCallback;
}
export declare const FileSystemAssertions: FSAssertion;
export declare const FileAgeAssertion: {
    toBeNewerThan: (not: boolean, actual: string, datetime: Date, message?: string) => void;
};
export declare const emptyStats: fs.Stats;
export declare const getStats: (filepath: string) => fs.Stats;
export declare const assertExists: (filepath: string, message?: string) => void;
export declare const expectFile: (filepath: string) => void;
declare const _default: (filepath: string) => {
    toExist: (message?: string) => void;
    toBeNewerThan: (datetime: Date, message?: string) => void;
    toBeFSType: (fsType: FSType, message?: string) => void;
    toBeDirectory: (message?: string) => void;
    toBeADirectory: (message?: string) => void;
    toBeFile: (message?: string) => void;
    toBeAFile: (message?: string) => void;
    toNotExist: (message?: string) => void;
    toNotBeNewerThan: (datetime: Date, message?: string) => void;
    toNotBeFSType: (fsType: FSType, message?: string) => void;
    toNotBeDirectory: (message?: string) => void;
    toNotBeADirectory: (message?: string) => void;
    toNotBeFile: (message?: string) => void;
    toNotBeAFile: (message?: string) => void;
};
export default _default;
