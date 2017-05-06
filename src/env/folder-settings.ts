import { KioFileFilter, KioFolderSettings, KioFolderSettingArg } from './interfaces'

export const DEFAULT_EXCLUDES = [
  /^\.DS_Store/
]

export const folderSettings = ( arg:KioFolderSettingArg ):KioFolderSettings => {
  if ( 'string' === typeof arg )
  {
    return {
      path: arg,
      exclude: DEFAULT_EXCLUDES
    }
  }
  return arg
}