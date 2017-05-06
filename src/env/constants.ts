import * as path from './path'
import { KioComponentsPaths, KioProjectPaths } from './interfaces'
import { isInstalled, moduleRoot, resolveRoot, relative, resolveProjectPackage } from './resolve'
import * as logger from '../console'

const debug = logger.createDebugger()

export * from './interfaces'
export * from './resolve'


export const MACHINE_ROOT = path.resolve('/')

// target project root directory
export const KIO_PROJECT_ROOT = moduleRoot()

// content of target project`s package.json
export const KIO_PROJECT_PACKAGE = require(path.join(KIO_PROJECT_ROOT,'package.json'))
export const KIO_PROJECT_CACHE = resolveRoot('.kio-ng2-cache')

const projectPackage = resolveProjectPackage()
debug('project package: ', projectPackage)

export const KIO_PATHS:KioProjectPaths = {
  root: projectPackage.kio.root,
  components: {
    publication: projectPackage.kio.components.publication,
    structure: projectPackage.kio.components.structure,
    navigation: projectPackage.kio.components.navigation
  }
}

export const KIO_TEMPLATES = path.resolve(__dirname,'../../templates')
export const TEMPLATES = KIO_TEMPLATES
