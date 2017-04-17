import * as path from 'path'
import { KioContentType } from 'kio-ng2'
import { IndexType, IndexName } from '../indexes/interfaces'

export interface KioPath extends String {
  join(...args:string[]):KioPath
}

export interface KioComponentsPaths {
  /**
   * path to structure components
   * @type {string}
   */
  structure:string;

  /**
   * path to navigation components
   * @type {string}
   */
  navigation:string;

  /**
   * path to publication components
   * @type {string}
   */
  publication:string;
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

export type BuildIndexFilterArg = IndexName|string

export interface BuildIndexArgs {
  noCache?:boolean
  filter?:BuildIndexFilterArg|BuildIndexFilterArg[]
}

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