import * as path from './path'


export const isInstalled = () => {
  if ( process && process.argv && /\/kio\-ng2$/.test(process.argv[1]||"") )
    return true
}

export const moduleRoot = () => {
  
  let resolvedPath:string
  try{
    resolvedPath = require.resolve('./')
  }catch(e){}

  if ( isInstalled() )
  {
    resolvedPath = process.argv[1].replace(/\/node_modules*/gm,'\n').split('\n')[0]
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
  return path.resolveFull(path.join(KIO_PROJECT_ROOT,projectPath))
}

export const relative = ( absProjectPath:string ) => {
  //if ( !absProjectPath.startsWith(process.env.HOME) )
  const relPath = path.relative(KIO_PROJECT_ROOT,path.resolveFull(absProjectPath))
  return relPath
}



export const MACHINE_ROOT = path.resolve('/')

// target project root directory
export const KIO_PROJECT_ROOT = moduleRoot()