import * as path from './path'
import { KioComponentsPaths, KioProjectPaths } from './interfaces'
import { MACHINE_ROOT, KIO_PROJECT_ROOT, moduleRoot, isInstalled, resolveRoot, relative } from './resolve'

export * from './interfaces'
export * from './resolve'


export const resolve = ( componentType:string, projectPath?:string ) => {
  if ( !projectPath )
    return resolveRoot ( componentType )
  return path.join(KIO_PATHS.components[componentType],projectPath)
}

// content of target project`s package.json
export const KIO_PROJECT_PACKAGE = require(path.join(KIO_PROJECT_ROOT,'package.json'))
export const KIO_PROJECT_CACHE = resolve('.kio-ng2-cache')

export const KIO_PATHS:KioProjectPaths = {
  root: resolveRoot(KIO_PROJECT_PACKAGE.kio.root),
  components: {
    publication: resolveRoot(KIO_PROJECT_PACKAGE.kio.components.publication),
    structure: resolveRoot(KIO_PROJECT_PACKAGE.kio.components.structure),
    navigation: resolveRoot(KIO_PROJECT_PACKAGE.kio.components.navigation)
  }
}

export const KIO_TEMPLATES = path.resolve(__dirname,'../../templates')
export const TEMPLATES = KIO_TEMPLATES
