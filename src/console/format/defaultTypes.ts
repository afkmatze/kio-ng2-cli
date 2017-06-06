import { 
  ValueType, ValueTypeSimple, TypeMatcher, ValueMatcher, 
  ValueFormatter, ValueTypeMatcher, ValueTypeFormatter,
  FormatterFunction,
  TypeFormat
 } from './interfaces'

import { format } from 'util'

const makeSimpleTypeMatcher = <T extends ValueTypeSimple>( typeName:string ):ValueMatcher<T> => ( value?:any, ...args:any[] ):boolean => {
  return typeName === typeof (value||undefined)
}

export const defaultMatcher = {
  "string": makeSimpleTypeMatcher("string"),
  "number": makeSimpleTypeMatcher("number"),
  "boolean": makeSimpleTypeMatcher("boolean"),
  "object": makeSimpleTypeMatcher("object")
}


const valueFormatter:FormatterFunction<ValueTypeSimple> = <T extends ValueTypeSimple>(value:T,...args:any[]):string => {
  return stringFormatter('%s',value,...args)
}

const stringFormatter:FormatterFunction<string> = ( value:string, ...args:any[] ):string => {
  return format(value,...args)
}

const numberFormatter:FormatterFunction<number> = ( value:number, dec?:number ):string => {
  return stringFormatter('%s',value)
}

const objectFormatter:FormatterFunction<object> = ( value:object ):string => {
  return JSON.stringify ( value, null, '  ' )
}

export const defaultFormatter = {
  "string": {
    formatValue: stringFormatter
  },
  "number": {
    formatValue: numberFormatter
  },
  "boolean": {
    formatValue: valueFormatter
  },
  "object": {
    formatValue: objectFormatter
  }
}