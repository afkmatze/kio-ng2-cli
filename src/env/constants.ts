import * as path from './path'
import { KioComponentsPaths, KioProjectPaths } from './interfaces'

const MACHINE_ROOT = path.resolve('/')

export const resolveLink = ( filepath:string ) => {

  const comps:string[] = filepath.split('/')

  let p = MACHINE_ROOT
  comps.forEach(comp=>{
    
  })

}

const tryResolve = () => {
  let resolvedPath:string
  try{
    resolvedPath = require.resolve('./')
  }catch(e){}

  if ( /test|debug/.test(process.env.NODE_ENV) )
  {
    resolvedPath = process.env.DEV_LATEST || process.env.AFKM_LATEST
  }

  if ( resolvedPath )
  {
    return path.resolveFull(resolvedPath)
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
const resolveRoot = ( projectPath:string ) => {
  return path.resolveFull(path.join(KIO_PROJECT_ROOT,projectPath))
}

export const resolve = ( componentType:string, projectPath?:string ) => {
  if ( !projectPath )
    return resolveRoot ( componentType )
  return path.join(KIO_PATHS.components[componentType],projectPath)
}

export const relative = ( absProjectPath:string ) => {
  //if ( !absProjectPath.startsWith(process.env.HOME) )
  const relPath = path.relative(KIO_PROJECT_ROOT,path.resolveFull(absProjectPath))
  return relPath
}

export const KIO_PROJECT_CACHE = resolve('.kio-ng2-cache')

export const KIO_PATHS:KioProjectPaths = {
  root: resolveRoot(KIO_PROJECT_PACKAGE.kio.root),
  components: {
    publication: resolveRoot(KIO_PROJECT_PACKAGE.kio.components.publication),
    structure: resolveRoot(KIO_PROJECT_PACKAGE.kio.components.structure),
    navigation: resolveRoot(KIO_PROJECT_PACKAGE.kio.components.navigation)
  }
}

export const TEMPLATES = path.resolve(__dirname,'../../templates')