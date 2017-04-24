import * as path from './path'
import { KioComponentsPaths, KioProjectPaths } from './interfaces'
import { isInstalled, moduleRoot, resolveRoot, relative } from './resolve'

export * from './interfaces'
export * from './resolve'


export const MACHINE_ROOT = path.resolve('/')

// target project root directory
export const KIO_PROJECT_ROOT = moduleRoot()

// content of target project`s package.json
export const KIO_PROJECT_PACKAGE = require(path.join(KIO_PROJECT_ROOT,'package.json'))
export const KIO_PROJECT_CACHE = resolveRoot('.kio-ng2-cache')

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
