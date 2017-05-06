import * as path from 'path'
import { KioContentType } from 'kio-ng2'
import { IndexType, IndexTypes } from '../project/interfaces'

export type KioFileFilter = string|RegExp

export interface KioFolderSettings {
  path: string
  exclude: KioFileFilter[]
}

export type KioFolderSettingArg = string|KioFolderSettings

export interface KioPath extends String {
  join(...args:string[]):KioPath
}

export interface KioComponentsPaths {
  /**
   * path to structure components
   * @type {KioFolderSettings}
   */
  structure:KioFolderSettings;

  /**
   * path to navigation components
   * @type {KioFolderSettings}
   */
  navigation:KioFolderSettings;

  /**
   * path to publication components
   * @type {KioFolderSettings}
   */
  publication:KioFolderSettings;
}

export type KioComponentsPathType = string|keyof KioComponentsPaths

export enum KioComponentsPathTypes {
  structure,
  navigation,
  publication
}

export interface KioProjectPaths {
  root:string;
  components:KioComponentsPaths;
}

export enum Command {
  createComponent,
  buildIndexes
}

export interface EnvConfig {
  configFile?:string;
}

export interface CommandConfig extends EnvConfig {
  command:Command;
}

export type BuildIndexFilterArg = IndexType|string

export interface BuildIndexArgs {
  noCache?:boolean
  filter?:BuildIndexFilterArg|BuildIndexFilterArg[]
}

export interface CommandConfigTestComponents extends CommandConfig {}

export interface CommandConfigBuildIndexes extends CommandConfig {
  args:BuildIndexArgs
}

export interface CommandConfigCreateComponent extends CommandConfig {
  componentName:string;
  contentType:KioContentType
  modifiers?:string[]
  childTypes?:KioContentType[]
}

export type GlobalConfig = CommandConfig|CommandConfigBuildIndexes|CommandConfigCreateComponent