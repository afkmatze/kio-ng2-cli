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

export const KIO_TEMPLATES = path.resolve(__dirname,'../../templates')
export const TEMPLATES = KIO_TEMPLATES
