import * as ComponentInterfaces from './interfaces'
import { KIO_PATHS, KIO_PROJECT_ROOT } from '../env/constants'
import * as path from 'path'
import * as stringUtils from '../utils/string'

export class Component {
  
  data:ComponentInterfaces.KioComponent

  constructor(data:ComponentInterfaces.KioComponent) {
    this.data = data
  }

  get typeName():string {
    return ComponentInterfaces.KioComponentType[this.data.componentType]
  }

  get dir():string {
    return path.join(KIO_PROJECT_ROOT,this.data.dir)
  }

  get name():string {
    return stringUtils.classify(this.data.name)
  }

  get dasherizedName():string {
    return stringUtils.dasherize(this.data.name)
  }

  toString(){
    return `[${this.name} ${this.typeName}]`
  }
}