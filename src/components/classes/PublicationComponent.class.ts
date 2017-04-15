import { Component } from './Component.class'
import { KioPublicationComponent, KioComponentFileType } from '../interfaces'
import * as path from 'path'
import { parseFile } from '../../utils/parse'
import { evalFile } from '../../utils/eval'
import * as logger from '../../console'

export class PublicationComponent extends Component {

  static FileTypes:KioComponentFileType[]=Component.FileTypes.concat(["criteria","fixture","querytest"])

  data:KioPublicationComponent

  constructor(data:KioPublicationComponent){
    super(data)
    this._modifiers = data.modifiers
    this._childTypes = data.childTypes
  }

  private _modifiers:string[]
  private _childTypes:string[]

  get modifiers():string[] {
    if ( !this._modifiers )
    {
      this.update()
    }
    return this._modifiers
  }
  
  get childTypes():string[] {
    if ( !this._childTypes )
    {
      this.update()
    }
    return this._childTypes
  }

  update(){
    const criteriaFile = this.getFiles().find(filename => /criteria\.ts$/.test(filename) )
    if ( !criteriaFile )
      throw Error (`No criteria file for component ${this.toString()}`) 
    const Criteria = evalFile(criteriaFile,path.dirname(criteriaFile)).Criteria
    this._modifiers = Criteria.modifiers
    this._childTypes = Criteria.childTypes
  }

  toJSON():KioPublicationComponent{
    const json:KioPublicationComponent = <KioPublicationComponent>super.toJSON()
    json.modifiers = this.modifiers
    json.childTypes = this.childTypes
    return json
  }

}