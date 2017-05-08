import { FormatVariable } from '../variables/interfaces'

import { 
  ValueType, ValueTypeSimple, TypeMatcher, ValueMatcher, 
  ValueFormatter, ValueTypeMatcher, ValueTypeFormatter,
  FormatterFunction,

  FormatChunk, 
  FormatArg,
  FormatParam,
  instanceOfFormatChunk, instanceOfFormatArg,
  TypeFormat
 } from '../interfaces'

export interface FormatValueMapper<T extends ValueTypeSimple> {
  typeName:string
  checkType(value:any):boolean
  render(formatArg:FormatArg<T>,idx?:number):string
}

export function instanceOfFormatValueMapper <T>( other:any ) {
  return (
    'typeName' in other 
     && ('checkType' in other && 'function' === typeof other.checkType)
     && ('render' in other && 'function' === typeof other.render)
  )
}

export type FormatValueMappers = FormatValueMapper<ValueTypeSimple>[]


export function instanceOfFormatParam <T>( other:any ) {
  return (
      'formatMapper' in other 
      && 
      instanceOfFormatValueMapper(other.formatMapper)
      &&
      instanceOfFormatChunk(other)
    )
}

export interface FormatMappingArg<T extends ValueTypeSimple> extends FormatArg<T> {
  formatMapper:FormatValueMapper<T>
}

export interface FormatMappingArgValue<T extends ValueTypeSimple> extends FormatParam<T>, FormatMappingArg<T> {}

export function instanceOfFormatMappingArg <T extends ValueTypeSimple> ( other:any ):other is FormatMappingArgValue<T> {
  return (
    instanceOfFormatParam(other)
    &&
    instanceOfFormatArg(other)
  )
}
