import { read } from './file'
import { ProjectConfig, ConfigFile } from './interfaces'
import * as kioEnv from 'kio-ng2-env'

const isConfigKey = ( key:string ):key is keyof ConfigFile => {
  return key === 'components'
} 

const mergeConfig = ( target:ConfigFile, other:ConfigFile ):ConfigFile => {
  Object.keys(target).forEach ( key => {
    if ( isConfigKey(key) )
    {
      target[key] = other[key]
    }
  } )
  return target
}

export const init = ( projectConfig:ProjectConfig ) => {

  if ( projectConfig.configFilepath )
  {
    projectConfig = mergeConfig(projectConfig,read(projectConfig.configFilepath))
  }

  const info = kioEnv.api.modules.resolve.rootModule()

  console.log('project config info: ', info)

  return projectConfig  
}