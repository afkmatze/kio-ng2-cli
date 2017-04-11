import * as path from 'path'

const tryResolve = () => {
  let resolvedPath:string
  try{
    resolvedPath = require.resolve('./')
  }catch(e){}

  if ( resolvedPath )
  {
    return resolvedPath
  }

  return path.resolve('./')
}

export interface KioComponentsPaths {
  /**
   * path to structure components
   * @type {string}
   */
  structure:string;

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

export const KIO_PROJECT_ROOT = tryResolve()
export const KIO_PROJECT_PACKAGE = require(path.join(KIO_PROJECT_ROOT,'package.json'))
export const KIO_PATHS:KioProjectPaths = KIO_PROJECT_PACKAGE.kio