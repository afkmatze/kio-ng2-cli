import { KioContentType } from 'kio-ng2-data';
import { IndexType } from '../project/interfaces';
export declare type KioFileFilter = string | RegExp;
export interface KioFolderSettings {
    path: string;
    include?: KioFileFilter[];
    exclude: KioFileFilter[];
}
export declare type KioFolderSettingArg = string | KioFolderSettings;
export interface KioPath extends String {
    join(...args: string[]): KioPath;
}
export interface KioComponentsPaths {
    /**
     * path to structure components
     * @type {KioFolderSettings}
     */
    /**
     * path to navigation components
     * @type {KioFolderSettings}
     */
    /**
     * path to publication components
     * @type {KioFolderSettings}
     */
    publication: KioFolderSettings;
}
export declare type KioComponentsPathType = string | keyof KioComponentsPaths;
export declare enum KioComponentsPathTypes {
    publication = 0,
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
export interface CommandConfigTestComponents extends CommandConfig {
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
