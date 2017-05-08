import { FormatValueMapper, FormatValueMappers } from '../interfaces'
import { ValueTypeSimple, ValueMatcher, FormatterFunction, FormatParam, FormatArg, FormatChunk } from '../../interfaces'

import { FormatValueType } from '../type.class'


export class ObjectValueType extends FormatValueType<object> {
  
  typeName:string='object'
  flag=/o|O/

  render ( formatArg:FormatArg<object> ) {
    return JSON.stringify(formatArg.value,null,'  ')
  }
}

export default ObjectValueType