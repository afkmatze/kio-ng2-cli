import * as path from 'path'

const tryResolve = () => {
  let resolvedPath:string
  try{
    resolvedPath = require.resolve('./')
  }catch(e){}

  if ( resolvedPath )
  {
    return resolvedPath
  }

  return path.resolve('./')
}

export const KIO_PROJECT_ROOT = tryResolve()