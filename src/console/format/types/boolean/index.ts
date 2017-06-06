import { FormatValueMapper, FormatValueMappers } from '../interfaces'
import { ValueTypeSimple, ValueMatcher, FormatterFunction, FormatArg, FormatChunk, FormatParam } from '../../interfaces'

import { FormatValueType } from '../type.class'


export class BooleanValueType extends FormatValueType<boolean> {
  
  typeName:string='boolean'
  flag=/b/

  render ( formatArg:FormatArg<boolean> ) {
    return JSON.stringify(formatArg,null,'  ')
  }
}

export default BooleanValueType