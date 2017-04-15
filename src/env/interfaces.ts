import * as path from 'path'

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
