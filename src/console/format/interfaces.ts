import { 
  FormatVariable, FormatVariableData, FormatVariableParam,
  isInstanceOfFormatVariableData, isInstanceOfFormatVariableParam, isInstanceOfFormatVariable
} from './variables/interfaces'

export type ValueTypeSimple = string|number|boolean|object
export type ValueTypeSimpleNames = "string"|"number"|"boolean"|"object"
export type ValueType = ValueTypeSimple|ValueTypeSimple[]

export const checkValueType = <T extends ValueTypeSimple, U extends ValueTypeSimpleNames>( value:T, valueTypeName:U ):value is T => { 
  return typeof value === valueTypeName
}

export interface FormatterFunction<T extends ValueTypeSimple> {
  (value:T, ...args:any[]):string
}

export interface ValueFormatter<T extends ValueType> {
  /*createArg<T extends ValueTypeSimple> ( value:T ):FormatArg<T>
  formatValue:FormatterFunction<T>*/
}


export interface TypeMatcher {
  ( value, ...args:any[] ):boolean
}

export interface ValueMatcher<T extends ValueType> {
  ( value?:T, ...args:any[] ):boolean
}

export type ValueTypeMatcher = ValueMatcher<ValueType>
export type ValueTypeFormatter = ValueFormatter<ValueType>

export interface TypeFormat<T extends ValueTypeSimple> {
  matcher: ValueMatcher<T>
  formatter: ValueFormatter<T>
}

export interface FormatSource {
  source:string
}

export function instanceOfFormatSource ( other:any ):other is FormatSource {
  return (
      'source' in other
      &&
      'string' === typeof other.source
    )
}

export interface Param<T extends any> {
  /*type:T*/
  value:T
}

export function instanceOfParam<T> ( other:any ):other is Param<T> {
  return ( 
      'value' in other
    )
}

export interface FormatChunk extends FormatSource {
  index?:number
  length:number
}

export function instanceOfFormatChunk ( other:any ):other is FormatChunk {
  return ( 
      'length' in other
      &&
      'number' === typeof other.length
      &&
      instanceOfFormatSource(other)
    )
}
/**
 * formatting param matching a variable
 */
export interface FormatParam<T extends any> extends Param<T>, FormatVariable {
  typeName:string
  flag:string[1]
  paramArgs?:string
}


export function instanceOfFormatParam <T>( other:any ):other is FormatParam<T> {
  return ( 
      'typeName' in other
      && 
      ( !( 'paramArgs' in other ) || 'string' === typeof other.paramArgs )
      &&
      instanceOfParam(other)
      &&
      isInstanceOfFormatVariable(other)
    )
}

export interface FormatArg<T extends ValueTypeSimple> extends FormatParam<T> {
  value:T
}
/*
export function instanceOfFormatChunk ( other:any ):other is FormatChunk {
  return (
      ('index' in other && 'number' === typeof other.index)
      &&
      ('offset' in other && 'number' === typeof other.offset)
      &&
      ('length' in other && 'number' === typeof other.length)
      &&
      ('source' in other && 'string' === typeof other.source)
    )
}*/

export function instanceOfFormatArg <T extends ValueTypeSimple>( other:any ):other is FormatArg<T> {
  return (
      ('value' in other )
      && instanceOfFormatParam(other)
    )
}

export const isInstanceOf = {
  FormatSource: instanceOfFormatSource,
  Param: instanceOfParam,
  FormatChunk: instanceOfFormatChunk,
  FormatParam: instanceOfFormatParam,
  FormatArg: instanceOfFormatArg
}

