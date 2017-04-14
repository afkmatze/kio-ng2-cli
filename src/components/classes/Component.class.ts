import * as ComponentInterfaces from '../interfaces'
import { KIO_PATHS, KIO_PROJECT_ROOT } from '../../env/constants'
import * as path from 'path'
import * as stringUtils from '../../utils/string'
import * as shjs from 'shelljs'

import { KioComponentType, KioComponentFileType, KioComponent, KioStructureComponent, KioPublicationComponent } from '../interfaces'

const fileTypePatterns = {
  "component": /\.component\.ts$/,
  "spec": /\.component\.spec\.ts$/,
  "template": /\.component\.html$/,
  "style": /\.component\.[s]?css$/,
  "criteria": /\.component\.cquery\.criteria\.ts$/,
  "fixture": /\.component\.cquery\.fixture\.ts$/,
  "querytest": /\.component\.cquery\.spec\.ts$/
}

const matchFileType = ( fileType:KioComponentFileType ) => {
  const regex = fileTypePatterns[fileType]

  return ( filename:string ) => regex.test(filename)
}

export class Component {

  static FileTypes:KioComponentFileType[]=["component","spec","template","style"]

  data:ComponentInterfaces.KioComponent

  constructor(data:ComponentInterfaces.KioComponent) {
    this.data = data
  }

  get typeName():string {
    return ComponentInterfaces.KioComponentType[this.data.componentType]
  }

  get dir():string {
    return path.resolve(KIO_PROJECT_ROOT,this.data.dir)
  }

  get name():string {
    return stringUtils.classify(this.data.name)
  }

  get dasherizedName():string {
    return stringUtils.dasherize(this.data.name)
  }

  get childTypes():string[] {
    return (<KioPublicationComponent>this.data).childTypes
  }

  get modifiers():string[] {
    return (<KioPublicationComponent>this.data).modifiers
  }

  get contentType():string {
    return (<KioPublicationComponent>this.data).contentType
  }

  getFiles(){
    return shjs.find(this.dir).filter(item => !!path.extname(item))
  }

  getFile(fileType:KioComponentFileType){
    return this.getFiles().find ( matchFileType(fileType) )
  }

  toString(){
    return `[${this.name} ${this.typeName}]`
  }

  toJSON(){
    return this.data
  }
}