import * as path from './path'
import * as fs from 'fs'
import { KioComponentsPaths, KioComponentsPathType, KioProjectPaths, KioFolderSettingArg, KioFileFilter, KioFolderSettings } from './interfaces'
import { folderSettings } from './folder-settings'
import * as logger from '../console'

const debug = logger.createDebugger()

export const isInstalled = () => {
  if ( process && process.argv && /\/kio\-ng2$/.test(process.argv[1]||"") )
    return true
  return false
}

export const cliRoot = () => {
  return __dirname.replace(/kio\-ng2\-cli\/.*/,'kio-ng2-cli')
}

let __moduleRoot
export const moduleRoot = () => {
  if ( __moduleRoot )
    return __moduleRoot

  if ( process.env.KIO_NG2_PROJECT )
  {
    debug('Use project path from environment variable KIO_NG2_PROJECT: "%s"', process.env.KIO_NG2_PROJECT )
    __moduleRoot = path.resolve(process.env.KIO_NG2_PROJECT)
    return __moduleRoot
  }

  let resolvedPath:string
  try{
    resolvedPath = require.resolve('./')
  }catch(e){}

  if ( isInstalled() )
  {
    resolvedPath = process.argv[1].replace(/\/node_modules*/gm,'\n').split('\n')[0]
  }
  else if ( /test/.test(process.env.NODE_ENV) )
  {
    resolvedPath = path.resolve(__dirname,'../../test_target')
  }
  else if ( !/production/.test(process.env.NODE_ENV) )
  {
    resolvedPath = process.env.DEV_LATEST || process.env.AFKM_LATEST
  }

  if ( resolvedPath )
  {
    resolvedPath = path.resolveFull(resolvedPath)
  } else {
    resolvedPath = path.resolve('./')
  }

  debug('resolve module root: %s', resolvedPath)
  
  __moduleRoot = resolvedPath
  return resolvedPath
}

export const isProjectEnv = () => {
  let __env_path
  try{
    __env_path = resolveProjectPackage()
  }catch(e){}
  return !!__env_path
}

/**
 * @brief      resolves path in target project
 *
 * @param      projectPath  path to resolve in project
 *
 * @return     resolved path
 */
export const resolveRoot = ( projectPath:string ) => {
  if ( path.isAbsolute(projectPath) )
    return projectPath
  return path.resolve(path.join(moduleRoot(),projectPath))
}

export const relative = ( absProjectPath:string ) => {
  //if ( !absProjectPath.startsWith(process.env.HOME) )
  const relPath = path.relative(moduleRoot(),path.resolveFull(absProjectPath))
  return relPath
}

/*export const resolve = ( componentType:string, projectPath?:string ) => {
  if ( !projectPath )
    return resolveKioPath ( componentType )
  return path.join(resolveKioPath(componentType),projectPath)
}*/

export const resolveProjectPackagePath = () => {
  return resolveRoot('package.json')
}

let projectPackage

export const resolveProjectPackage = ():any => {
  if ( !projectPackage )
  {
    const packagePath = resolveProjectPackagePath()
    debug('package path: %s', packagePath)
    const json = fs.readFileSync(packagePath,'utf8')
    debug('json:',json)
    projectPackage = JSON.parse ( json ) || require('./'+packagePath)
    debug('package key config: ', projectPackage.kio)
  }
  return projectPackage  
}


export const resolveProjectCache = () => {
  return resolveRoot('.kio-ng2-cache')
}

export const resolveKioPathSettings = <T extends KioComponentsPathType>( pathName?:T ):KioFolderSettings => {
  const packageInfo = resolveProjectPackage()
  const folder = (pathName && pathName !== 'root' ) ? packageInfo.kio.components[pathName] : packageInfo.kio.root
  if ( folder )
  {
    return folderSettings(folder)
  }
  throw Error(`Config prop "${pathName}" could not be found in kio settings of project package.\n(${resolveProjectPackagePath()})`)
}

export const resolveKioPath = ( pathName?:KioComponentsPathType ) => {
  const kioPath = resolveKioPathSettings ( pathName )
  if ( kioPath )
  {
    return kioPath.path
  }
}

export const resolve = ( ...pathNames:string[] ) => {
  return path.join(moduleRoot(),...pathNames)
}