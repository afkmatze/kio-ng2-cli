export * from './interfaces'
export * from './Formatter.class'
export * from './formatter'
import { ValueFormatter, ValueMatcher, ValueType, TypeMatcher, ValueTypeFormatter, ValueTypeMatcher } from './interfaces'
import { Formatter } from './Formatter.class'
import { formatter } from './formatter'
import { FormatValueType } from './types'

export const useTypeFormatter = <T>( valueMapper:FormatValueType<T> ) => {
  formatter.addType ( valueMapper )
}
