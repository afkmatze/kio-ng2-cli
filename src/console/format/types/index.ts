import { 
  ValueTypeSimple
 } from '../interfaces'

export * from './interfaces'
export { FormatValueType } from './type.class'
import { FormatValueType } from './type.class'
import StringType from './string'
import NumberType from './number'
import ObjectType from './object'
import BooleanType from './boolean'

export const stringType:StringType = new StringType()
export const numberType:NumberType = new NumberType()
export const objectType:ObjectType = new ObjectType()
export const booleanType:BooleanType = new BooleanType()

export const Types:FormatValueType<any>[] = [ 
  stringType,
  numberType,
  objectType,
  booleanType
]

export default Types

