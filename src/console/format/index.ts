export * from './interfaces'
export * from './Formatter.class'
export * from './formatter'
import { ValueFormatter, ValueMatcher, ValueType, TypeMatcher, ValueTypeFormatter, ValueTypeMatcher } from './interfaces'
import { Formatter } from './Formatter.class'
import { formatter } from './formatter'

export const useTypeFormatter = ( typeMatcher:ValueTypeMatcher, typeFormatter:ValueTypeFormatter ) => {
  formatter.addType ( typeMatcher, typeFormatter )
}
