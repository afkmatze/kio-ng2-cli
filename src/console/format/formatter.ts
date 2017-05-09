import { Formatter } from './Formatter.class'
import defaultTypes, { FormatValueType } from './types'

const formatter = new Formatter()

defaultTypes.forEach(<T>(defaultType:FormatValueType<T>)=>{
  formatter.addType(defaultType)
})
export { formatter }