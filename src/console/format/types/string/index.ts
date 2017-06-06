import { FormatValueMapper, FormatValueMappers } from '../interfaces'
import { ValueTypeSimple, ValueMatcher, FormatterFunction, FormatParam, FormatArg, FormatChunk } from '../../interfaces'

import { FormatValueType } from '../type.class'


export class StringValueType extends FormatValueType<string> {
  
  typeName:string='string'
  flag=/s/

  render ( formatArg:FormatArg<string> ) {
    return formatArg.value
  }
}

export default StringValueType