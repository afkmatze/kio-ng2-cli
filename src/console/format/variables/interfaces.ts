export interface FormatVariableParseOptions {
  flags: string[1][]  
}

export interface FormatVariable {
  offset:number
  source:string
}

export interface FormatVariableData extends FormatVariable {
  flag:string[1]
} 

export interface FormatVariableParam extends FormatVariableData {
  param:string
} 

export const isInstanceOfFormatVariableParseOptions = (other:any):other is FormatVariableParseOptions => {
  return (
      'flags' in other
      &&
      Array.isArray(other.flags)
      &&
      (<string[]>other.flags).every ( flag => 'string' === typeof flag )
    )
}

export const isInstanceOfFormatVariable = (other:any):other is FormatVariable => {
  return (
      'source' in other
      &&
      'string' === typeof other.source
      &&
      'offset' in other
      &&
      'number' === typeof other.offset
    )
}

export const isInstanceOfFormatVariableData = (other:any):other is FormatVariableData => {
  return (
    'flag' in other
      &&
      isInstanceOfFormatVariable ( other )
    )
}

export const isInstanceOfFormatVariableParam = (other:any):other is FormatVariableParam => {
  return (
      'param' in other
      &&
      'string' === typeof other.param
      &&
      isInstanceOfFormatVariableData(other)
    )
}

export type FormatVariableArg = FormatVariableData|FormatVariableParam

export const isInstanceOf = {
  FormatVariableParseOptions: isInstanceOfFormatVariableParseOptions,
  FormatVariable: isInstanceOfFormatVariable,
  FormatVariableData: isInstanceOfFormatVariableData,
  FormatVariableParam: isInstanceOfFormatVariableParam
}

/*
import { FormatValueType } from '../types'

export interface VariableType<T extends VariableTypes> {
  type:T
}

export interface FormatVariableType<T extends VariableTypes,U extends VariableType<T>> extends FormatVariable, VariableType<U> {
  formatValueType:FormatValueType<T>
}

export interface FormatVariableValue<T extends VariableTypes> extends FormatVariable, VariableType<T> {
  value:T
}*/