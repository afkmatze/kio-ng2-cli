import * as path from './path'
import { KioComponentsPaths, KioProjectPaths } from './interfaces'
import { isInstalled, moduleRoot, resolveRoot, relative, resolveProjectPackage } from './resolve'

export * from './interfaces'
export * from './resolve'


export const MACHINE_ROOT = path.resolve('/')

// target project root directory
export const KIO_PROJECT_ROOT = moduleRoot()

// content of target project`s package.json
export const KIO_PROJECT_PACKAGE = require(path.join(KIO_PROJECT_ROOT,'package.json'))
export const KIO_PROJECT_CACHE = resolveRoot('.kio-ng2-cache')

export const KIO_PATHS:KioProjectPaths = {
  root: resolveProjectPackage().kio.root,
  components: {
    publication: resolveProjectPackage().kio.components.publication,
    structure: resolveProjectPackage().kio.components.structure,
    navigation: resolveProjectPackage().kio.components.navigation
  }
}

export const KIO_TEMPLATES = path.resolve(__dirname,'../../templates')
export const TEMPLATES = KIO_TEMPLATES
