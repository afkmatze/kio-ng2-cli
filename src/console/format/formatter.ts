import { Formatter } from './Formatter.class'
import { defaultTypes } from './defaultTypes'

const formatter = new Formatter()

Object.keys(defaultTypes).forEach(key=>{
  const defaultType = defaultTypes[key]
  formatter.addType(defaultType.matcher,defaultType.formatter)
})
export { formatter }