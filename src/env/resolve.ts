import * as path from './path'
import { KioComponentsPaths, KioProjectPaths } from './interfaces'


export const isInstalled = () => {
  if ( process && process.argv && /\/kio\-ng2$/.test(process.argv[1]||"") )
    return true
  return false
}

export const cliRoot = () => {
  return __dirname.replace(/kio\-ng2\-cli\/.*/,'kio-ng2-cli')
}

export const moduleRoot = () => {

  if ( process.env.KIO_NG2_PROJECT )
  {
    return process.env.KIO_NG2_PROJECT
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
    return path.resolveFull(resolvedPath)
  }

  return path.resolve('./')
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
  return path.resolveFull(path.join(moduleRoot(),projectPath))
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

export const resolveProjectPackage = ():any => {
  return require(resolveProjectPackagePath())
}


export const resolveProjectCache = () => {
  return resolveRoot('.kio-ng2-cache')
}

export const resolveKioPath = ( pathName?:keyof KioComponentsPaths ) => {
  const packageInfo = resolveProjectPackage()
  return packageInfo.kio [ pathName || 'root' ]
}

export const resolve = ( ...pathNames:string[] ) => {
  return path.join(moduleRoot(),...pathNames)
}