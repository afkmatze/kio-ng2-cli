import { ValueType, TypeMatcher, ValueMatcher, ValueFormatter, ValueTypeMatcher, ValueTypeFormatter } from './interfaces'
import { format } from 'util'

const makeSimpleTypeMatcher = ( typeName:string ):ValueTypeMatcher => ( dataType , value? ) => {
  return typeName === typeof (value||undefined)
}

const valueFormatter = (value:any,...args:any[]):string => {
  return stringFormatter('%s',value,...args)
}

const stringFormatter = ( value:string, ...args:any[] ):string => {
  return format(value,...args)
}

const numberFormatter = ( value:number, dec?:number ):string => {
  return stringFormatter('%s',value)
}

export const defaultMatcher = {
  "string": makeSimpleTypeMatcher("string"),
  "number": makeSimpleTypeMatcher("number"),
  "boolean": makeSimpleTypeMatcher("boolean"),
  "object": makeSimpleTypeMatcher("object")
}

export const defaultFormatter = {
  "string": stringFormatter,
  "number": numberFormatter,
  "boolean": valueFormatter,
  "object": valueFormatter
}

export const defaultTypes = {
 "string": {formatter: defaultFormatter.string, matcher: defaultMatcher.string },
  "number": {formatter: defaultFormatter.number, matcher: defaultMatcher.number },
  "boolean": {formatter: defaultFormatter.boolean, matcher: defaultMatcher.boolean },
  "object": {formatter: defaultFormatter.object, matcher: defaultMatcher.object } 
}
