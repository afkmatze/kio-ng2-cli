export type ValueTypeSimple = string|number|Date|boolean|Buffer
export type ValueType = ValueTypeSimple|ValueTypeSimple[]

export interface ValueFormatter<T> {
  formatValue(value:T, ...args:any[]):string
}

export interface TypeMatcher {
  ( value, ...args:any[] ):boolean
}

export interface ValueMatcher<T> {
  ( value?:T, ...args:any[] ):boolean
}

export type ValueTypeMatcher = ValueMatcher<ValueType>
export type ValueTypeFormatter = ValueFormatter<ValueType>