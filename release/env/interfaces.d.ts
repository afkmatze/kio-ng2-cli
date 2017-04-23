import { KioContentType } from 'kio-ng2';
import { IndexType } from '../project/interfaces';
export interface KioPath extends String {
    join(...args: string[]): KioPath;
}
export interface KioComponentsPaths {
    /**
     * path to structure components
     * @type {string}
     */
    structure: string;
    /**
     * path to navigation components
     * @type {string}
     */
    navigation: string;
    /**
     * path to publication components
     * @type {string}
     */
    publication: string;
}
export interface KioProjectPaths {
    root: string;
    components: KioComponentsPaths;
}
export declare enum Command {
    createComponent = 0,
    buildIndexes = 1,
}
export interface EnvConfig {
    configFile?: string;
}
export interface CommandConfig extends EnvConfig {
    command: Command;
}
export declare type BuildIndexFilterArg = IndexType | string;
export interface BuildIndexArgs {
    noCache?: boolean;
    filter?: BuildIndexFilterArg | BuildIndexFilterArg[];
}
export interface CommandConfigBuildIndexes extends CommandConfig {
    args: BuildIndexArgs;
}
export interface CommandConfigCreateComponent extends CommandConfig {
    componentName: string;
    contentType: KioContentType;
    modifiers?: string[];
    childTypes?: KioContentType[];
}
export declare type GlobalConfig = CommandConfig | CommandConfigBuildIndexes | CommandConfigCreateComponent;
