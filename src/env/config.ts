import { GlobalConfig } from './interfaces'

export class CLIConfig {
  private _data:GlobalConfig
  update(config:GlobalConfig){
    this._data = config
    //console.log('updated cli config',config)
  }
  get data():GlobalConfig{
    return {...this._data}
  }
}

export default new CLIConfig()