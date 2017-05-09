import { KioFileFilter, KioFolderSettings, KioFolderSettingArg } from './interfaces'

export const DEFAULT_EXCLUDES = [
  /^\.DS_Store/
]

export const folderSettings = ( arg:KioFolderSettingArg, mergeDefaults:boolean=true ):KioFolderSettings => {
  let include = undefined

  if ( 'string' === typeof arg )
  {
    return folderSettings({
      path: arg,
      exclude: DEFAULT_EXCLUDES
    },mergeDefaults)
  }

  if ( mergeDefaults )
  {
    return Object.assign({},arg, {
      exclude: (arg.exclude||[]).concat(DEFAULT_EXCLUDES)
    })
  }
  return arg
}