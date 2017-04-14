import * as path from 'path'
import { KioComponentsPaths, KioProjectPaths } from './interfaces'

const tryResolve = () => {
  let resolvedPath:string
  try{
    resolvedPath = require.resolve('./')
  }catch(e){}

  if ( /test|debug/.test(process.env.NODE_ENV) )
  {
    resolvedPath = process.env.DEV_LATEST
  }

  if ( resolvedPath )
  {
    return resolvedPath
  }

  return path.resolve('./')
}

export * from './interfaces'

// target project root directory
export const KIO_PROJECT_ROOT = tryResolve()
// content of target project`s package.json
export const KIO_PROJECT_PACKAGE = require(path.join(KIO_PROJECT_ROOT,'package.json'))

/**
 * @brief      resolves path in target project
 *
 * @param      projectPath  path to resolve in project
 *
 * @return     resolved path
 */
export const resolve = ( projectPath:string ) => {
  return path.resolve(path.join(KIO_PROJECT_ROOT,projectPath))
}

export const relative = ( absProjectPath:string ) => {
  const kioRoot = KIO_PATHS.root
  return './'+path.relative(kioRoot,absProjectPath)
}

export const KIO_PROJECT_CACHE = resolve('.kio-ng2-cache')

export const KIO_PATHS:KioProjectPaths = {
  root: resolve(KIO_PROJECT_PACKAGE.kio.root),
  components: {
    publication: resolve(KIO_PROJECT_PACKAGE.kio.components.publication),
    structure: resolve(KIO_PROJECT_PACKAGE.kio.components.structure),
    navigation: resolve(KIO_PROJECT_PACKAGE.kio.components.navigation)
  }
}

export const TEMPLATES = path.resolve(__dirname,'../../templates')