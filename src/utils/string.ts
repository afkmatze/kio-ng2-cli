import { Observable, Scheduler } from 'rxjs'
import * as rxfs from './rx/fs'
const stringUtils = require('ember-cli-string-utils')

export const dasherize = (str:string):string => stringUtils.dasherize(str)
export const decamelize = (str:string):string => stringUtils.decamelize(str)
export const camelize = (str:string):string => stringUtils.camelize(str)
export const classify = (str:string):string => stringUtils.classify(str)
export const underscore = (str:string):string => stringUtils.underscore(str)
export const capitalize = (str:string):string => stringUtils.capitalize(str)


const wrapFileContent = (content:string) => {
  if ( content.length <= 255 && rxfs.existsSync(content) )
  {
    return Observable.of(content)
  }
  return rxfs.tmp.file(content)
}

const diffStrings = ( ...stringValues:string[] ) => {
  
  return Observable.from(stringValues)
    .flatMap(
      stringValue => {        
        return wrapFileContent(stringValue)
      }
    ).toArray().flatMap ( tmpFiles => {
      return rxfs.diff({},...tmpFiles)
    } )
}

export const diff = (...stringValues:string[]) => {

  return diffStrings(...stringValues)

}