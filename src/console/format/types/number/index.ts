import { FormatValueMapper, FormatValueMappers } from '../interfaces'
import { ValueTypeSimple, ValueMatcher, FormatterFunction, FormatArg, FormatParam, FormatChunk } from '../../interfaces'

import { FormatValueType } from '../type.class'


export class NumberValueType extends FormatValueType<number> {
  
  typeName:string='number'
  flag=/d|f/

  render( formatArg:FormatArg<number> ) {
    
    const value:Number = new Number(formatArg.value)
    //console.log('NumberValueType::render()', formatArg)

    if ( formatArg.flag === 'f' )
    {
      const [ typeBase="1", typeDec="0" ] = formatArg.paramArgs.split('.') || []
      const base = parseInt(typeBase)
      const dec = parseInt(typeDec) || 0

      return value.toFixed(dec).toString()
    }

    return value.toFixed(0).toString()
  }
}

export default NumberValueType