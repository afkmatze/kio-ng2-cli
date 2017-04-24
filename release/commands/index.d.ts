/// <reference types="yargs" />
import * as yargs from 'yargs';
export declare const BUILD_INDEXES: string;
export declare const CREATE_COMPONENT: string;
/** CREATE COMPONENT */
export declare const createComponentCommand: yargs.CommandModule;
export declare const buildIndexesCommand: yargs.CommandModule;
export declare const exec: (command: string) => void;
